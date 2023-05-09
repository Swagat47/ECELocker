import React, { useContext } from "react";
//import logo from './logo.svg';
//import './App.css';
import LoginPage from "./Pages/LoginPage";
import NoticePage from "./Pages/NoticePage";
import AboutusPage from "./Pages/AboutPage";
import RegisterPage from "./Pages/RegisterPage";
import RegisterAdminPage from "./Pages/RegisterAdminPage";
import HomePage from "./Pages/HomePage";
import UserProfilePage from "./Pages/UserProfilePage";
import NavBarPage from "./Pages/NavBarPage";
import ListOfCompaniesPage from "./Pages/ListofCompanies";
import OpportunitiesPage from "./Pages/Opportunities";
import ResumePage from "./Pages/ResumePage";
import ContactUsPage from "./Pages/ContactUsPage";
import StatisticsPage from "./Pages/StatisticsPage";
import CompanyDetailPage from "./Pages/CompanyDetailPage";
import { BrowserRouter as Router, Link, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { InfoContext } from "./Context/UserContext";
import ActivatePage from "./Pages/ActivatePage";

function App() {

  const context = useContext(InfoContext)

  return (
    <>
      <Router>

        <Routes>
          <Route path="/active/:token" element={<ActivatePage />} />
        </Routes>
        <Routes>
          <Route element={context?.info ? <Navigate to={"/"} />:<Outlet/>} >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/registeradmin" element={<RegisterAdminPage />} />
          </Route>
        </Routes>
        <div>
          {/* <NavBarPage /> */}
          <Routes>
            <Route element={context?.info ?<Outlet/>:<Navigate to={"/login"} />} >
              <Route path="/" element={<HomePage />} />
              <Route path="/notices" element={<NoticePage />} />
              <Route path="/about" element={<AboutusPage />} />
              <Route path="/opportunities" element={<OpportunitiesPage />} />
              <Route path="/statistics" element={<StatisticsPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/contactus" element={<ContactUsPage />} />
              <Route path="/companies" element={<ListOfCompaniesPage />} />
              <Route path="/companydetail" element={<CompanyDetailPage />} />
              <Route path="/userProfile" element={<UserProfilePage />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
