/* eslint-disable no-underscore-dangle */
import React, { useState, useCallback, useEffect } from 'react'
import Modal from 'react-modal'
import Header from '../components/Header'
import AddItemModal from '../components/AddItemModal'
import EditCardModal from '../components/EditCardModal'
import EditLoginModal from '../components/EditLoginModal'
import VaultTop from '../components/VaultTop'
import VaultMain from '../components/VaultMain'
import { config } from '../../Constants'

Modal.setAppElement('#root')

function Vault() {
  // AddItemModal state and functions
  const [addModalIsOpen, setAddModalIsOpen] = useState(false)

  const openAddModal = () => {
    setAddModalIsOpen(true)
  }

  const handleCloseAddModal = useCallback(() => {
    setAddModalIsOpen(false)
  }, [])

  // EditCardModal state and functions
  const [editCardModalIsOpen, setEditCardModalIsOpen] = useState(false)

  const openEditCardModal = (card) => {
    setSelectedCard(card)
    setEditCardModalIsOpen(true)
  }

  const handleCloseEditCardModal = useCallback(() => {
    setEditCardModalIsOpen(false)
  }, [])

  // EditLoginModal state and functions
  const [editLoginModalIsOpen, setEditLoginModalIsOpen] = useState(false)
  const openEditLoginModal = (login) => {
    setSelectedLogin(login)
    setEditLoginModalIsOpen(true)
  }

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
      const response = await fetch(`${config.url.API_URL}/auth/get-items`, {
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

  const updateItems = (item, type) => {
    if (type === 'card') {
      const newCards = cards.map((c) => {
        if (c._id === item._id) {
          return item
        }
        return c
      })
      setCards(newCards)
    } else if (type === 'login') {
      const newLogins = logins.map((l) => {
        if (l._id === item._id) {
          return item
        }
        return l
      })
      setLogins(newLogins)
    }
  }

  const addItem = (item, type) => {
    if (type === 'card') {
      setCards([...cards, item])
    } else if (type === 'login') {
      setLogins([...logins, item])
    }
  }

  const deleteItems = (item, type) => {
    if (type === 'card') {
      const newCards = cards.filter((c) => c._id !== item._id)
      setCards(newCards)
    } else if (type === 'login') {
      const newLogins = logins.filter((l) => l._id !== item._id)
      setLogins(newLogins)
    }
  }

  return (
    <div>
      <AddItemModal
        addItem={addItem}
        isModalOpened={addModalIsOpen}
        onCloseModal={handleCloseAddModal}
      />

      <EditCardModal
        updateCard={updateItems}
        isModalOpened={editCardModalIsOpen}
        onCloseModal={handleCloseEditCardModal}
        selectedCard={selectedCard}
        deleteItems={deleteItems}
      />

      <EditLoginModal
        updateLogin={updateItems}
        isModalOpened={editLoginModalIsOpen}
        onCloseModal={handleCloseEditLoginModal}
        selectedLogin={selectedLogin}
        deleteItems={deleteItems}
      />

      <Header />

      <VaultTop openAddModal={openAddModal} />

      <VaultMain
        cards={cards}
        logins={logins}
        openEditCardModal={openEditCardModal}
        openEditLoginModal={openEditLoginModal}
        deleteItems={deleteItems}
      />
    </div>
  )
}

export default Vault
