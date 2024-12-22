import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { publicroute } from "./routes/router.jsx";
import { persistor, store } from "./redux/Store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={publicroute}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
