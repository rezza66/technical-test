import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../AuthContext";
import axios from "axios";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn, token]);

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`, { state: { products } });
  };

  const deleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } catch (error) {
        console.error("Error deleting product:", error.message);
        setError("Failed to delete product");
      }
    }
  };

  // Fungsi untuk format harga menjadi IDR
  const formatPriceToIDR = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="m-7 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <Button className="ml-auto" onClick={handleAddProduct}>Add Product</Button>
        </div>
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product Code</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product, index) => (
                  <TableRow key={product._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{product.pd_code}</TableCell>
                    <TableCell>{product.pd_ct_id?.ct_name || "N/A"}</TableCell>
                    <TableCell>{product.pd_name}</TableCell>
                    <TableCell>{formatPriceToIDR(product.pd_price)}</TableCell>
                    <TableCell>
                      <Button
                        variant="default"
                        onClick={() => handleEditProduct(product._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => deleteProduct(product._id)}
                        className="ml-2"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;
