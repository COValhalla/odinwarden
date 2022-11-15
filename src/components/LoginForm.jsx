/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import DeleteModal from './DeleteModal'

function LoginForm(props) {
  const [name, setName] = useState(props.data?.name || '')
  const [username, setUsername] = useState(props.data?.username || '')
  const [password, setPassword] = useState(props.data?.password || '')
  const [url, setUrl] = useState(props.data?.url[0] || '')
  const [note, setNote] = useState(props.data?.note || '')

  const [type, setType] = useState(props.type)

  // Delete modal
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  function openDeleteModal() {
    setDeleteModalIsOpen(true)
  }
  function handleCloseDeleteModal(e, result) {
    if (result === 'Yes') {
      handleDelete()
    }
    setDeleteModalIsOpen(false)
  }

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

  const handleDelete = async () => {
    console.log('Clicked delete')
    // DELETE data to server
    const data = await fetch('http://localhost:3000/auth/delete/item', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
      <DeleteModal
        isModalOpened={deleteModalIsOpen}
        onCloseModal={(e, result) => {
          handleCloseDeleteModal(e, result)
        }}
      />
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
      <div className="flex justify-between">
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
              className="mt-2 rounded bg-blue-500 px-2 py-[2px] text-white transition hover:bg-blue-700"
            >
              Update
            </button>
          )}
          <button
            onClick={props.closeModal}
            type="button"
            className="mt-2 rounded border bg-white px-2 py-[2px] text-gray-500 transition hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
        {type === 'edit' && (
          // Delete button
          <button
            onClick={openDeleteModal}
            type="button"
            className="mt-2 rounded border bg-white px-2 py-[2px] text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  )
}

export default LoginForm
