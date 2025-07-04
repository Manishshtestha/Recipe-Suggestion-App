import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "../_context/AuthContext";

import "@/app/globals.css";
import Particles from "@/components/Particles";
import Navbar from "@/components/Navbar";
import RouteSpinner from "@/components/RouteSpinner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "KitchenGenie",
	description: "Your AI-powered kitchen assistant",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-black`}>
				<RouteSpinner />
				<div className="grid h-screen w-full overflow-y-hidden">
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
						<AuthProvider>
							<Navbar />
							<main className="mt-13">{children}</main>
						</AuthProvider>
					</div>
				</div>
			</body>
		</html>
	);
}
