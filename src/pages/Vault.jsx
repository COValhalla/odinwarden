import React, { useState, useCallback, useEffect } from 'react'
import Modal from 'react-modal'
import Header from '../components/Header'
import AddItemModal from '../components/AddItemModal'
import EditCardModal from '../components/EditCardModal'
import EditLoginModal from '../components/EditLoginModal'

Modal.setAppElement('#root')

function Vault() {
  // AddItemModal state and functions
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)

  function openAddModal() {
    setAddModalIsOpen(true)
  }

  const afterOpenAddModal = useCallback((event) => {
    console.log(event)
  }, [])

  const handleCloseAddModal = useCallback(() => {
    setAddModalIsOpen(false)
  }, [])

  // EditCardModal state and functions
  const [editCardModalIsOpen, setEditCardModalIsOpen] = useState(false)

  function openEditCardModal(card) {
    setSelectedCard(card)
    setEditCardModalIsOpen(true)
  }

  const afterOpenEditCardModal = useCallback((event) => {
    console.log(event)
  }, [])

  const handleCloseEditCardModal = useCallback(() => {
    setEditCardModalIsOpen(false)
  }, [])

  // EditLoginModal state and functions
  const [editLoginModalIsOpen, setEditLoginModalIsOpen] = useState(false)

  function openEditLoginModal(login) {
    setSelectedLogin(login)
    setEditLoginModalIsOpen(true)
  }

  const afterOpenEditLoginModal = useCallback((event) => {
    console.log(event)
  }, [])

  const handleCloseEditLoginModal = useCallback(() => {
    setEditLoginModalIsOpen(false)
  }, [])

  // Data state management
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [selectedLogin, setSelectedLogin] = useState(null)
  const [logins, setLogins] = useState([])

  // Fetch logins and cards on mount
  useEffect(() => {
    async function asyncFetch() {
      const response = await fetch('http://localhost:3000/auth/get-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: localStorage.getItem('id'),
        }),
      })

      const data = await response.json()
      setCards(data.cards)
      setLogins(data.logins)
    }
    asyncFetch()
  }, [])

  return (
    <div>
      <AddItemModal
        isModalOpened={addModalIsOpen}
        onCloseModal={handleCloseAddModal}
        onAfterOpen={afterOpenAddModal}
      />

      <EditCardModal
        isModalOpened={editCardModalIsOpen}
        onCloseModal={handleCloseEditCardModal}
        onAfterOpen={afterOpenEditCardModal}
        selectedCard={selectedCard}
      />

      <EditLoginModal
        isModalOpened={editLoginModalIsOpen}
        onCloseModal={handleCloseEditLoginModal}
        onAfterOpen={afterOpenEditLoginModal}
        selectedLogin={selectedLogin}
      />

      <Header />
      <div className="my-3 mx-auto flex max-w-4xl justify-between px-3">
        <h1 className="text-xl text-slate-700">Vault Items</h1>
        <button
          onClick={openAddModal}
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
      <p className=" mx-auto max-w-4xl border-b-[1.5px] border-slate-300"></p>
      {/* List all logins */}
      <div className="mx-auto max-w-4xl">
        {logins.map((login) => (
          <div>
            <div
              key={login.id}
              className="mx-2 flex items-center justify-between p-2"
            >
              <div className="flex flex-col">
                <button
                  onClick={() => openEditLoginModal(login)}
                  type="button"
                  className="text-left text-sm text-[#175ddc] hover:underline"
                >
                  {login.name}
                </button>
                <p className="text-xs text-gray-500">{login.username}</p>
              </div>
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
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </div>
            <p className=" mx-auto max-w-4xl border-b-[1px] border-slate-300"></p>
          </div>
        ))}
        {/* List all cards */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="mx-2  flex items-center justify-between p-2"
          >
            <div className="flex flex-col">
              <button
                onClick={() => {
                  openEditCardModal(card)
                }}
                type="button"
                className="text-left text-sm text-[#175ddc] hover:underline"
              >
                {card.name}
              </button>
              <p className="text-xs text-gray-500">
                {card.brand}, *{card.cardNumber.slice(-4)}
              </p>
            </div>
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
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Vault
