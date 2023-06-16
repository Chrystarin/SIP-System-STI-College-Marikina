import React from 'react';
import './SearchInput.scss'
import SearchIcon from '@mui/icons-material/Search';
function SearchInput() {
  return (
    <div className='SearchInput '>
        <label htmlFor="Input">
            <SearchIcon/>
        </label>
        <input placeholder='Search...' id='Input' type="text" />
    </div>
  )
}

export default SearchInput