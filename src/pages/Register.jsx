import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'

function Register() {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [emailError, setEmailError] = useState('')

  const [name, setName] = useState('')

  const [password, setPassword] = useState('')
  const [passwordValid, setPasswordValid] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const [passwordConf, setPasswordConf] = useState('')
  const [passwordConfValid, setPasswordConfValid] = useState(false)
  const [passwordConfError, setPasswordConfError] = useState('')

  const [passwordHint, setPasswordHint] = useState('')

  // Updates matching error if either password or passwordConf is changed
  useEffect(() => {
    if (
      password === passwordConf &&
      password.length > 0 &&
      passwordConf.length > 0
    ) {
      setPasswordConfValid(true)
    } else if (password !== passwordConf && passwordConf.length > 0) {
      setPasswordConfValid(false)
      setPasswordConfError('Passwords do not match.')
    }
  }, [password, passwordConf])

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

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handlePasswordChange = (e) => {
    if (e.target.id === 'password') {
      setPassword(e.target.value)
    } else if (e.target.id === 'passwordConf') {
      setPasswordConf(e.target.value)
    }
  }

  const checkPasswordValidation = () => {
    if (password.length === 0) {
      setPasswordValid(false)
      setPasswordError(`Input is required.`)
    } else if (password.length < 8) {
      setPasswordValid(false)
      setPasswordError('Input must be at least 8 characters long.')
    } else {
      setPasswordValid(true)
    }
  }

  const handlePasswordConfBlur = (e) => {
    setPasswordConf(e.target.value)
  }

  const handleHintChange = (e) => {
    setPasswordHint(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailValid && passwordValid && passwordConfValid) {
      console.log('Form submitted.')
    }

    // Generate errors for all fields
    if (!emailValid) {
      checkEmailValidation()
    }

    if (!passwordValid) {
      checkPasswordValidation()
    }

    if (!passwordConfValid) {
      setPasswordConfError('Passwords do not match.')
    }
  }

  return (
    <div className="mx-auto flex max-w-[440px] flex-col p-2 text-slate-900">
      <div className="px-5 pb-4 pt-8">
        <h1 className="pb-1 text-center">Create Account</h1>
      </div>
      <div className="rounded border border-gray-300 bg-white p-5 shadow-inner">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
          <div className="flex flex-col gap-1">
            <label className="text-xs" htmlFor="email">
              <span className="font-bold">Email Address</span> (required)
            </label>
            <input
              onChange={handleEmailChange}
              onBlur={checkEmailValidation}
              value={email}
              className="h-7 rounded border border-slate-400 px-2 py-1 text-sm focus:border-[2px] focus:border-blue-700 focus:outline-none"
              type="email"
              name="email"
              id="email"
            />

            {emailValid === false && emailError !== '' ? (
              <p className="text-xs text-red-500">{emailError}</p>
            ) : (
              <p className="text-xs text-slate-400">
                You'll use your email address to log in.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold" htmlFor="name">
              Name
            </label>
            <input
              onChange={handleNameChange}
              value={name}
              className="h-7 rounded border border-slate-400 px-2 py-1 text-sm focus:border-[2px] focus:border-blue-700 focus:outline-none"
              type="name"
              name="name"
              id="name"
            />
            <p className="text-xs text-slate-400">What should we call you?</p>
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
            {passwordValid === false && passwordError !== '' ? (
              <p className="text-xs text-red-500">{passwordError}</p>
            ) : (
              <p className="text-xs text-slate-400">
                <span className="font-bold">Important: </span>Master passwords
                cannot be recovered if you forget it!
              </p>
            )}
            <PasswordStrengthMeter password={password} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs" htmlFor="passwordConf">
              <span className="font-bold">Re-type Master Password</span>{' '}
              (required)
            </label>
            <div className="flex">
              <input
                onBlur={handlePasswordConfBlur}
                className="h-7 w-full rounded-l border border-slate-400 px-2 py-1 text-sm focus:border-[2px] focus:border-blue-700 focus:outline-none"
                type={passwordVisible ? 'text' : 'password'}
                name="passwordConf"
                id="passwordConf"
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
            {passwordConfValid === false && passwordConfError !== '' ? (
              <p className="text-xs text-red-500">{passwordConfError}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs" htmlFor="hint">
              <span className="font-bold">Master Password Hint</span> (optional)
            </label>
            <div className="flex">
              <input
                value={passwordHint}
                onChange={handleHintChange}
                className="h-7 w-full rounded border border-slate-400 px-2 py-1 text-sm focus:border-[2px] focus:border-blue-700 focus:outline-none"
                type="text"
                name="hint"
                id="hint"
              />
            </div>

            <p className="text-xs text-slate-400">
              A master password hint can help you remember your password if you
              forget it.
            </p>
          </div>

          <div className="mt-2 flex gap-3">
            <button
              type="submit"
              className="flex justify-center gap-1 rounded bg-blue-600 px-2 py-[1px] text-center text-base text-white transition duration-200 hover:bg-blue-900 "
            >
              Create Account
            </button>
            <Link
              to="/"
              type="button"
              className="flex justify-center gap-1 rounded border border-slate-400 bg-white px-2 py-[1px] text-center text-slate-600 transition duration-200 hover:bg-gray-500 hover:text-white "
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

export default Register
