import { useParams } from "react-router-dom";

export const BookDetails = () => {
  const { bookId } = useParams();

  return (
    <div className="container">
      <h1>Products Details Page - {bookId}</h1>
    </div>
  );
};
