import { type JSX } from "react";
import { useFetchBooks } from "./hooks/useFetchBooks";
import { BookProvider } from "./hooks/BookContext";

import Header from "./components/Header";


function App(): JSX.Element {
  const { books } = useFetchBooks();

  console.log(books);
  return (
    <BookProvider>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Header />
      </div>
    </BookProvider>
  )
}

export default App
