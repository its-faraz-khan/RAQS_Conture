import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import notify from '../utils/notify';

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '',
  street: '', city: '', state: '', zipcode: '', phone: '',
};

const inputCls =
  'w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-gray-500 bg-white';

const CartDrawer = () => {
  const {
    cartItems,
    setCartItems,
    products,
    currency,
    delivery_fee,
    getCartAmount,
    updateQuantity,
    cartDrawerOpen,
    setCartDrawerOpen,
    token,
    backendUrl,
    navigate,
  } = useContext(ShopContext);

  // 'cart' | 'checkout' | 'success'
  const [view, setView] = useState('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // Reset to cart view after drawer closes (after slide-out animation)
  useEffect(() => {
    if (!cartDrawerOpen) {
      const t = setTimeout(() => {
        setView('cart');
        setFormData(INITIAL_FORM);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [cartDrawerOpen]);

  // ── CART DATA ─────────────────────────────────────────────────────────────
  const cartData = [];
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {
        cartData.push({ _id: itemId, size, quantity: cartItems[itemId][size] });
      }
    }
  }

  const getDiscountedPrice = (product) => {
    const valid =
      product.hasDiscount &&
      product.discountExpiry &&
      new Date(product.discountExpiry) > new Date();
    return valid
      ? Math.round(product.price - (product.price * product.discountPercent) / 100)
      : product.price;
  };

  const subtotal = getCartAmount();
  const total = subtotal + delivery_fee;

  // ── FORM HANDLERS ─────────────────────────────────────────────────────────
  const onChangeHandler = (e) => {
    let { name, value } = e.target;
    if (name === 'phone') {
      value = value.replace(/\D/g, '');
      if (value.length > 0 && !value.startsWith('92')) value = '92' + value;
      if (value.length > 12) value = value.slice(0, 12);
      value = '+' + value;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePhone = (phone) => {
    const d = phone.replace(/\+/g, '');
    return d.startsWith('92') && d.length === 12;
  };

  const onPlaceOrder = async (e) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      notify('Please enter a valid Pakistani phone number (+923001234567)');
      return;
    }
    setIsSubmitting(true);
    try {
      const orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const product = structuredClone(products.find((p) => p._id === itemId));
            if (product) {
              product.size = size;
              product.quantity = cartItems[itemId][size];
              orderItems.push(product);
            }
          }
        }
      }
      const response = await axios.post(
        backendUrl + '/api/order/place',
        { address: formData, items: orderItems, amount: total },
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        setView('success');
      } else {
        notify(response.data.message);
      }
    } catch (err) {
      notify(err.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Dim overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          cartDrawerOpen ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setCartDrawerOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          cartDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* ══════════════════════════ CART VIEW ══════════════════════════════ */}
        {view === 'cart' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
              <h2 className="text-base font-semibold tracking-wide">YOUR CART</h2>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <img src={assets.cross_icon} className="w-3" alt="Close" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {cartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                  <img src={assets.cart_icon} className="w-10 opacity-25" alt="Empty cart" />
                  <p className="text-sm">Your cart is empty</p>
                </div>
              ) : (
                cartData.map((item, index) => {
                  const product = products.find((p) => p._id === item._id);
                  if (!product) return null;
                  const price = getDiscountedPrice(product);
                  const hasDiscount =
                    product.hasDiscount &&
                    product.discountExpiry &&
                    new Date(product.discountExpiry) > new Date();
                  return (
                    <div key={index} className="flex gap-4 py-4 border-b last:border-b-0">
                      <img
                        className="w-16 h-16 object-cover flex-shrink-0 bg-gray-50"
                        src={product.image[0]}
                        alt={product.name}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {hasDiscount ? (
                            <>
                              <p className="text-gray-400 line-through text-xs">
                                {currency} {product.price.toLocaleString()}
                              </p>
                              <p className="text-red-600 text-sm font-semibold">
                                {currency} {price.toLocaleString()}
                              </p>
                              <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded">
                                {product.discountPercent}% OFF
                              </span>
                            </>
                          ) : (
                            <p className="text-sm">{currency} {price.toLocaleString()}</p>
                          )}
                          <span className="text-xs text-gray-500 border px-2 py-0.5 bg-slate-50">
                            {item.size}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-300">
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))
                              }
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-base leading-none"
                            >–</button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.size, item.quantity + 1)
                              }
                              className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-base leading-none"
                            >+</button>
                          </div>
                          <button
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <img src={assets.bin_icon} className="w-4" alt="Remove" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer – totals + proceed */}
            {cartData.length > 0 && (
              <div className="px-6 py-4 border-t bg-gray-50 flex-shrink-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">{currency} {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-500">Shipping Fee</span>
                  <span className="font-medium">{currency} {delivery_fee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-semibold mb-4 pt-3 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span>{currency} {total.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    if (!token) {
                      setCartDrawerOpen(false);
                      navigate('/login');
                    } else {
                      setView('checkout');
                    }
                  }}
                  className="w-full py-3 bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 active:bg-gray-700 transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </>
        )}

        {/* ══════════════════════════ CHECKOUT VIEW ══════════════════════════ */}
        {view === 'checkout' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView('cart')}
                  className="text-gray-500 hover:text-black transition-colors"
                  aria-label="Back to cart"
                >
                  <img src={assets.dropdown_icon} className="h-3 rotate-180" alt="Back" />
                </button>
                <h2 className="text-base font-semibold tracking-wide">CHECKOUT</h2>
              </div>
              <button
                onClick={() => setCartDrawerOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <img src={assets.cross_icon} className="w-3" alt="Close" />
              </button>
            </div>

            {/* Scrollable form area */}
            <form onSubmit={onPlaceOrder} className="flex-1 overflow-y-auto flex flex-col min-h-0">
              <div className="px-6 py-4 flex flex-col gap-3 flex-1">

                {/* Compact order summary */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Order Summary ({cartData.length} item{cartData.length !== 1 ? 's' : ''})
                  </p>
                  <div className="bg-gray-50 rounded p-3 space-y-1.5">
                    {cartData.map((item, i) => {
                      const product = products.find((p) => p._id === item._id);
                      if (!product) return null;
                      const price = getDiscountedPrice(product);
                      return (
                        <div key={i} className="flex justify-between text-xs text-gray-600">
                          <span className="truncate max-w-[62%]">
                            {product.name}{' '}
                            <span className="text-gray-400">
                              ({item.size}) ×{item.quantity}
                            </span>
                          </span>
                          <span className="font-medium ml-2 flex-shrink-0">
                            {currency} {(price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                    <div className="border-t pt-1.5 mt-1 flex justify-between text-xs text-gray-500">
                      <span>Shipping</span>
                      <span>{currency} {delivery_fee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold pt-0.5">
                      <span>Total</span>
                      <span>{currency} {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery information */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                  Delivery Information
                </p>

                <div className="flex gap-2">
                  <input
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={onChangeHandler}
                    className={inputCls}
                    type="text"
                    placeholder="First Name *"
                  />
                  <input
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={onChangeHandler}
                    className={inputCls}
                    type="text"
                    placeholder="Last Name *"
                  />
                </div>

                <input
                  required
                  name="email"
                  value={formData.email}
                  onChange={onChangeHandler}
                  className={inputCls}
                  type="email"
                  placeholder="Email Address *"
                />

                <input
                  required
                  name="street"
                  value={formData.street}
                  onChange={onChangeHandler}
                  className={inputCls}
                  type="text"
                  placeholder="Street / Address *"
                />

                <div className="flex gap-2">
                  <input
                    required
                    name="city"
                    value={formData.city}
                    onChange={onChangeHandler}
                    className={inputCls}
                    type="text"
                    placeholder="City *"
                  />
                  <input
                    required
                    name="state"
                    value={formData.state}
                    onChange={onChangeHandler}
                    className={inputCls}
                    type="text"
                    placeholder="State *"
                  />
                </div>

                <input
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={onChangeHandler}
                  className={inputCls}
                  type="text"
                  placeholder="Zip Code"
                />

                <div>
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={onChangeHandler}
                    className={inputCls}
                    type="text"
                    placeholder="Phone: +923001234567 *"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Pakistani number required (starts with +92)
                  </p>
                </div>

                {/* Payment method */}
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">
                  Payment Method
                </p>
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded bg-white">
                  <div className="w-3.5 h-3.5 border-2 border-green-600 rounded-full bg-green-600 flex-shrink-0" />
                  <p className="text-sm font-medium text-gray-600">CASH ON DELIVERY</p>
                </div>

                <p className="text-xs text-gray-400">* Required fields</p>
              </div>

              {/* Sticky place-order button */}
              <div className="px-6 py-4 border-t bg-gray-50 flex-shrink-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 active:bg-gray-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'PLACING ORDER…' : 'PLACE ORDER'}
                </button>
              </div>
            </form>
          </>
        )}

        {/* ══════════════════════════ SUCCESS VIEW ═══════════════════════════ */}
        {view === 'success' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0">
              <h2 className="text-base font-semibold tracking-wide">ORDER CONFIRMED</h2>
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <img src={assets.cross_icon} className="w-3" alt="Close" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
              {/* Checkmark */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Order Placed!</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your order has been placed successfully.<br />
                  We'll confirm it shortly.
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <button
                  onClick={() => {
                    setCartDrawerOpen(false);
                    navigate('/orders');
                  }}
                  className="w-full py-3 bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 active:bg-gray-700 transition-colors"
                >
                  VIEW MY ORDERS
                </button>
                <button
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-full py-3 border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
