import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`relative min-h-screen bg-black`}>
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
						<Navbar />
						<main className="mt-8">{children}</main>
					</div>
				</div>
			</body>
		</html>
	);
}
