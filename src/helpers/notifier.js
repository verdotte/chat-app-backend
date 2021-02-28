const notifier = (event, payload = null, io) => {
  io.emit(event, payload);
};

export default notifier;
