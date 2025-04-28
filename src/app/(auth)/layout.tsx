export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={` antialiased relative min-h-screen bg-black`}>
				<div className="grid h-screen w-full">
					<div className="col-start-1 col-end-2 row-start-1 row-end-2">
						{/* <Particles
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
						/> */}
					</div>
					<div className="col-start-1 col-end-2 row-start-1 row-end-2 z-10">
						{/* <div className="slidedown fixed top-0 left-0 w-full z-[10000]">
							<Navbar />
						</div> */}
						<main className="z-10 mt-20 min-h-screen">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
