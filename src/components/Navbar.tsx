import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="bg-gray-900 text-white p-4 flex gap-4">
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
		</nav>
	);
};

export default Navbar;
