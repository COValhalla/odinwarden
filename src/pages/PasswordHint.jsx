import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PasswordHint() {
  const [email, setEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [emailError, setEmailError] = useState('')

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailValid) {
      console.log('Form submitted.')
    }

    // Generate errors for all fields
    if (!emailValid) {
      checkEmailValidation()
    }
  }

  return (
    <div className="mx-auto flex max-w-[440px] flex-col p-2 text-slate-900">
      <div className="px-5 pb-4 pt-8">
        <h1 className="pb-1 text-center">Password Hint</h1>
      </div>
      <div className="rounded border border-gray-300 bg-white p-5 shadow-inner">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
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
            ) : null}
            <p className="text-xs text-slate-400">
              Enter your a count email address to receive your master password
              hint.
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
      <div>
        <p className="pt-8 text-center text-sm text-slate-500">
          © 2022 Odinwarden Inc.
        </p>
      </div>
    </div>
  )
}

export default PasswordHint
