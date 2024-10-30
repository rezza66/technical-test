import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/AuthContainer";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectRoute";
import ManageUsers from "./pages/ManageUsers";
import ManageProducts from "./pages/ManageProducts";
import ManageCategories from "./pages/ManageCategory";
import ManageOrders from "./pages/ManageOrders";
import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductForm from "./pages/ManageProductAdd";
import EditProductForm from "./pages/ManageProductEdit";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/manage-users"
              element={
                <ProtectedRoute>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/manage-products"
              element={
                <ProtectedRoute>
                  <ManageProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <ProductForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-product/:id"
              element={
                <ProtectedRoute>
                  <EditProductForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-categories"
              element={
                <ProtectedRoute>
                  <ManageCategories />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-orders"
              element={
                <ProtectedRoute>
                  <ManageOrders />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
