import React from 'react'
import Navbar from '../components/NavBar'
import NewFooter from '../components/NewFooter'
import Books from '../components/Books'

function FavouritesPage() {
  return (
    <>
    <Navbar/>
    <Books
            url="sample"
            description="Lorem ipsum dolor sit amet consectetur."
            headings={["Favourite", "Books"]}
          />
          <Books
            url="sample"
            description="Lorem ipsum dolor sit amet consectetur."
            headings={["Finished", "Books"]}
          />
    <NewFooter/>
    </>
  )
}

export default FavouritesPage