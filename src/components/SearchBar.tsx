/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function SearchBar({setInputAddress, inputAddress}: {inputAddress: string, setInputAddress: Function}) {

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="javascript:void(0);">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Enter Account Address to Check Rehash Rights
                </label>
                <div className="mt-2">
                  <input
                    id="accountAddress"
                    name="accountAddress"
                    type="text"
                    value={inputAddress}
                    onChange={(event) => setInputAddress(event.target.value)}
                    autoComplete="accountAddress"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
  