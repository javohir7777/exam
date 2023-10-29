import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import HomePage from "./page/HomePage";
import CRUDPage from "./page/CRUDPage";
import { ToastContainer } from "react-toastify";
import useAuth from "./store/auth";
import AdminLayout from "./components/admin";
import Skills from "./page/Skills";
import Portfolio from "./page/Portfolio";
import UserLayout from "./components/UserLayout";
import Experiences from "./page/Experiences";
import Education from "./page/Education";
// import UserLayout from "./components/UserLayout";

function App() {
  // const { isAuthenticated, user } = useAuth();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            isAuthenticated && user?.role === "client" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="crud" element={<CRUDPage />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="education" element={<Education />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
