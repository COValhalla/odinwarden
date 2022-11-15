/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Modal from 'react-modal'
import LoginForm from './LoginForm'
import CardForm from './CardForm'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    width: '95%',
    maxWidth: '800px',
    maxHeight: '80%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}

Modal.setAppElement('#root')

function AddItemModal(props) {
  // Modal state and functions
  function afterOpenAddModal(e) {
    props.onAfterOpen(e)
  }

  function onModalClose(e) {
    props.onCloseModal(e)
  }
  // Form state management
  const [type, setType] = useState('login')

  return (
    <div>
      <Modal
        isOpen={props.isModalOpened}
        onAfterOpen={(e) => {
          afterOpenAddModal(e)
        }}
        onRequestClose={() => {
          onModalClose()
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col gap-2 text-xs sm:text-base">
          <header className="flex justify-between py-2">
            <h2>ADD ITEM</h2>
            <div>
              <svg
                onClick={() => {
                  onModalClose()
                }}
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
            <LoginForm
              closeModal={() => {
                onModalClose()
              }}
            />
          ) : (
            <CardForm data={null} closeModal={onModalClose} />
          )}
        </div>
      </Modal>
    </div>
  )
}

export default AddItemModal
