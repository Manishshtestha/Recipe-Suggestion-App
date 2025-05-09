import Navbar from "@/components/Navbar";

import "@/app/globals.css";

export default function RecipeLayout(
	{ children }: { children: React.ReactNode } // This is the layout for the recipe pages
) {
	return (
		<html>
			<body className="w-full bg-gray-100 text-gray-900 antialiased">
				<div className="grid h-screen w-full">
					<div className="col-start-1 col-end-2 row-start-1 row-end-2">
						
					</div>
					<div className="col-start-1 col-end-2 row-start-1 row-end-2 z-10 flex flex-col min-h-screen">
						<Navbar />
						<main className="z-10 min-h-screen">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
