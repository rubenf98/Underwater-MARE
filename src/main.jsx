import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store, persistor } from "../redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { setAuthorizationToken } from "redux_modules/auth/actions.js";

import Loading from "src/views/Loading/Loading.jsx";

if (localStorage.getItem("token")) {
  setAuthorizationToken(localStorage.getItem("token"));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
