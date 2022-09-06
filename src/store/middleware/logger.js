export const customLoggerMiddleware = (state) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('Type:', action.type);
  console.log('Payload:', action.payload);
  console.log('Previous State:', store.getState());

  next(action);

  console.log('Type:', action.type);
  console.log('Payload:', action.payload);
  console.log('Next State:', store.getState());
};
