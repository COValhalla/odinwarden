/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react'

export default function VaultMain({
  logins,
  cards,
  openEditLoginModal,
  openEditCardModal,
}) {
  return (
    <div className="mx-auto max-w-4xl">
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
  )
}
