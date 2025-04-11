import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center p-4 top-0 z-10 absolute bg-transparent w-full">
			<Link href="/" className="font-extrabold text-3xl">Kitchen <span className="text-amber-500">Genie</span></Link>
			<div className="flex gap-3">
				<Link href="/about">About</Link>
				<Link href="/profile">Profile</Link>
				<Link href="/profile">Suggest Anything</Link>
			</div>
		</nav>
	);
};

export default Navbar;
