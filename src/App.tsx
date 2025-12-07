import { type JSX } from "react";
import { useFetchBooks } from "./hooks/useFetchBooks";
import { BookProvider } from "./hooks/BookContext";


function App(): JSX.Element {
  const { books } = useFetchBooks();

  console.log(books);
  return (
    <BookProvider>
      <></>
    </BookProvider>
  )
}

export default App
