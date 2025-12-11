import { useMemo, useState, type JSX } from "react";
import { useFetchBooks } from "./hooks/useFetchBooks";
import { BookProvider, useBookContext } from "./hooks/BookContext";
import { type Books } from "./schema/schema";

import Header from "./components/Header";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";


function App(): JSX.Element {
  const { books } = useFetchBooks();
  const { currentPage, setCurrentPage } = useBookContext();

  const [search, setSearch] = useState<string>('');

  /**
   * Handle search with reset page to 1
   * 
   * @param {string} value New Search string 
   */
  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setCurrentPage(1);
    console.log("Current Page is: ",currentPage)
  }

  // Filter books by search string
  const searchedBooks: Books[] = useMemo(() => {
    if(!books) return [];

    let results: Books[] = [...books];

    if(search.trim()) {
      const lowStr: string = search.toLowerCase();
       results = results.filter((book: Books) => book.title.toLowerCase().includes(lowStr))
    };

    return results;
  }, [books, search]);

  return (
    <BookProvider>
      <div className="min-h-screen bg-[#F9FAFB]">
        <Header />
        <main id="main-content" className="max-w-7xl mx-auto px-4 py-8 space-y-6" role="main" aria-label="Graphic Novel deals list">
          <SearchBar searchValue={search} onSearchChange={handleSearchChange} />
          <BookList books={searchedBooks} />
        </main>
      </div>
    </BookProvider>
  )
}

export default App
