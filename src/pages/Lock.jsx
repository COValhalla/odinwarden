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
      const data = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('email'),
          password,
        }),
      })
      const response = await data.json()
      if (response.status === 200) {
        login(response)
      } else if (response.status === 400) {
        // Display error message
        setPasswordError('Incorrect password.')
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
          className="h-12 w-12 text-slate-500"
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
            <div className="flex">
              <input
                value={password}
                onChange={handlePasswordChange}
                onBlur={checkPasswordValidation}
                className="h-7 w-full rounded-l border border-slate-400 px-2 py-1 text-sm focus:border-[2px] focus:border-blue-700 focus:outline-none"
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                id="password"
              />
              {passwordVisible ? (
                <svg
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 cursor-pointer rounded-r border-r border-t border-b border-slate-400 px-1 hover:bg-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-7 cursor-pointer rounded-r border-r border-t border-b border-slate-400 px-1 hover:bg-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
            </div>

            {passwordValid === false && (
              <p className="text-xs text-red-500">{passwordError}</p>
            )}
            <p className="text-xs text-slate-400">
              Logged in as {localStorage.getItem('email')} on Odinwarden
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
