import React, { useState, useEffect, useContext } from 'react'; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../AuthContext'; 
import axios from 'axios';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { token, isLoggedIn } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/categories', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching categories:", error.message);
      }
    };

    if (isLoggedIn && token) {
      fetchCategories();
    }
  }, [isLoggedIn, token]);

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(categories.filter(category => category._id !== id));
      setMessage('Category deleted successfully!');
    } catch (error) {
      setError(error.message);
      console.error("Error deleting category:", error.message);
    }
  };

  return (
    <div className='min-h-screen flex'>
      <Sidebar />
      <div className="m-7 w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Manage Categories</h1>
          <Button className="ml-auto">Add Category</Button>
        </div>

        {message && <p className="text-green-500">{message}</p>}
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Code Cat.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{category.ct_code}</TableCell>
                  <TableCell>{category.ct_name}</TableCell>
                  <TableCell>
                    <Button 
                      variant="destructive" 
                      onClick={() => deleteCategory(category._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageCategory;
