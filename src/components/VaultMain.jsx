/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import DeleteModal from './DeleteModal'

export default function VaultMain({
  logins,
  cards,
  openEditLoginModal,
  openEditCardModal,
}) {
  const [itemId, setItemId] = useState(null)
  const [type, setType] = useState(null)

  // Delete modal
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const openDeleteModal = (id, input) => {
    setItemId(id)
    setType(input)
    setDeleteModalIsOpen(true)
  }
  function handleCloseDeleteModal(e, result) {
    if (result === 'Yes') {
      handleDelete()
    }
    setDeleteModalIsOpen(false)
  }

  const handleDelete = async () => {
    // DELETE data to server
    const data = await fetch(`http://localhost:3000/auth/delete/${type}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: localStorage.getItem('id'),
        itemId,
      }),
    })

    const response = await data.json()

    if (response.status === 200) {
      setDeleteModalIsOpen(false)
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <div className="mx-auto max-w-4xl">
      <DeleteModal
        isModalOpened={deleteModalIsOpen}
        onCloseModal={(e, result) => {
          handleCloseDeleteModal(e, result)
        }}
      />
      {logins.map((login) => (
        <div key={login._id}>
          <div className="mx-2 flex items-center justify-between p-2">
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

            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md  px-2 py-2 text-sm font-medium  hover:text-gray-500 ">
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
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 top-10 z-10  w-36 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(login.username)
                          }}
                          type="button"
                          className="w-full"
                        >
                          <span
                            className={classNames(
                              active
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-700',
                              'flex w-full items-center gap-1 px-4 py-1 text-left text-xs',
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                              />
                            </svg>
                            Copy Username
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(login.password)
                          }}
                          type="button"
                          className="w-full"
                        >
                          <span
                            className={classNames(
                              active
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-700',
                              'flex w-full items-center gap-1 px-4 py-1 text-left text-xs',
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                              />
                            </svg>
                            Copy Password
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => {
                            openDeleteModal(login._id, 'login')
                          }}
                          type="button"
                          className="w-full"
                        >
                          <span
                            className={classNames(
                              active
                                ? 'bg-gray-200 text-gray-900'
                                : 'text-gray-700',
                              'flex w-full items-center gap-1 px-4 py-1 text-left text-xs text-red-600',
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                            Delete
                          </span>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <p className=" mx-auto max-w-4xl border-b-[1px] border-slate-300"></p>
        </div>
      ))}
      {/* List all cards */}
      {cards.map((card) => (
        <div
          key={card._id}
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
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md  px-2 py-2 text-sm font-medium  hover:text-gray-500 ">
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
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 top-10 z-10  w-36 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          openDeleteModal(card._id, 'card')
                        }}
                        type="button"
                        className="w-full"
                      >
                        <span
                          className={classNames(
                            active
                              ? 'bg-gray-200 text-gray-900'
                              : 'text-gray-700',
                            'flex w-full items-center gap-1 px-4 py-1 text-left text-xs text-red-600',
                          )}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                          Delete
                        </span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ))}
    </div>
  )
}
