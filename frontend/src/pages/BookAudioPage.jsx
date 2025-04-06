import React from "react";
import Navbar from "../components/NavBar";
import BookAudio from "../components/BookAudio";
import NewFooter from "../components/NewFooter";
import Books from "../components/Books";

function BookAudioPage() {
  return (
    <>
      <Navbar />
      <BookAudio />
      <NewFooter />
    </>
  );
}

export default BookAudioPage;
