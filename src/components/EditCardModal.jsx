/* eslint-disable react/prop-types */
import React from 'react'
import Modal from 'react-modal'
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

function EditCardModal(props) {
  // Modal state and functions
  function afterOpenAddModal(e) {
    props.onAfterOpen(e)
  }

  function onModalClose(e) {
    props.onCloseModal(e)
  }

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
            <h2>EDIT CARD</h2>
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
          <CardForm
            data={props.selectedCard}
            closeModal={() => {
              onModalClose()
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default EditCardModal
