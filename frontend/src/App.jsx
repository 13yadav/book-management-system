import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { history } from "./helpers/history";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { PublishBook } from "./pages/PublishBook";
import { Navbar } from "./components/Navbar";
import { Error404 } from "./pages/errors/Error404";
import { AllBooks } from "./pages/AllBooks";
// import PrivateRoutes from "./helpers/privateRoutes";

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/publish" element={<PublishBook />} />

        {/* <Route element={<PrivateRoutes />}>
        </Route> */}

        {/* dynamic routing */}
        {/* <Route path="/books/:bookId" element={<BookDetails />} /> */}

        {/* not found */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
