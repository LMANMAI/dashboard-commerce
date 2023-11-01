import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage, DashboardPage } from "../pages";
import {
  AgregarProductos,
  MisProductos,
  MisVentas,
} from "@containers/dashboard";
const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/*" element={<DashboardPage />}>
          <Route index element={<div>administra los productos</div>} />
          <Route path="add" element={<AgregarProductos />} />
          <Route path="products" element={<MisProductos />} />
          <Route path="sales" element={<MisVentas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
