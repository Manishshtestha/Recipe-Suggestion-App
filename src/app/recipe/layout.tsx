import Navbar from "@/components/Navbar";

import "@/app/globals.css";

export default function RecipeLayout(
	{ children }: { children: React.ReactNode } // This is the layout for the recipe pages
) {
	return (
		<html>
			<body
				className="w-full bg-gray-100 text-gray-900 antialiased">
				<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
					<Navbar />
					{children}
				</div>
			</body>
		</html>
	);
}
