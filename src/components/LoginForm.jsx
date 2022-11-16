/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import DeleteModal from './DeleteModal'
import ModalFooter from './ModalFooter'

function LoginForm(props) {
  const [name, setName] = useState(props.data?.name || '')
  const [username, setUsername] = useState(props.data?.username || '')
  const [password, setPassword] = useState(props.data?.password || '')
  const [url, setUrl] = useState(props.data?.url[0] || '')
  const [note, setNote] = useState(props.data?.note || '')

  const [type, setType] = useState(props.type)

  // Delete modal
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const openDeleteModal = () => {
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

    const data = await fetch('http://localhost:3000/auth/add/login', {
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
      props.addItem(response.result, 'login')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    // POST data to server

    const data = await fetch('http://localhost:3000/auth/update/login', {
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
      props.updateLogin(response.result, 'login')
    }
  }

  const handleDelete = async () => {
    // DELETE data to server
    const data = await fetch('http://localhost:3000/auth/delete/login', {
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
      props.deleteItems(props.data, 'login')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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
          required
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
      <ModalFooter
        type={type}
        onUpdate={handleUpdate}
        onDelete={openDeleteModal}
        closeModal={props.closeModal}
      />
    </form>
  )
}

export default LoginForm
