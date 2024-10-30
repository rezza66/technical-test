import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../AuthContext';
import axios from "axios";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    productCode: "",
    category: "",
    name: "",
    price: "",
  });
  const [categories, setCategories] = useState([]); 
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          pd_code: formData.productCode,  
          pd_ct_id: formData.category,    
          pd_name: formData.name,         
          pd_price: parseFloat(formData.price)  
        };

        await axios.post("http://localhost:5000/products", payload, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        setMessage("Product added successfully!");
        setFormData({
          productCode: "",
          category: "",
          name: "",
          price: "",
        });
        navigate('/manage-products');
      } catch (error) {
        console.error("Error:", error.message);
        setMessage("Failed to add product");
      }
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.productCode)
      tempErrors.productCode = "Product code is required";
    if (!formData.category) tempErrors.category = "Category is required";
    if (!formData.name) tempErrors.name = "Product name is required";
    if (!formData.price) tempErrors.price = "Price is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
        {message && <p>{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="productCode" className="block text-sm font-medium text-gray-700 mb-1">
              Product Code
            </label>
            <Input
              type="text"
              id="productCode"
              name="productCode"
              value={formData.productCode}
              onChange={handleChange}
              className={errors.productCode ? "border-red-500" : "border-gray-300"}
              placeholder="Enter product code"
            />
            {errors.productCode && <p className="text-red-500">{errors.productCode}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.ct_name}
                </option>
              ))}
            </select>
            {errors.category && <p className="text-red-500">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-red-500" : "border-gray-300"}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <Input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={errors.price ? "border-red-500" : "border-gray-300"}
              placeholder="Enter price"
            />
          </div>

          <Button type="submit">Add Product</Button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
