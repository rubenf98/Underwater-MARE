import isPromise from "is-promise";

export default function messageMiddleware() {
  return (next) => (action) => {
    // If not a promise, continue on
    if (!isPromise(action.payload)) {
      return next(action);
    }

    /*
     * The error middleware serves to dispatch the initial pending promise to
     * the promise middleware, but adds a `catch`.
     */
    /* const { globalError, messageError } = action.meta;

    if (globalError) {
      return next(action).catch(error => {
        if (messageError) {
          message.error(messageError);
        } else if (error.toString().includes("403")) {
          message.error("You don't have permission!");
        } else {
          message.error("Something went wrong. Please try again!");
        }

        throw error;
      });
    } */

    return next(action);
  };
}
