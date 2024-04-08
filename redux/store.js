import rootReducer from "./rootReducer";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import messageMiddleware from "./messageMiddleware";
import promise from "redux-promise-middleware";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(messageMiddleware, thunk, promise))
);

export const persistor = persistStore(store);

/* const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(messageMiddleware, thunk, promise))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
 */
