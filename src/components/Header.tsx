import { type JSX, memo } from "react";


function Header(): JSX.Element {
    return (
        <header className="bg-[#F9FAFB] border-b border-[#E5E7EB] py-8 px-4" role="banner">
            <div className="max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-[#374151] mb-3">Omni Deals</h1>
                <p className="text-lg text-[#6B7280]">Your source for the best deals in graphic novels.</p>
            </div>
        </header>
    )
}

export default memo(Header);