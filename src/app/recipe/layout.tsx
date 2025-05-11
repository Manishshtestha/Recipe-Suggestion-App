import Navbar from "@/components/Navbar";

import "@/app/globals.css";
import { AuthProvider } from "../_context/AuthContext";

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
						<AuthProvider>

						<Navbar />
						<main className="z-10 mt-4 min-h-screen">{children}</main>
						</AuthProvider>
					</div>
				</div>
			</body>
		</html>
	);
}
