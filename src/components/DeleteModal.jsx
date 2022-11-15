/* eslint-disable react/prop-types */
import React from 'react'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    minWidth: '270px',
    maxWidth: '470px',
    maxHeight: '80%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
}

Modal.setAppElement('#root')

function DeleteModal(props) {
  function onModalClose(e) {
    const result = e.target.innerText
    if (result === 'Yes') {
      props.onCloseModal(e, result)
    } else {
      props.onCloseModal(e, result)
    }
  }

  return (
    <div>
      <Modal
        isOpen={props.isModalOpened}
        onRequestClose={() => {
          onModalClose()
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col items-center p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>

          <p className=" text-sm font-bold">Delete Item</p>
          <p className="text-xs">Do you really want to send to the trash?</p>
        </div>
        <p className=" mx-auto max-w-4xl border-b-[1px] border-slate-400"></p>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              onModalClose(e)
            }}
            type="submit"
            className="mt-2 rounded bg-blue-500 px-2 py-[2px] text-white hover:bg-blue-700"
          >
            Yes
          </button>
          <button
            onClick={(e) => {
              onModalClose(e)
            }}
            type="button"
            className="mt-2 rounded border bg-white px-2 py-[2px] text-gray-500 hover:bg-gray-200"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
