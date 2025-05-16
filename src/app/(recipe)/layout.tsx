"use client"
import Navbar from "@/components/Navbar";

import "@/app/globals.css";
import { AuthProvider } from "../_context/AuthContext";
import { SessionProvider } from "next-auth/react";
import Particles from "@/components/Particles";

export default function RecipeLayout(
	{ children }: { children: React.ReactNode } // This is the layout for the recipe pages
) {
	return (
		<html>
			<body className="w-full bg-gray-100 text-gray-900 antialiased">
				<div className="grid h-screen w-full">
					<div className="col-start-1 col-end-2 row-start-1 row-end-2">
						<Particles
							particleColors={[
								"#ffffff",
								"#ff0000",
								"#00ff00",
								"ffff00",
							]}
							particleCount={400}
							particleSpread={10}
							speed={0.1}
							particleBaseSize={100}
							moveParticlesOnHover={true}
							alphaParticles={false}
							disableRotation={false}
						/>
					</div>
					<div className="col-start-1 col-end-2 row-start-1 row-end-2 z-10 flex flex-col min-h-screen">
						<SessionProvider>
							<AuthProvider>
								<Navbar />
								<main className="z-10 mt-4 min-h-screen">
									{children}
								</main>
							</AuthProvider>
						</SessionProvider>
					</div>
				</div>
			</body>
		</html>
	);
}
