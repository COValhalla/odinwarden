import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function LoginForm({ closeModal }) {
  const { id } = useAuth()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [note, setNote] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    // POST data to server

    const data = await fetch('http://localhost:3000/auth/add/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, username, password, url, note, id }),
    })

    const response = await data.json()

    if (response.status === 200) {
      closeModal()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" action="">
      <div className="flex flex-col">
        <label className="py-1" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="w-1/2 rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex w-1/2 flex-col">
          <label className="py-1" htmlFor="username">
            Username
          </label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="flex w-5/12 flex-col">
          <label className="py-1" htmlFor="password">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className=" w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
            type="text"
            name="password"
            id="password"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="py-1" htmlFor="url">
          URL
        </label>
        <input
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          type="text"
          name="url"
          id="url"
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          name="notes"
          id="notes"
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="mt-2 rounded bg-blue-500 px-2 py-[2px] text-white hover:bg-blue-700"
        >
          Save
        </button>

        <button
          onClick={closeModal}
          type="button"
          className="mt-2 rounded border bg-white px-2 py-[2px] text-gray-500 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default LoginForm
