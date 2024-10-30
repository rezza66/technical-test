import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('pd_ct_id', 'ct_name'); 
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error); 
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductsCard = async (req, res) => {
  try {
    const products = await Product.find().populate('pd_ct_id', 'ct_name'); 
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error); 
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('pd_ct_id', 'ct_name');
    if (!product) return res.status(404).json('Product not found');
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    if (!product) return res.status(404).json('Product not found');
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating product:', error); 
    res.status(400).json(error);
  }
};



export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ _id: req.params.id });
    if (!product) return res.status(404).json('Product not found');
    res.status(200).json('Product deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
