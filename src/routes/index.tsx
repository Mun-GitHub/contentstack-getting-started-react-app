import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "../components/home/Home";
// COMMENT: Uncomment below import statement
import Menu from "../components/menu/Menu";
import { fetchInitialData } from "../api";
import { useDispatch } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import { NotFound } from "../components/NotFound";

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData(dispatch, setLoading);
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            <Header />
            <div className="body">
              <Routes>
                <Route path="/" element={<Home />} />
                {/* COMMENT: Replace below element from <NotFound /> to <Menu /> */}
                <Route path="/menu" element={<Menu />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
};

export default AppRoutes;
