import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage, DashboardPage } from "../pages";
import {
  AgregarProductos,
  MisProductos,
  MisVentas,
} from "@containers/dashboard";

const RoutesComponent = () => {
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (!currentUser && window.location.pathname !== "/") {
      window.location.replace("/");
      return;
    }
  }, [currentUser, window.location.pathname]);
  return (
    <BrowserRouter>
      <Routes>
        {!currentUser ? (
          <Route path="/" element={<AuthPage />} />
        ) : (
          <Route path="/*" element={<DashboardPage />}>
            <Route index element={<div>administra los productos</div>} />
            <Route path="add" element={<AgregarProductos />} />
            <Route path="products" element={<MisProductos />} />
            <Route path="sales" element={<MisVentas />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
