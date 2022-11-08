import React from 'react'

function CardForm({ closeModal }) {
  return (
    <form className="flex flex-col text-xs sm:text-base " action="">
      <div className="flex gap-4 ">
        <div className="w-1/2">
          <div className="flex flex-col">
            <label className="py-1" htmlFor="name">
              Name
            </label>
            <input
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
              className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
              type="text"
              name="securitycode"
              id="securitycode"
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col">
            <label className="py-1" htmlFor="folder">
              Folder
            </label>
            <select
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
              className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
              name="brand"
              id="brand"
            >
              <option value="select">- Select -</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="americanexpress">American Express</option>
              <option value="discover">Discover</option>
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex w-1/2 flex-col">
              <label className="py-1" htmlFor="expmonth">
                Exp Month
              </label>
              <select
                className="h-8 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
                name="expmonth"
                id="expmonth"
              >
                <option value="select">- Select -</option>
                <option value="january">01 - January</option>
                <option value="february">02 - February</option>
                <option value="march">03 - March</option>
                <option value="april">04 - April</option>
                <option value="may">05 - May</option>
                <option value="june">06 - June</option>
                <option value="july">07 - July</option>
                <option value="august">08 - August</option>
                <option value="september">09 - September</option>
                <option value="october">10 - October</option>
                <option value="november">11 - November</option>
                <option value="december">12 - December</option>
              </select>
            </div>

            <div className="flex w-1/2 flex-col">
              <label className="py-1" htmlFor="expyear">
                Exp Year
              </label>
              <input
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
          className="h-24 w-full rounded border  border-slate-300 bg-white px-2 py-1 focus:border-blue-500"
          name="notes"
          id="notes"
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

export default CardForm
