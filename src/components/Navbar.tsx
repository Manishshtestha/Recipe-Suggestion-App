"use client"; // Navbar will now be a client component to use context

import Link from "next/link";
import { useAuth } from "@/app/_context/AuthContext"; // Import useAuth
import { useRouter } from "next/navigation"; // For logout redirection

const Navbar = () => {
	const { user, logout, isLoadingAuth } = useAuth();
	const router = useRouter();

	const handleLogout = () => {
		logout();
		router.push("/login"); // Redirect to login after logout
	};

	return (
		<nav className="bg-black bg-opacity-80 backdrop-blur-sm text-neutral-300 p-4 flex justify-between items-center gap-4 top-0 left-0 w-full z-50 fixed border-b-2 border-neutral-700 shadow-[0_2px_15px_rgba(0,255,255,0.1)] rounded-none">
			<div>
				<Link
					href="/"
					className="text-2xl font-bold hover:text-pink-400 transition-colors duration-300">
					Kitchen{" "}
					<span className="text-cyan-400 group-hover:text-pink-500 transition-colors duration-300">
						Genie
					</span>
				</Link>
			</div>
			<div className="flex gap-x-5 sm:gap-x-6 items-center font-mono">
				{
					user?
				<Link
					href="/recipe/insert"
					className="hover:text-cyan-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
					Insert Recipe
				</Link>
					:
					<></>
				}
				<Link
					href="/recipe"
					className="hover:text-cyan-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
					Recipe List
				</Link>
				<Link
					href="/about"
					className="hover:text-cyan-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
					About
				</Link>

				{/* Auth Links */}
				{isLoadingAuth ? (
					<span className="text-sm text-neutral-500">Loading...</span>
				) : user ? (
					<>
						<span className="text-sm text-pink-400">
							Operator: {user.name}
						</span>
						<button
							onClick={handleLogout}
							className="hover:text-red-400 transition-colors duration-300 text-sm relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full">
							Logout
						</button>
					</>
				) : (
					<>
						<Link
							href="/login"
							className="hover:text-cyan-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
							Login
						</Link>
						<Link
							href="/register"
							className="hover:text-cyan-400 transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full">
							Register
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
