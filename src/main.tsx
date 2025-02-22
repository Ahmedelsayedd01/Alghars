import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { StoreApp } from "./Store/Store";
import { ContextProvider } from "./Context/Auth";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={StoreApp}>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </Provider>
  </StrictMode>
);
