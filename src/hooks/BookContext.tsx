import React, { createContext, useContext, useState, useMemo, type ReactNode, type JSX } from "react";
import { type Books } from "../schema/schema";

interface BookContextType {
    books: Books[];
    setBooks: React.Dispatch<React.SetStateAction<Books[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: Error | null;
    setError: React.Dispatch<React.SetStateAction<Error | null>>;
}

interface BookProviderProps {
    children: ReactNode;
}

const defaultContextValue: BookContextType = {
    books: [],
    setBooks: () => {},
    isLoading: false,
    setIsLoading: () => {},
    error: null,
    setError: () => {}
};

const BookContext = createContext<BookContextType>(defaultContextValue);

/**
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component with context value 
 */
export function BookProvider({ children }: BookProviderProps): JSX.Element {
    const [books, setBooks] = useState<Books[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    // Memoized context value to prevent unnecessary re-renders
    // Updates when actual state values changes
    const contextValue = useMemo<BookContextType>(() => ({
        books, setBooks, isLoading, setIsLoading, error, setError}), 
        [books, isLoading, error]);

    return (
        <BookContext.Provider value={contextValue}>
            {children}
        </BookContext.Provider>
    )
}

/**
 * Custom hook to access book context
 * Throws error if used outseide of BookProvider
 * 
 * @returns {Object} Context value with all state and methods
 * @throws {Error} If used outside BookProvider
 */
export function useBookContext(): BookContextType {
    const context = useContext(BookContext);
    if(!context) throw new Error('useBookContext must be used whithin a BookProvider');

    return context;
}

export default BookContext;