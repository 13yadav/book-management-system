import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { history } from "./helpers/history";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Home } from "./pages/Home";
import { PublishBook } from "./pages/PublishBook";
import { Navbar } from "./components/Navbar";
import { Error404 } from "./pages/errors/Error404";
import { AllBooks } from "./pages/AllBooks";
import { getToken } from "./services/JwtService";
import { SearchBooks } from "./pages/SearchBooks";

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  const isAuthenticated = !!getToken();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/signin" />}
        />
        <Route
          path="/books"
          element={isAuthenticated ? <AllBooks /> : <Navigate to="/signin" />}
        />
        <Route
          path="/books/search"
          element={isAuthenticated ? <SearchBooks /> : <Navigate to="/signin" />}
        />
        <Route
          path="/books/publish"
          element={
            isAuthenticated ? <PublishBook /> : <Navigate to="/signin" />
          }
        />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
