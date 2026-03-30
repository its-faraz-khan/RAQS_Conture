import { useEffect, useRef, useState } from "react";

const GOOGLE_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

let googleScriptPromise = null;

const loadGoogleIdentityScript = () => {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.google?.accounts?.id) return Promise.resolve(window.google);
  if (googleScriptPromise) return googleScriptPromise;

  googleScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[data-google-identity="true"]'
    );

    if (existingScript) {
      if (window.google?.accounts?.id) {
        resolve(window.google);
      } else {
        existingScript.addEventListener("load", () => resolve(window.google), { once: true });
        existingScript.addEventListener("error", reject, { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.onload = () => resolve(window.google);
    script.onerror = () => {
      googleScriptPromise = null;
      reject(new Error("Failed to load Google Identity script"));
    };
    document.body.appendChild(script);
  });

  return googleScriptPromise;
};

const GoogleSignInButton = ({
  clientId,
  onCredential,
  onError,
  disabled = false,
  isConfigLoading = false,
  visible = true,
}) => {
  // wrapperRef is on the outer div (always mounted)
  // buttonRef is on the inner div Google renders into (always mounted when visible)
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const onCredentialRef = useRef(onCredential);
  const onErrorRef = useRef(onError);

  // "loading" | "ready" | "error" | "missing-config"
  const [status, setStatus] = useState(clientId ? "loading" : "missing-config");

  useEffect(() => {
    onCredentialRef.current = onCredential;
    onErrorRef.current = onError;
  }, [onCredential, onError]);

  useEffect(() => {
    if (!visible) return undefined;

    if (!clientId) {
      setStatus("missing-config");
      return undefined;
    }

    setStatus("loading");
    let isActive = true;

    loadGoogleIdentityScript()
      .then(() => {
        if (!isActive) return;

        if (!window.google?.accounts?.id) {
          setStatus("error");
          onErrorRef.current?.("Google Sign-In could not be loaded. Please refresh and try again.");
          return;
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (!response?.credential) {
              onErrorRef.current?.("Google did not return a credential. Please try again.");
              return;
            }
            onCredentialRef.current?.(response.credential);
          },
          context: "signin",
          auto_select: false,
        });

        // Mark ready — the useEffect below will render the button
        // once buttonRef.current is guaranteed to be in the DOM
        setStatus("ready");
      })
      .catch(() => {
        if (!isActive) return;
        googleScriptPromise = null;
        setStatus("error");
        onErrorRef.current?.("Failed to load Google Sign-In. Please refresh and try again.");
      });

    return () => {
      isActive = false;
    };
  }, [clientId, visible]);

  // Second effect: runs AFTER status transitions to "ready", so buttonRef.current is live
  useEffect(() => {
    if (status !== "ready" || !buttonRef.current || !window.google?.accounts?.id) return;

    const renderGoogleButton = () => {
      if (!buttonRef.current || !window.google?.accounts?.id) return;
      const containerWidth = wrapperRef.current?.offsetWidth || 320;
      const buttonWidth = Math.max(220, Math.min(Math.round(containerWidth - 24), 360));
      buttonRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        type: "standard",
        shape: "pill",
        text: "signin_with",
        logo_alignment: "left",
        width: buttonWidth,
      });
    };

    renderGoogleButton();
    window.addEventListener("resize", renderGoogleButton);
    return () => window.removeEventListener("resize", renderGoogleButton);
  }, [status]);

  if (!visible) return null;

  // Determine what fallback message to show
  const getClickMessage = () => {
    if (isConfigLoading) return "Google sign-in is still loading. Please wait a moment.";
    if (status === "error") return "Google Sign-In could not be loaded. Please refresh and try again.";
    if (status === "missing-config") return "Google sign-in is not configured. Please add VITE_GOOGLE_CLIENT_ID to frontend/.env and restart.";
    return "Google sign-in is initializing. Please wait a moment.";
  };

  const isLoading = isConfigLoading || status === "loading";
  const showFallback = status !== "ready" || isConfigLoading;

  return (
    <div ref={wrapperRef} className="w-full">
      {/* Always render the Google button target div so it's in the DOM when renderButton fires */}
      <div
        ref={buttonRef}
        className={`flex justify-center ${disabled ? "pointer-events-none opacity-60" : ""} ${showFallback ? "hidden" : ""}`}
      />

      {/* Fallback / loading UI — shown while Google script hasn't rendered yet */}
      {showFallback && (
        <button
          type="button"
          onClick={() => onErrorRef.current?.(getClickMessage())}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-[#f7f8fb] px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-[#eef1f7]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-700 shadow-sm">
            {isLoading ? (
              <svg
                className="animate-spin h-4 w-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              "G"
            )}
          </span>
          <span>{isLoading ? "Loading Google Sign-In..." : "Sign in with Google"}</span>
        </button>
      )}
    </div>
  );
};

export default GoogleSignInButton;
