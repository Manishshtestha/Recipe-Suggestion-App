import { useState } from "react";
const Searchbar = ({
	searchType,
	searchValue,
	setSearchValue,
}: {
	searchType: string;
	searchValue: string;
	setSearchValue: (value: string) => void;
}) => {
	// const [searchTerm, setSearchTerm] = useState(searchValue);
	return (
		<div>
			<input
				type="text"
				placeholder={`Search ${searchType}`}
				className="w-full p-2 pl-3 border rounded-full relative focus:outline-none"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			{searchValue && (
				<button
					className="rounded-full border px-3 py-1 z-20 absolute right-[100px] mt-1 bg-black text-red-500 active:scale-95 font-bold"
					onClick={() => setSearchValue("")}>
					X
				</button>
			)}
		</div>
	);
};

export default Searchbar;
