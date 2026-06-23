import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import { TaskProvider } from "./context/TaskContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading....</div>}>
        <TaskProvider>
          <App />
          <Toaster position="top-center" />
        </TaskProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
