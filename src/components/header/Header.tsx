import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../../store";
import { TLink } from "../../types";
import { LOCALES, LocaleCode } from "../../constants";
import { setLocale } from "../../reducer";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const headerData = useSelector((state: RootState) => state.main.headerData);
  const locale = useSelector((state: RootState) => state.main.locale);
  const { logo, navigation_links } = headerData;
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLocale(e.target.value as LocaleCode));
    setIsOpen(false);
  };

  return (
    <div className={`header ${isOpen ? "open" : ""}`}>
      <div className="logo-menu">
        <Link to="/">
          <img {...logo.$.url} src={logo?.url} alt="Logo" />
        </Link>
      </div>
      <nav className={`nav ${isOpen ? "active" : ""}`}>
        {navigation_links?.link.map((link: TLink, index: number) => (
          <Link
            {...link.$.title}
            key={`key-${index}`}
            to={link.href}
            className={location.pathname === link.href ? "active" : ""}
            onClick={() => setIsOpen(false)}
          >
            {link.title}
          </Link>
        ))}
        <div className="language-switch">
          <label htmlFor="locale-select" className="sr-only">
            Language
          </label>
          <select
            id="locale-select"
            value={locale}
            onChange={handleLocaleChange}
            className="locale-select"
            aria-label="Select language"
          >
            {(Object.entries(LOCALES) as [LocaleCode, string][]).map(
              ([code, label]) => (
                <option key={code} value={code}>
                  {label} ({code})
                </option>
              )
            )}
          </select>
        </div>
      </nav>
      <div className="menu-toggle" onClick={handleToggleMenu}>
        <div className="icon-bar"></div>
        <div className="icon-bar"></div>
        <div className="icon-bar"></div>
      </div>
    </div>
  );
};

export default Header;
