import { memo, type ChangeEvent, type JSX } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
    searchValue?: string;
    onSearchChange: (value: string) => void;
}

function SearchBar({ searchValue = '', onSearchChange }: SearchBarProps): JSX.Element {

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
        onSearchChange(e.target.value);
    }

    return (
        <div className="w-full py-y" role="search" aria-label="Graphic novel search and filter">
            <div className="flex items-center gap-4 w-full">
                <div className="flex flex-1 items-center gap-3 border-0 border-b-2">
                    <Search className="w-5 h-5 text-[#9CA3AF] flex-shrink-0" />
                    <input id="search" type="search" placeholder="Search graphic novels by title..." value={searchValue} onChange={handleSearchChange} className="flex-1 bg-transparent text-[#374151] text-lg pb-2 focus:outline-none focus:border-[#000000] transition-colors" aria-label="Search graphic novels" autoComplete="off"/>
                </div>
            </div>
        </div>
    )
}

export default memo(SearchBar);

