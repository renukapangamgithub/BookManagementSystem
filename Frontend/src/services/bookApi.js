import axios from "axios";
import { serverURL } from "../App";

const API = `${serverURL}/api/books`;

export const fetchBooks = async (page = 1) => {
  const res = await axios.get(
    `${API}?page=${page}&limit=6`
  );

  return res.data;
};

export async function createBook(bookData) {
  return await axios.post(API, bookData, {
    withCredentials: true,
  });
}

export async function updateBook(id, bookData) {
  return await axios.put(`${API}/${id}`, bookData, {
    withCredentials: true,
  });
}

export async function deleteBook(id) {
  return await axios.delete(`${API}/${id}`, {
    withCredentials: true,
  });
}