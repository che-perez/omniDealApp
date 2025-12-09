import { type JSX } from "react";
import { useFetchBooks } from "./hooks/useFetchBooks";
import { BookProvider } from "./hooks/BookContext";

import Header from "./components/Header";
import BookList from "./components/BookList";


function App(): JSX.Element {
  const { books } = useFetchBooks();

  console.log(books);
  return (
    <BookProvider>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
          <BookList books={books} />
        </main>
      </div>
    </BookProvider>
  )
}

export default App
