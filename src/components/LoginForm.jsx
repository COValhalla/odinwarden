import React from 'react'

function LoginForm({ closeModal }) {
  return (
    <form className="flex flex-col" action="">
      <div className="flex flex-col">
        <label className="py-1" htmlFor="name">
          Name
        </label>
        <input
          className="w-1/2 rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex w-1/2 flex-col">
          <label className="py-1" htmlFor="username">
            Username
          </label>
          <input
            className="w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div className="flex w-5/12 flex-col">
          <label className="py-1" htmlFor="password">
            Password
          </label>
          <input
            className=" w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
            type="text"
            name="password"
            id="password"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="py-1" htmlFor="url">
          URL
        </label>
        <input
          className="w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          type="text"
          name="url"
          id="url"
        />

        <label htmlFor="notes">Notes</label>
        <textarea
          className="w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          name="notes"
          id="notes"
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="mt-2 rounded bg-blue-500 px-2 py-[2px] text-white hover:bg-blue-700"
        >
          Save
        </button>

        <button
          onClick={closeModal}
          type="button"
          className="mt-2 rounded border bg-white px-2 py-[2px] text-gray-500 hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default LoginForm
