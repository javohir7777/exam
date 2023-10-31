import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import CRUDPage from "./page/CRUDPage";
import { ToastContainer } from "react-toastify";
import useAuth from "./store/auth";
import AdminLayout from "./components/admin";
import Portfolio from "./page/Portfolio";
import Experiences from "./page/Experiences";
import Education from "./page/Education";
import HomePage from "./page/HomePage";
import FrontLayout from "./components/Front/layout";
import FrontExperiences from "./page/FrontExperiences";
import FrontEducation from "./page/FrontEducation";
import FrontPortfolio from "./page/FrontPortfolio";
import FrontTestmonial from "./page/FrontTestmonial";
import FrontContact from "./page/FrontContact";
import Account from "./page/Account";
import Messages from "./page/Messages";

function App() {
  // const { isAuthenticated, user } = useAuth();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.user);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
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
          <Route path="messages" element={<Messages />} />
          <Route path="account" element={<Account />} />
          <Route path="portfolio" element={<Portfolio />} />
        </Route>
        <Route path="home/" element={<FrontLayout />}>
          <Route path="" element={<HomePage />} />
          <Route path="experiences" element={<FrontExperiences />} />
          <Route path="education" element={<FrontEducation />} />
          <Route path="portfolio" element={<FrontPortfolio />} />
          <Route path="testmonial" element={<FrontTestmonial />} />
          <Route path="contactUs" element={<FrontContact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
