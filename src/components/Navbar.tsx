import Link from "next/link";

const Navbar = () => {
	return (
		
		<nav className="bg-gray-900 text-white p-4 flex justify-between gap-4 top-0 left-0 w-full z-50 fixed">
			<div>
				<Link href="/" className="text-2xl font-bold hover:underline">
					Kitchen <span className="text-amber-500"> Genie</span>
				</Link>
			</div>
			<div className="flex gap-4">

			<Link href="/" className="hover:underline">
				Home
			</Link>
			<Link href="/recipe/insert" className="hover:underline">
				Insert Recipe
			</Link>
			<Link href="/recipe" className="hover:underline">
				Recipe List
			</Link>
			<Link href="/about" className="hover:underline">
				About
			</Link>
			<Link href="/explore" className="hover:underline">
				Explore
			</Link>
			</div>
		</nav>
	);
};

export default Navbar;
