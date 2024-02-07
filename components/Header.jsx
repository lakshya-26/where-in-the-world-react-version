import React from "react";
// import { ThemeContext } from "../contexts/ThemeContext";
import { useTheme } from "../hooks/useTheme";

export default function Header() {
  const [isDark, setIsDark] = useTheme();

  return (
    <>
      <header className={`header-container ${isDark?'dark':''}`}>
        <div className="header-content">
          <h1 className="title">Where in the world?</h1>
          <p className="theme-changer" onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem('isDarkMode', !isDark);
          }}>
            <span className="dark-mode">
              <i className={`fa-regular fa-${isDark ? 'sun':'moon'}`} />
              &nbsp;&nbsp;{isDark ? 'Light Mode':'Dark Mode'}
            </span>
          </p>
        </div>
      </header>
    </>
  );
}
