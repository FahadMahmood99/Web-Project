import React from 'react'
import BookOverview from '../components/BookDetails'
import Navbar from '../components/NavBar'
import Reviews from "../components/Reviews"
import NewFooter from '../components/NewFooter'
import Books from '../components/Books'

function BookDetails() {
  return (
    <>
    <Navbar/>
    <BookOverview/>
    <Books
            url="sample"
            description="Lorem ipsum dolor sit amet consectetur."
            headings={["Similar", "Books"]}
          />
    <Reviews/>
    <NewFooter/>
    </>
  )
}

export default BookDetails