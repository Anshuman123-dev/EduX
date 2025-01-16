// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import { Toaster } from "react-hot-toast";
// import rootReducer from "./reducer"

// const store = configureStore({
//   reducer:rootReducer,
// });

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//         <Toaster/>
//       </BrowserRouter>
//     </Provider>
   
//   </React.StrictMode>
// );



import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";
import rootReducer from "./reducer";
import { ThemeProvider } from "./context/ThemeContext";  // Import your ThemeContext provider
import "./index.css";

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
});

// Render the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> {/* Optional: StrictMode is great for development to highlight potential issues */}
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider> {/* Wrap your app with ThemeProvider to provide theme context */}
          <App />
          <Toaster /> {/* Toaster placed outside App to catch toast notifications globally */}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
