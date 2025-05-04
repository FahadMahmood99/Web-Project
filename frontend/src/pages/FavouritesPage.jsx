import React from "react";
import Navbar from "../components/NavBar";
import NewFooter from "../components/NewFooter";
import Books from "../components/Books";

function FavouritesPage() {
  return (
    <>
      <Navbar />
      <Books
        url="http://localhost:5000/api/books/favorites"
        description="View your favourite books"
        headings={["Favourite", "Books"]}
        pageId={"favorites"}
      />
      <NewFooter />
    </>
  );
}

export default FavouritesPage;