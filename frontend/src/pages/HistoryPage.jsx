import React from 'react'
import Navbar from '../components/NavBar'
import NewFooter from '../components/NewFooter'
import Books from '../components/Books'
import RecentlyPlayed from '../components/RecentlyPlayed'

function HistoryPage() {
  return (
    <>
    <Navbar/>
    <RecentlyPlayed/>
    <Books
            url="sample"
            description="Lorem ipsum dolor sit amet consectetur."
            headings={["Recommended", "For You"]}
          />
    <NewFooter/>
    </>
  )
}

export default HistoryPage