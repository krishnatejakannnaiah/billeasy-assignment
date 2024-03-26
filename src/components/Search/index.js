import { Button, TextField } from '@mui/material';
import React from 'react'

function Search({searchInp, setSearchInp, handleSearch, handleKeyDown}) {
  return (
    <div className="search-flex">
    <TextField
      value={searchInp}
      onChange={(e) => setSearchInp(e.target.value)}
      id="outlined-basic"
      label="Search products"
      variant="outlined"
      onKeyDown={handleKeyDown}

    />
    <Button
      onClick={() => {
        handleSearch();
      }}
      sx={{ height: "40px", marginLeft: "10px" }}
    >
      Go
    </Button>
  </div>
  )
}

export default Search