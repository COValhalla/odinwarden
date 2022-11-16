/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import DeleteModal from './DeleteModal'
import ModalFooter from './ModalFooter'

function CardForm(props) {
  const [name, setName] = useState(props.data?.name || '')
  const [cardholdername, setCardholdername] = useState(
    props.data?.cardholderName || '',
  )
  const [brand, setBrand] = useState(props.data?.brand || '')
  const [cardnumber, setCardnumber] = useState(props.data?.cardNumber || '')
  const [expirationMonth, setExpirationMonth] = useState(
    props.data?.expirationMonth || '',
  )
  const [expirationYear, setExpirationYear] = useState(
    props.data?.expirationYear || '',
  )
  const [cvv, setCvv] = useState(props.data?.cvv || '')
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

    const data = await fetch('http://localhost:3000/auth/add/card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        cardholdername,
        brand,
        cardnumber,
        expirationMonth,
        expirationYear,
        cvv,
        note,
        id: localStorage.getItem('id'),
      }),
    })

    const response = await data.json()

    if (response.status === 200) {
      props.closeModal()
      props.addItem(response.result, 'card')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    // POST data to server

    const data = await fetch('http://localhost:3000/auth/update/card', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        cardholdername,
        brand,
        cardnumber,
        expirationMonth,
        expirationYear,
        cvv,
        note,
        userId: localStorage.getItem('id'),
        itemId: props.data?._id,
      }),
    })

    const response = await data.json()

    if (response.status === 200) {
      props.closeModal()
      props.updateCard(response.result, 'card')
    }
  }

  const handleDelete = async () => {
    const data = await fetch('http://localhost:3000/auth/delete/card', {
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
      props.deleteItems(props.data, 'card')
    }
  }

  return (
    <form className="flex flex-col text-xs sm:text-base " action="">
      <DeleteModal
        isModalOpened={deleteModalIsOpen}
        onCloseModal={(e, result) => {
          handleCloseDeleteModal(e, result)
        }}
      />
      <div className="flex gap-4 ">
        <div className="w-1/2">
          <div className="flex flex-col">
            <label className="py-1" htmlFor="name">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
              type="text"
              name="name"
              id="name"
            />
          </div>

          <div className="flex flex-col">
            <label className="py-1" htmlFor="cardholdername">
              Cardholder Name
            </label>
            <input
              onChange={(e) => setCardholdername(e.target.value)}
              value={cardholdername}
              className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
              type="text"
              name="cardholdername"
              id="cardholdername"
            />
          </div>

          <div className="flex flex-col">
            <label className="py-1" htmlFor="number">
              Number
            </label>
            <input
              onChange={(e) => setCardnumber(e.target.value)}
              value={cardnumber}
              className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
              type="text"
              name="number"
              id="number"
            />
          </div>

          <div className="flex flex-col">
            <label className="py-1" htmlFor="securitycode">
              Security Code (CVV)
            </label>
            <input
              onChange={(e) => setCvv(e.target.value)}
              value={cvv}
              className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
              type="text"
              name="securitycode"
              id="securitycode"
            />
          </div>
        </div>
        <div className="w-1/2">
          {/* Remove invisible when ready for folder feature. */}
          <div className="invisible flex flex-col">
            <label className="py-1" htmlFor="folder">
              Folder
            </label>
            <select
              onChange={(e) => setFolder(e.target.value)}
              className="h-8 w-full rounded border border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
              name="folder"
              id="folder"
            >
              <option value="select">- Select -</option>
              <option value="folder1">TBD</option>
              <option value="folder2">TBD</option>
              <option value="folder3">TBD</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="py-1" htmlFor="brand">
              Brand
            </label>
            <select
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
              name="brand"
              id="brand"
            >
              <option value="select">- Select -</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="American Express">American Express</option>
              <option value="Discover">Discover</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex w-1/2 flex-col">
              <label className="py-1" htmlFor="expmonth">
                Exp Month
              </label>
              <select
                onChange={(e) => setExpirationMonth(e.target.value)}
                value={expirationMonth}
                className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
                name="expmonth"
                id="expmonth"
              >
                <option value="select">- Select -</option>
                <option value="01">01 - January</option>
                <option value="02">02 - February</option>
                <option value="03">03 - March</option>
                <option value="04">04 - April</option>
                <option value="05">05 - May</option>
                <option value="06">06 - June</option>
                <option value="07">07 - July</option>
                <option value="08">08 - August</option>
                <option value="09">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </div>

            <div className="flex w-1/2 flex-col">
              <label className="py-1" htmlFor="expyear">
                Exp Year
              </label>
              <input
                onChange={(e) => setExpirationYear(e.target.value)}
                value={expirationYear}
                className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
                type="number"
                name="name"
                id="name"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Notes input */}
      <div className="flex flex-col">
        <label className="py-1" htmlFor="notes">
          Notes
        </label>
        <textarea
          onChange={(e) => setNote(e.target.value)}
          value={note}
          className="h-24 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          name="notes"
          id="notes"
        ></textarea>
      </div>
      <ModalFooter
        type={type}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        onDelete={openDeleteModal}
        closeModal={props.closeModal}
      />
    </form>
  )
}

export default CardForm
