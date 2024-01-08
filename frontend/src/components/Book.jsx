import bookImg from "../assets/book-cover.jpg";

export function Book({ book, handleUnpublish, showUnpublishButton }) {
  return (
    <div className="rounded-md border h-full">
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
        {showUnpublishButton && book.published && (
          <button
            type="button"
            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => handleUnpublish(book._id)}
          >
            Unpublish
          </button>
        )}
      </div>
    </div>
  );
}
