import React from 'react'
import { FaSearch } from "react-icons/fa";

export const SearchInput = () => {
  return (
    <form  className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				// value={search}
				// onChange={(e) => setSearch(e.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<FaSearch className='w-6 h-6 outline-none' />
			</button>
		</form>
  )
}

export default SearchInput;