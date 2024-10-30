import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('or_pd_id');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteOrder = async (req, res) => {
    try {
      const order = await Order.findOneAndDelete({ or_id: req.params.id });
      if (!order) return res.status(404).json('Order not found');
      res.status(200).json('Order deleted');
    } catch (error) {
      res.status(500).json(error);
    }
  };