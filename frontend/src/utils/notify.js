const notify = (message) => {
  window.dispatchEvent(new CustomEvent('app-notify', { detail: { message } }));
};

export default notify;
