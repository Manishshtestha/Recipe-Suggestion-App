"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // For redirection
import { z } from "zod"; // Import Zod

// Define Zod schema for registration
const RegistrationSchema = z.object({
	name: z.string().min(1, { message: "Operator Tag (Name) is required." }),
	email: z
		.string()
		.email({ message: "Invalid email address for Secure Uplink." }),
	password: z
		.string()
		.min(8, {
			message:
				"Access Key (Password) must be at least 8 characters long.",
		}),
});

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	// Store Zod errors - can be an object to map errors to fields later if needed
	const [validationError, setValidationError] = useState<string | null>(null);
	const [apiError, setApiError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const router = useRouter();
	const containerRef = useRef<HTMLDivElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear errors/success on new input
		if (validationError) setValidationError(null);
		if (apiError) setApiError(null);
		if (successMessage) setSuccessMessage(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setValidationError(null);
		setApiError(null);
		setSuccessMessage(null);

		// Validate with Zod
		const validationResult = RegistrationSchema.safeParse(formData);

		if (!validationResult.success) {
			// Get the first error message for simplicity
			const firstError = validationResult.error.errors[0]?.message;
			setValidationError(
				firstError || "Invalid input. Please check the fields."
			);
			setIsLoading(false);
			return;
		}

		// If validation is successful, proceed with API call
		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(
					result.message || "Registration failed. Please try again."
				);
			}

			setSuccessMessage(
				result.message ||
					"Registration successful! Redirecting to login..."
			);
			setFormData({ name: "", email: "", password: "" }); // Clear form

			// Redirect to login page after a short delay
			setTimeout(() => {
				router.push("/login");
			}, 3000);
		} catch (err: any) {
			setApiError(err.message || "An unexpected error occurred.");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const maxRotation = 10; // Slightly reduced rotation for a more subtle effect

		const handleMouseMove = (e: MouseEvent) => {
			const { left, top, width, height } =
				container.getBoundingClientRect();
			const x = e.clientX - left - width / 2;
			const y = e.clientY - top - height / 2;

			const rotateX = (y / height) * maxRotation;
			const rotateY = (x / width) * maxRotation;

			container.style.transform = `perspective(800px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
		};

		const handleMouseLeave = () => {
			if (container) {
				container.style.transform =
					"perspective(800px) rotateX(0deg) rotateY(0deg)";
			}
		};

		container.addEventListener("mousemove", handleMouseMove);
		container.addEventListener("mouseleave", handleMouseLeave);

		return () => {
			if (container) {
				// Ensure container exists before removing listeners
				container.removeEventListener("mousemove", handleMouseMove);
				container.removeEventListener("mouseleave", handleMouseLeave);
			}
		};
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center font-mono text-neutral-300 p-4">
			<div
				ref={containerRef}
				className="p-8 rounded-none w-full max-w-md bg-gradient-to-br from-neutral-900 via-black/90 to-neutral-900 shadow-[0_0_25px_3px_rgba(0,255,255,0.4),0_0_15px_1px_rgba(255,0,255,0.3)] backdrop-blur-sm border-2 border-cyan-500/50 transition-transform duration-300 ease-in-out"
				// Removed inline styles, using Tailwind classes now
			>
				<h1 className="text-3xl font-bold mb-8 text-center text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] uppercase tracking-wider">
					Initiate Registration
				</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="name"
							className="block text-xs font-medium text-cyan-300 uppercase tracking-wider mb-1">
							Operator Tag (Name)
						</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="Enter your designation"
							value={formData.name}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2.5 border-2 border-neutral-700 rounded-none bg-black bg-opacity-60 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200 ease-in-out font-mono text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-xs font-medium text-cyan-300 uppercase tracking-wider mb-1">
							Secure Uplink (Email)
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="your_id@domain.net"
							value={formData.email}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2.5 border-2 border-neutral-700 rounded-none bg-black bg-opacity-60 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200 ease-in-out font-mono text-sm"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block text-xs font-medium text-cyan-300 uppercase tracking-wider mb-1">
							Access Key (Password)
						</label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Min. 8 characters, alphanumeric"
							value={formData.password}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2.5 border-2 border-neutral-700 rounded-none bg-black bg-opacity-60 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200 ease-in-out font-mono text-sm"
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-pink-600 hover:bg-pink-500 text-neutral-100 font-semibold py-3 px-4 rounded-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all duration-200 ease-in-out uppercase tracking-wider border-2 border-pink-600 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
						{isLoading ? "Processing..." : "Register Account"}
					</button>
					{(validationError || apiError) && (
						<p className="mt-4 text-center text-sm text-red-400 bg-red-900 bg-opacity-50 border border-red-500 p-2 rounded-none">
							<span className="font-bold">Error:</span>{" "}
							{validationError || apiError}
						</p>
					)}
					{successMessage && (
						<p className="mt-4 text-center text-sm text-green-400 bg-green-900 bg-opacity-50 border border-green-500 p-2 rounded-none">
							{successMessage}
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
