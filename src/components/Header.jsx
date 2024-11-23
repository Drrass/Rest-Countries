// Header.jsx
import React from "react";

const Header = ({ toggleDarkMode, darkMode }) => {
  return (
    <header className={`flex justify-between items-center p-4 shadow ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <h1 className="text-xl font-bold ml-8">Where in the world?</h1>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDarkMode}>
        <i className="fa-solid fa-moon"></i>
        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
      </div>
    </header>
  );
};

export default Header;
