import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { history } from "./helpers/history";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Error404 } from "./pages/errors/Error404";

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* dynamic routing */}
        {/* <Route path="/books/:bookId" element={<BookDetails />} /> */}

        {/* not found */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
