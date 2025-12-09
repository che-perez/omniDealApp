import { type JSX, memo, useMemo, useRef } from "react";
import { type Books, type Price } from "../schema/schema";

interface BooksListProps {
    books?: Books[];
}

function BooksList({ books }:BooksListProps): JSX.Element {

    const tableRef = useRef<HTMLDivElement>(null);

    // Extract unique store names from book data
    // Use Memo to avoid recalculation on every render, only runs when books data changes.
    const stores: string[] = useMemo(() => {
        const storeSet = new Set<string>();

        books?.forEach((book: Books) => {
            book.prices.forEach((price: Price) => {
                storeSet.add(price.siteName);
            });
        });
        return Array.from(storeSet).sort();
    }, [books]);

    
    /**
     * Format price to USD currency
     * 
     * @param {number} price Price Value 
     * @returns {string} Formatted price to USD string
     */
    const formatPrice = (price: number): string => {
        return `$${price.toFixed(2)}`;
    };

    /**
     * Get Price for specific Store.
     * Searches book's price array for matching store.
     * Returns null if store doesn't have this book.
     * 
     * @param {Object} book Book Object
     * @param {string} storeName Strore Name to find
     * @returns {Object|null} Price object or null
     */
    const getPriceForStore = (book: Books, storeName: string): Price | null => {
        return book.prices.find((price: Price) => price.siteName === storeName) || null;
    };

    /**
     * Check if price is the best price for book.
     * 
     * @param {Object} price Price object to check 
     * @param {Object} book Book Object
     * @returns {boolean} True if this is the best price
     */
    const isBestPrice = (price: Price | null, book: Books): boolean => {
        return price !== null && price.salePrice == book.bestPrice.salePrice;
    };


    return (
        <div ref={tableRef} className="space-y-4">
            <div className="overflow-x-auto">
                <table className="scandi-table">
                    <thead>
                        <tr>
                            <th scope="col" className="w-[25%]">Title</th>
                            <th scope="col" className="w-[10%]">Original Price</th>
                            {stores.map((store: string) => (
                                <th key={store} scope="col" className="text-center">{store}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {books?.map((book: Books) => (
                            <tr key={book.id}>
                                {/* Title */}
                                <td className="align-top">
                                    <div>
                                        <p className="font-semibold text-[#374151] line-clamp-2">{book.title}</p>
                                        <p className="text-xs text-[#9CA3AF] mt-1">{book.category}</p>
                                    </div>
                                </td>
                                {/* Original Price */}
                                <td className="align-top text-center">
                                    <span className="text-[#6B7280]">{formatPrice(book.bestPrice.originalPrice)}</span>
                                </td>
                                {/* Store Prices */}
                                {stores.map((store: string) => {
                                    const price: Price | null = getPriceForStore(book, store);
                                    const isBest: boolean = price !== null && isBestPrice(price, book);

                                    return (
                                        <td key={store} className="align-top text-center">
                                            {price ? (
                                                <div className="space-y-1 p-2 rounded align-center">
                                                    {isBest && (
                                                        <span className="inline-block px-2 py-0.5 text-xs bg-black text-white font-bold rounded mb-1">Best Price</span>
                                                    )}
                                                    <p className="font-bold text-[#374151]">{formatPrice(price.salePrice)}
                                                    {price.discount > 0 && (
                                                        <span className="badge-discount"> / {price.discount}% OFF</span>
                                                    )}</p>
                                                    <a href={price.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text[#93C5FD] hover:text-[#60A5FA] mt-1">View</a>
                                                </div>
                                            ) : <span className="text-xs text-[#9CA3AF]">-</span>}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default memo(BooksList);