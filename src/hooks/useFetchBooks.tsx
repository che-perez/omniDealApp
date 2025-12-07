import { useEffect } from "react";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useBookContext } from "./BookContext";
import {type Books } from "../schema/schema";

interface UseBooksDataReturn extends Omit<UseQueryResult<Books[], Error>, 'data'> {
    books: Books[],
    data?: Books[]
}

const API_URL: string = import.meta.env.VITE_API_URL;
const API_KEY: string = import.meta.env.VITE_API_KEY;

/**
 * Fetch Books from API
 * 
 * @returns {Promise<Array>} Array of books objects
 * @throws {Error} If API request fails
 */
async function fetchBooks(): Promise<Books[]> {
    const response = await fetch(API_URL, {
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
        }
    });

    if(!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

/**
 * useFetchBooks Hooks
 * 
 * @returns {Object} Query results with data, loading, error states
 */

export function useFetchBooks(): UseBooksDataReturn {
    const { books, setBooks } = useBookContext();

    const query = useQuery<Books[], Error>({
        queryKey: ['books'],
        queryFn:fetchBooks,
        refetchOnWindowFocus: false,
        staleTime: 24 * 60 * 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000
    });

    useEffect(() => {
        if(query.isSuccess && Array.isArray(query.data) && query.data.length > 0) {
            setBooks(query.data)
        }
    }, [query.data, setBooks, query.isSuccess]);

    return { ...query, books: query.data || books}
}

export default useFetchBooks;