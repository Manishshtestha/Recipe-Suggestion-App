const Searchbar = ({
	searchType,
	searchValue,
	setSearchValue,
}: {
	searchType: string;
	searchValue: string;
	setSearchValue: (value: string) => void;
}) => {
	return (
		<div className="relative w-full">
			<input
				type="text"
				placeholder={`Scan for ${searchType}...`}
				className="w-full p-3 pl-4 pr-12 border-2 border-neutral-700 rounded-none bg-neutral-900 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors duration-200 font-mono text-sm"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			{searchValue && (
				<button
					className="absolute right-0 top-0 h-full px-3 flex items-center text-neutral-500 hover:text-pink-500 focus:outline-none focus:text-pink-400 transition-colors duration-150"
					onClick={() => setSearchValue("")}
					title="Clear search"
				>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			)}
		</div>
	);
};

export default Searchbar;
