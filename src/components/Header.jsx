import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/odin-lined.png'

function Header() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    setPath(window.location.pathname)
  }, [path])

  function logOut() {
    // Clear localStorage, route to login page
    console.log('Logging out...')
  }

  return (
    <header className="flex h-11 items-center justify-between bg-[#175ddc] px-4 text-sm text-[rgba(255,255,255,.7)]">
      <div className="flex items-center gap-4">
        <img
          className="max-h-11 p-2 pr-2
        "
          src={icon}
          alt=""
        />
        <Link
          to="/vault"
          className={`font-bold ${
            path === '/vault'
              ? 'text-white'
              : 'hover:text-[rgba(255,255,255,.8)]'
          }`}
        >
          Vaults
        </Link>
        <Link
          to="/tools"
          className={`font-bold ${
            path === '/tools'
              ? 'text-white'
              : 'hover:text-[rgba(255,255,255,.8)]'
          }`}
        >
          Tools
        </Link>
      </div>

      <div>
        <button
          onClick={logOut}
          type="button"
          className="font-bold hover:text-white"
        >
          Log-Out
        </button>
      </div>
    </header>
  )
}

export default Header
