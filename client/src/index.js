import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./contextProviders/UserProvider";
import ImagesProvider from "./contextProviders/ImagesProvider";
import CategoriesProvider from "./contextProviders/CategoriesProvider";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <UserProvider>
            <ImagesProvider>
              <CategoriesProvider>
                <App />
              </CategoriesProvider>
            </ImagesProvider>
          </UserProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
