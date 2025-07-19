// App.tsx
import { BrowserRouter, useRoutes } from "react-router-dom";
import { Suspense } from "react";
import Loader from "./components/reusable/Loader";
import { ToastContainer } from "react-toastify";
import routes from "./route/route";
import './App.css'

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
        <ToastContainer style={{ color: "black" }} autoClose={2000} />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
