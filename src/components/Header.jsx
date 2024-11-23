import React from 'react'

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 shadow">
         <h1 className="text-xl font-bold  ml-8">Where in the world?</h1>
      <div className="flex items-center space-x-2 cursor-pointer">
        <i className="fa-solid fa-moon"></i>
        <span>Dark Mode</span>
      </div>
    </header>
  )
}

export default Header
