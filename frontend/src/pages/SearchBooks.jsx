import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { Book } from "../components/Book";
import { NoBooksFound } from "../components/NoBooksFound";
import { toast } from 'react-hot-toast';

export function SearchBooks() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [booksNotFound, setBooksNotFound] = useState(false);

  useEffect(() => {
    let timerId;

    const handleSearch = async () => {
      try {
        const { data } = await ApiService.get(
          `/books/search?title=${searchQuery}`
        );
        setBooks(data.books);
        if (data.books.length === 0) {
          setBooksNotFound(true);
        }
      } catch ({ response }) {
        toast.error(response?.data?.message)
      }
    };

    if (searchQuery) {
      clearTimeout(timerId);
      timerId = setTimeout(handleSearch, 500);
    } else {
      setBooks([]);
      setBooksNotFound(false);
    }

    return () => clearTimeout(timerId);
  }, [searchQuery]);

  return (
    <>
      <div className="flex justify-center px-4 my-2">
        <input
          className="flex h-10 w-full md:w-1/3 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search books with title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        ></input>
      </div>
      {books.length > 0 ? (
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
          {books.map((book) => (
            <Book key={book._id} book={book} showUnpublishButton={false} />
          ))}
        </div>
      ) : (
        <>{booksNotFound ? <NoBooksFound /> : null}</>
      )}
    </>
  );
}
