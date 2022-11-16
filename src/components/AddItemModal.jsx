/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Modal from 'react-modal'
import LoginForm from './LoginForm'
import CardForm from './CardForm'
import ModalHeader from './ModalHeader'
import ModalSelection from './ModalSelection'

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

  function onModalClose(e) {
    props.onCloseModal(e)
    setType('login')
  }
  // Form state management
  const [type, setType] = useState('login')

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
          <ModalHeader
            title="ADD ITEM"
            handleClose={() => {
              onModalClose()
            }}
          />
          <ModalSelection
            title="What type of item is this?"
            setType={setType}
          />

          {type === 'login' ? (
            <LoginForm
              addItem={props.addItem}
              type="new"
              data={null}
              closeModal={() => {
                onModalClose()
              }}
            />
          ) : (
            <CardForm
              deleteItems={props.deleteItems}
              addItem={props.addItem}
              type="new"
              data={null}
              closeModal={() => {
                onModalClose()
              }}
            />
          )}
        </div>
      </Modal>
    </div>
  )
}

export default AddItemModal
