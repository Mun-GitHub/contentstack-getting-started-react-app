import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Home from "../components/home/Home";
import Menu from "../components/menu/Menu";
import { fetchInitialData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import LoadingScreen from "../components/LoadingScreen";
import { NotFound } from "../components/NotFound";
import { onEntryChange } from "../sdk/utils";

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state.main.locale);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchInitialData(dispatch, setLoading, locale);
    onEntryChange(() => {
      fetchInitialData(dispatch, setLoading, locale);
    });
  }, [dispatch, locale]);

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
