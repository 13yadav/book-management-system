import { useEffect, useState } from "react";
import bookImg from "../assets/book-cover.jpg";
import ApiService from "../services/ApiService";

export function Home() {
  const [books, setBooks] = useState([]);

  const getUserBooks = async () => {
    try {
      const { data } = await ApiService.get("/books/user");
      setBooks(data.books);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBooks();
  }, []);

  const handleUnpublish = async (bookId) => {
    try {
      const { data } = await ApiService.put(`/books/unpublish/${bookId}`);
      alert(data.message);
      getUserBooks();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {books.map((book) => (
        <div key={book._id} className="rounded-md border h-full">
          <img
            src={bookImg}
            className="aspect-[16/9] w-full rounded-md md:aspect-auto h-[150px] object-cover"
          />
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">
              {book.title}
            </h1>
            <p className="mt-2 text-sm text-gray-600">{book.description}</p>
            <div className="mb-2 mt-3 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              {book.createdBy.name}
            </div>
            {book.published &&
              <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={() => handleUnpublish(book._id)}
            >
              Unpublish
            </button>}
          </div>
        </div>
      ))}
    </div>
  );
}
