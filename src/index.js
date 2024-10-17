import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ThemeContext from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext"; // Import UserProvider
import { GoogleMapsProvider } from "./context/GoogleMaps";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/react/demo">
        <GoogleMapsProvider>
          <ThemeContext>
            <UserProvider>
              <App />
            </UserProvider>
          </ThemeContext>
        </GoogleMapsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
