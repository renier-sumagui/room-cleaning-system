import React from "react";
import ReactDOM from "react-dom/client";
import "css/normalize.css";
import "css/main.css";
import { RouterProvider } from "react-router-dom";
import router from "routes/router.jsx";
import { UserContextProvider } from "contexts/UserContext";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <UserContextProvider>
            <RouterProvider router={router}>
                {router}
            </RouterProvider>
        </UserContextProvider>
    </React.StrictMode>,
)
