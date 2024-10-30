import React, { useState, useEffect, useContext } from 'react'; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const { token, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching orders:", error.message);
      }
    };

    if (isLoggedIn && token) {
      fetchOrders();
    }
  }, [isLoggedIn, token]);

  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => 
      order._id === id ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className='min-h-screen flex'>
      <Sidebar />
      <div className="m-7">
        <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{order.or_pd_id.pd_name}</TableCell>
                  <TableCell>{order.or_amount}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => updateStatus(order._id, 'Shipped')}
                      disabled={order.status !== 'Pending'}
                      className="mr-2"
                    >
                      Ship
                    </Button>
                    <Button 
                      onClick={() => updateStatus(order._id, 'Delivered')}
                      disabled={order.status !== 'Shipped'}
                    >
                      Deliver
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

export default ManageOrders;
