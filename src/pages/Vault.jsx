import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import Header from '../components/Header'
import LoginForm from '../components/LoginForm'
import CardForm from '../components/CardForm'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    width: '80%',
    maxWidth: '800px',
    maxHeight: '80%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}

Modal.setAppElement('#root')

function Vault() {
  // Modal state and functions
  let subtitle
  const [modalIsOpen, setIsOpen] = useState(false)
  function openModal() {
    setIsOpen(true)
  }
  function afterOpenModal() {
    subtitle.style.color = '#f00'
  }
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Form state management
  const [type, setType] = useState('login')

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={() => {
          afterOpenModal()
        }}
        onRequestClose={() => {
          closeModal()
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col gap-2">
          <header className="flex justify-between py-2">
            <h2>ADD ITEM</h2>
            <div>
              <svg
                onClick={closeModal}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 cursor-pointer rounded hover:bg-slate-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </header>
          <p className="border-b-[1px]"></p>
          <div className="flex flex-col">
            <label className="py-1" htmlFor="type">
              What type of item is this?
            </label>
            <select
              onChange={(e) => setType(e.target.value)}
              id="type"
              name="type"
              className="h-8 w-1/2 rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500 sm:w-1/4"
            >
              <option value="login">Login</option>
              <option value="card">Card</option>
            </select>
          </div>

          {type === 'login' ? (
            <LoginForm closeModal={closeModal} />
          ) : (
            <CardForm closeModal={closeModal} />
          )}
        </div>
      </Modal>

      <Header />
      <div className="my-3 mx-auto flex max-w-4xl justify-between px-3">
        <h1 className="text-xl text-slate-700">Vault Items</h1>
        <button
          onClick={openModal}
          type="button"
          className="flex self-center rounded-sm border border-slate-300 px-1 py-[2px] text-xs text-[#175ddc] transition duration-200 hover:bg-[#175ddc] hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4 self-center pr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Item
        </button>
      </div>
      <p className=" mx-auto max-w-4xl border-b-[1px] border-slate-300"></p>
    </div>
  )
}

export default Vault
