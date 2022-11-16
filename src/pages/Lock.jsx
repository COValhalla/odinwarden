import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import Login from './Login'

function Lock() {
  const { email, login } = useAuth()
  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length >= 8) {
      setPasswordValid(true)
      setPasswordError('')
    }
  }

  const checkPasswordValidation = () => {
    // Password must be at least 8 characters
    if (password.length === 0) {
      setPasswordValid(false)
      setPasswordError(`Input is required.`)
    } else if (password.length < 8) {
      setPasswordValid(false)
      setPasswordError('Input must be at least 8 characters long.')
    } else {
      setPasswordValid(true)
      setPasswordError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (passwordValid) {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('email'),
          password,
        }),
      })
      const data = await response.json()
      if (data.status === 200) {
        login(data)
      } else if (response.status === 400) {
        // Display error message
        setPasswordError(response.message)
        setPasswordValid(false)
      }
    }

    // Generate errors for all fields
    if (!passwordValid) {
      checkPasswordValidation()
    }
  }

  return (
    <div className="mx-auto flex max-w-[440px] flex-col p-2 text-slate-900">
      <div className="flex flex-col items-center gap-3 px-5 pb-4 pt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-12 w-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
          />
        </svg>

        <h1 className="pb-1 text-center">
          Your vault is locked. Verify your master password to continue.
        </h1>
      </div>
      <div className="rounded border border-gray-300 bg-white p-5 shadow-inner">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold" htmlFor="password">
              Master Password
            </label>
            <input
              onChange={handlePasswordChange}
              onBlur={checkPasswordValidation}
              value={password}
              className="h-7 rounded border border-slate-400 px-2 py-1 text-sm focus:border-[2px] focus:border-blue-700 focus:outline-none"
              type="email"
              name="email"
              id="email"
            />

            {passwordValid === false && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}
            <p className="text-xs text-slate-400">
              Logged in as {localStorage.getItem('email')} on odinwarden.com.
            </p>
          </div>

          <p className="border-b-[1px]"></p>

          <div className="mt-2 flex  gap-3">
            <button
              type="submit"
              className=" flex flex-grow justify-center gap-1 rounded bg-blue-600 px-2 py-[1px] text-center text-base text-white transition duration-200 hover:bg-blue-900 "
            >
              Submit
            </button>

            <Link
              to="/login"
              type="button"
              className=" flex flex-grow  justify-center gap-1 rounded border bg-white px-2 py-[1px] text-center text-slate-600 transition duration-200 hover:bg-gray-500 hover:text-white "
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Lock
