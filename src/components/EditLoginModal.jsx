/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Modal from 'react-modal'
import LoginForm from './LoginForm'
import ModalHeader from './ModalHeader'

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

function EditLoginModal(props) {
  // Modal state and functions

  function onModalClose(e) {
    props.onCloseModal(e)
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
        <div className="flex flex-col gap-2 text-xs sm:text-base">
          <ModalHeader title="EDIT LOGIN" handleClose={() => onModalClose()} />
          <LoginForm
            updateLogin={props.updateLogin}
            type="edit"
            data={props.selectedLogin}
            closeModal={() => {
              onModalClose()
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default EditLoginModal
