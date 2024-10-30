import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; 

const ProductCard = ({ pd_id, productCode, category, name, price }) => {
  const [or_amount, setOrAmount] = useState(1); 

  const handleOrder = async () => {
    try {
      const orderData = {
        or_pd_id: pd_id, 
        or_amount, 
      };

      const response = await axios.post('http://localhost:5000/orders', orderData); 
      Swal.fire({
        title: 'Success!',
        text: 'Order placed successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error('Error placing order:', error);

      Swal.fire({
        title: 'Failed!',
        text: `Failed to place order: ${error.response ? error.response.data.message : 'An error occurred'}`,
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <div className="max-w-xs rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <span className="text-sm text-gray-500">
            Code: {productCode}
          </span>
        </div>
        <h3 className="font-semibold text-lg mt-2 line-clamp-2">
          {name}
        </h3>
          <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
            {category}
          </span>
        <p className="text-xl font-bold text-blue-600 mt-1">
          {formatPrice(price)}
        </p>
        <div className="mt-2">
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="quantity">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={or_amount}
            onChange={(e) => setOrAmount(parseInt(e.target.value))} // Update jumlah order
            className="w-20 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          onClick={handleOrder}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
