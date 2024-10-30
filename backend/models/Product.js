import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    pd_code: {
      type: String,
      required: true,
      unique: true,
    },
    pd_ct_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    pd_name: {
      type: String,
      required: true,
    },
    pd_price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
