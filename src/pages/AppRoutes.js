import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";

const AutherizedRoutes = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? children : <Navigate replace to="/login" />;
};

const UnAutherizedRoutes = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return !isLoggedIn ? children : <Navigate replace to="/" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <AutherizedRoutes>
              <Home />
            </AutherizedRoutes>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <UnAutherizedRoutes>
              <Login />
            </UnAutherizedRoutes>
          }
        />
        <Route
          exact
          path="/signup"
          element={
            <UnAutherizedRoutes>
              <SignUp />
            </UnAutherizedRoutes>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
