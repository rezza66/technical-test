import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    ct_code: {
      type: String,
      required: true,
      unique: true,
    },
    ct_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
