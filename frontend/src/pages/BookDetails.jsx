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
            url="http://localhost:5000/api/books/"
            description="Explore similar books"
            headings={["Similar", "Books"]}
            pageId={"home"}
          />
    <Reviews/>
    <NewFooter/>
    </>
  )
}

export default BookDetails