import React, { useState, useEffect, useContext } from "react";
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

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.us_id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="m-7">
        <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan="5">No users found.</TableCell>{" "}
            </TableRow>
          ) : (
            users.map((user, index) => (
              <TableRow key={user.us_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.us_name}</TableCell>
                <TableCell>{user.us_email}</TableCell>
                <TableCell>{user.us_phone_number}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => deleteUser(user.us_id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </div>
    </div>
  );
};

export default ManageUser;
