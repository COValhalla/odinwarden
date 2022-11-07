import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState('')
  const [emailError, setEmailError] = useState('')

  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const handleEmailChange = (e) => {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    setEmail(e.target.value)
    if (emailRegex.test(e.target.value)) {
      setEmailValid(true)
      setEmailError('')
    }
  }

  const checkEmailValidation = () => {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/
    if (email.length === 0) {
      setEmailValid(false)
      setEmailError('Input is required.')
    } else if (!emailRegex.test(email)) {
      setEmailValid(false)
      setEmailError('Input is not a valid email-address.')
    } else {
      setEmailValid(true)
    }
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailValid && passwordValid) {
      console.log('Submitted.')
    }

    if (!emailValid) {
      checkEmailValidation()
    }

    if (!passwordValid) {
      checkPasswordValidation()
    }
  }

  return (
    <div className="mx-auto flex max-w-[440px] flex-col p-1 p-2 text-slate-900">
      <div className="px-5 pb-4 pt-8">
        <h1 className="pb-1 text-center text-4xl">
          <span className="font-bold">Odin</span>warden
        </h1>

        <p className="text-center text-lg leading-5">
          Log in or create a new account to access your secure vault.
        </p>
      </div>
      <div className="rounded border border-gray-300 bg-white p-5 shadow-inner">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <label className="text-xs" htmlFor="email">
              <span className="font-bold">Email Address</span> (required)
            </label>
            <input
              value={email}
              onChange={handleEmailChange}
              onBlur={checkEmailValidation}
              className="h-7 rounded border border-slate-400 px-2 py-1 text-sm focus:border-[2px] focus:border-blue-700 focus:outline-none"
              type="email"
              name="email"
              id="email"
            />

            {emailValid === false && (
              <p className="text-xs text-red-500">{emailError}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs" htmlFor="password">
              <span className="font-bold">Master Password</span> (required)
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

            {passwordError === '' && (
              <Link
                to="/hint"
                className="text-sm text-blue-600 hover:underline"
              >
                Get master password hint.
              </Link>
            )}
          </div>

          <div className="flex gap-2">
            <input
              className="cursor-pointer"
              type="checkbox"
              name="remember"
              id="remember"
            />
            <label className="text-sm" htmlFor="remember">
              Remember email
            </label>
          </div>
          <p className="border-b-[1px]"></p>

          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              className="max-w-1/2 flex justify-center gap-1 rounded bg-blue-600 px-2 py-[1px] text-center text-base text-white transition duration-200 hover:bg-blue-900 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5 self-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Log In
            </button>

            <Link
              to="/register"
              type="button"
              className="max-w-1/2 flex justify-center gap-1 rounded border bg-white px-2 py-[1px] text-center text-slate-600 transition duration-200 hover:bg-gray-500 hover:text-white "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 self-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Create Account
            </Link>
          </div>
        </form>
      </div>
      <div>
        <p className="pt-8 text-center text-sm text-slate-500">
          © 2022 Odinwarden Inc.
        </p>
      </div>
    </div>
  )
}

export default Login
