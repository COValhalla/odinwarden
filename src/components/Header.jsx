import React, { useState, useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import icon from '../assets/odin-lined.png'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { logout } = useAuth()
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    setPath(window.location.pathname)
  }, [path])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="bg-[#175ddc]">
      <header className="mx-auto flex h-11 max-w-4xl items-center justify-between px-4 text-sm text-[rgba(255,255,255,.7)]">
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

        <div className="invisible items-center md:visible  ">
          A password manager for the gods
        </div>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md  px-2 py-2 text-sm font-medium shadow-sm hover:text-[rgba(255,255,255,.8)] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <ChevronDownIcon
                className="h-4 w-4 self-center"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        type="submit"
                        className={classNames(
                          active
                            ? 'bg-gray-200 text-gray-900'
                            : 'text-gray-700',
                          'block w-full px-4 text-left text-sm',
                        )}
                      >
                        Log out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </header>
    </div>
  )
}

export default Header
