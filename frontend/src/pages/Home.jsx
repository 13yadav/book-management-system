import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { Book } from "../components/Book";
import { NoBooksFound } from "../components/NoBooksFound";

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
  };

  return (
    <>
      {books.length > 0 ? (
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {books.map((book) => (
            <Book
              key={book._id}
              book={book}
              handleUnpublish={handleUnpublish}
              showUnpublishButton={true}
            />
          ))}
        </div>
      ) : (
        <NoBooksFound />
      )}
    </>
  );
}
