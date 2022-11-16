import React from 'react'

export default function ModalHeader({ title, handleClose }) {
  return (
    <div>
      <header className="flex justify-between py-2">
        <h2>{title}</h2>
        <div>
          <svg
            onClick={() => {
              handleClose()
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 cursor-pointer rounded transition hover:bg-slate-300"
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
    </div>
  )
}
