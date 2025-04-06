import React from "react";
import Navbar from "../components/NavBar";
import NewFooter from "../components/NewFooter";
import BookSummary from "../components/BookSummary";

function BookSummaryPage() {
  return (
    <>
      <Navbar />
      <BookSummary />
      <NewFooter />
    </>
  );
}

export default BookSummaryPage;
