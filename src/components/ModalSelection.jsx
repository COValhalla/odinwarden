/* eslint-disable react/prop-types */
import React from 'react'

export default function ModalSelection({ title, setType }) {
  return (
    <div className="flex flex-col">
      <label className="py-1" htmlFor="type">
        {title}
      </label>
      <select
        onChange={(e) => setType(e.target.value)}
        id="type"
        name="type"
        className="h-8 w-1/2 rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500 sm:w-1/4"
      >
        <option value="login">Login</option>
        <option value="card">Card</option>
      </select>
    </div>
  )
}
