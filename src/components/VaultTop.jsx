import React from 'react'

export default function VaultTop({ openAddModal }) {
  return (
    <div>
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
    </div>
  )
}
