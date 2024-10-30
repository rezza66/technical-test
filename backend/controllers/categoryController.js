import Category from '../models/Category.js';

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error(error)
    res.status(400).json(error);
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate({ ct_id: req.params.id }, req.body, { new: true });
    if (!category) return res.status(404).json('Category not found');
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id });
    if (!category) return res.status(404).json('Category not found');
    res.status(200).json('Category deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};
