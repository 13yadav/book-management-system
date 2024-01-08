import { useCallback, useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { Book } from "../components/Book";
import { NoBooksFound } from "../components/NoBooksFound";

export function AllBooks() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllBooks = useCallback(async () => {
    try {
      const { data } = await ApiService.get(
        `/books/published?page=${currentPage}`
      );
      setBooks((prevBooks) => [...prevBooks, ...data.books]);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  useEffect(() => {
    let timerId;

    const handleSearch = async () => {
      try {
        const { data } = await ApiService.get(
          `/books/search?title=${searchQuery}`
        );
        setBooks(data.books);
      } catch (error) {
        console.log(error);
      }
    };

    if (searchQuery) {
      clearTimeout(timerId);
      timerId = setTimeout(handleSearch, 500);
    } else {
      getAllBooks();
    }

    return () => clearTimeout(timerId);
  }, [searchQuery, getAllBooks]);

  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
        <NoBooksFound />
      )}
      {books.length > 0 && currentPage < totalPages && (
        <div className="text-center mb-8">
          <button
            type="button"
            onClick={loadMore}
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
