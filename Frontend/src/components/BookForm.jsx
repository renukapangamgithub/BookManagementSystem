import React, { useState, useEffect } from "react";
import { FiBook, FiUser, FiTag, FiCalendar, FiPlusCircle, FiSave } from "react-icons/fi";

const GENRES = ["Fiction", "Non-Fiction", "Tech", "Mystery", "Fantasy", "Science Fiction", "Biography", "Self-Help"];

const EMPTY = { title: "", author: "", genre: "", year: "" };

const BookForm = ({ onSubmit, selectedBook, onCancel }) => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(selectedBook ? { ...selectedBook } : EMPTY);
    setErrors({});
  }, [selectedBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.author.trim()) e.author = "Author is required";
    if (!form.genre) e.genre = "Select a genre";
    if (!form.year || isNaN(form.year) || form.year < 1000 || form.year > new Date().getFullYear())
      e.year = "Enter a valid year";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
    setForm(EMPTY);
  };

  const fields = [
    { name: "title",  placeholder: "Book title",   icon: <FiBook />,     type: "text"   },
    { name: "author", placeholder: "Author name",  icon: <FiUser />,     type: "text"   },
    { name: "year",   placeholder: "Published year", icon: <FiCalendar />, type: "number" },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="text-base font-semibold text-gray-700 mb-4 flex items-center gap-2">
        {selectedBook
          ? <><FiSave className="text-indigo-500" /> Update Book</>
          : <><FiPlusCircle className="text-indigo-500" /> Add New Book</>}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {fields.map(({ name, placeholder, icon, type }) => (
            <div key={name}>
              <div className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:bg-white transition ${errors[name] ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
                <span className="text-gray-400 shrink-0">{icon}</span>
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="bg-transparent w-full text-sm outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              {errors[name] && <p className="text-xs text-red-500 mt-1 ml-1">{errors[name]}</p>}
            </div>
          ))}

          {/* Genre select */}
          <div>
            <div className={`flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-300 focus-within:bg-white transition ${errors.genre ? "border-red-400 bg-red-50" : "border-gray-200"}`}>
              <FiTag className="text-gray-400 shrink-0" />
              <select
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className="bg-transparent w-full text-sm outline-none text-gray-700 cursor-pointer"
              >
                <option value="">Select genre...</option>
                {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            {errors.genre && <p className="text-xs text-red-500 mt-1 ml-1">{errors.genre}</p>}
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition"
          >
            {selectedBook ? <><FiSave /> Update Book</> : <><FiPlusCircle /> Add Book</>}
          </button>
          {selectedBook && (
            <button
              type="button"
              onClick={onCancel}
              className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;