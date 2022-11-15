/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function LoginForm(props) {
  const [name, setName] = useState(props.data?.name || '')
  const [username, setUsername] = useState(props.data?.username || '')
  const [password, setPassword] = useState(props.data?.password || '')
  const [url, setUrl] = useState(props.data?.url[0] || '')
  const [note, setNote] = useState(props.data?.note || '')

  const [type, setType] = useState(props.type)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // POST data to server

    const data = await fetch('http://localhost:3000/auth/add/item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        password,
        url,
        note,
        id: localStorage.getItem('id'),
      }),
    })

    const response = await data.json()

    if (response.status === 200) {
      props.closeModal()
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    // POST data to server

    const data = await fetch('http://localhost:3000/auth/update/item', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        password,
        url,
        note,
        userId: localStorage.getItem('id'),
        itemId: props.data?._id,
      }),
    })

    const response = await data.json()

    if (response.status === 200) {
      props.closeModal()
    }
  }
  return (
    <form className="flex flex-col" action="">
      <div className="flex flex-col">
        <label className="py-1" htmlFor="name">
          Name
        </label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
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
            value={username}
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
            value={password}
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
          value={url}
          className="w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          type="text"
          name="url"
          id="url"
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          onChange={(e) => setNote(e.target.value)}
          value={note}
          className="w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          name="notes"
          id="notes"
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <div className="flex gap-2">
        {type === 'new' ? (
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-2 rounded bg-blue-500 px-2 py-[2px] text-white hover:bg-blue-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleUpdate}
            type="submit"
            className="mt-2 rounded bg-blue-500 px-2 py-[2px] text-white hover:bg-blue-700"
          >
            Update
          </button>
        )}
        <button
          onClick={props.closeModal}
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
