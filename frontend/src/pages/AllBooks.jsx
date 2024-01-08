import { useCallback, useEffect, useState } from "react";
import bookImg from "../assets/book-cover.jpg";
import ApiService from "../services/ApiService";

export function AllBooks() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllBooks = useCallback(async () => {
    try {
      const { data } = await ApiService.get(`/books/published?page=${currentPage}`);
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
        const { data } = await ApiService.get(`/books/search?title=${searchQuery}`);
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
  }

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
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-xl">No books found</div>
      )}
      {currentPage < totalPages && <div className="text-center mb-8">
        <button
          type="button"
          onClick={loadMore}
          className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Load More
        </button>
      </div>}
    </>
  );
}
