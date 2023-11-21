import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthPage, DashboardPage } from "../pages";
import {
  AgregarProductos,
  MisProductos,
  MisVentas,
} from "@containers/dashboard";

const PrivateRoute = ({ Component }: { Component: any }) => {
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Component />;
  } else {
    window.location.replace("/auth");
    return <div></div>;
  }
};

const RoutesComponent = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="/*"
          element={<PrivateRoute Component={<DashboardPage />} />}
        >
          <Route
            index
            element={
              <PrivateRoute Component={<div>administra los productos</div>} />
            }
          />
          <Route path="add" element={<AgregarProductos />} />
          <Route
            path="products"
            element={<PrivateRoute Component={<MisProductos />} />}
          />
          <Route
            path="sales"
            element={<PrivateRoute Component={<MisVentas />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
