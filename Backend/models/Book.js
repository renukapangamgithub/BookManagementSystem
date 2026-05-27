import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: { type: String, required: [true, "Genre is required"] },
    year: { type: Number, required: [true, "Year is required"] },
  },
  { timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
