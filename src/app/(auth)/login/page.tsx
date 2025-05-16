"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAuth } from "@/app/_context/AuthContext";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);
	const router = useRouter();
	const { login } = useAuth();
	const containerRef = useRef<HTMLDivElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (apiError) setApiError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setApiError(null);

		if (!formData.email || !formData.password) {
			setApiError("Both email and password are required.");
			setIsLoading(false);
			return;
		}

		try {
			const result = await signIn("credentials", {
				email: formData.email,
				password: formData.password,
				redirect: false, // Handle redirect manually
			});

			if (result?.error) {
				throw new Error(result.error || "Invalid credentials");
			}

			if (!result?.ok) {
				throw new Error("An unexpected error occurred during login");
			}

			// Fetch session to get user data
			const response = await fetch("/api/auth/session");
			if (!response.ok) {
				throw new Error("Failed to fetch session");
			}
			const session = await response.json();
			if (!session?.user) {
				throw new Error("No user data in session");
			}

			// Prepare user data for AuthContext
			const userDataForContext = {
				id: session.user.id,
				name: session.user.name,
				email: session.user.email,
			};

			// Call AuthContext login (no token in this example; add if needed)
			login(userDataForContext, null); // Pass null for token or fetch it separately

			setFormData({ email: "", password: "" });
			router.push("/"); // Redirect to homepage
		} catch (err: any) {
			setApiError(
				err.message || "An unexpected error occurred during login."
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-neutral-950 font-mono text-neutral-300 p-4">
			<div
				ref={containerRef}
				className="p-8 rounded-none w-full max-w-md bg-gradient-to-br from-neutral-900 via-black/90 to-neutral-900 shadow-[0_0_25px_3px_rgba(0,255,255,0.4),0_0_15px_1px_rgba(255,0,255,0.3)] backdrop-blur-sm border-2 border-cyan-500/50 transition-transform duration-300 ease-in-out">
				<h1 className="text-3xl font-bold mb-8 text-center text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] uppercase tracking-wider">
					System Access
				</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="email"
							className="block text-xs font-medium text-cyan-300 uppercase tracking-wider mb-1">
							Operator ID (Email)
						</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Enter your secure ID"
							value={formData.email}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2.5 border-2 border-neutral-700 rounded-none bg-black bg-opacity-60 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200 ease-in-out font-mono text-sm"
							required
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
							placeholder="Enter your passkey"
							value={formData.password}
							onChange={handleChange}
							className="mt-1 block w-full px-4 py-2.5 border-2 border-neutral-700 rounded-none bg-black bg-opacity-60 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all duration-200 ease-in-out font-mono text-sm"
							required
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-pink-600 hover:bg-pink-500 text-neutral-100 font-semibold py-3 px-4 rounded-none focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-neutral-950 transition-all duration-200 ease-in-out uppercase tracking-wider border-2 border-pink-600 hover:border-pink-400 hover:shadow-[0_0_15px_rgba(255,0,255,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
						{isLoading ? "Authenticating..." : "Authenticate"}
					</button>
					{apiError && (
						<p className="mt-4 text-center text-sm text-red-400 bg-red-900 bg-opacity-50 border border-red-500 p-2 rounded-none">
							<span className="font-bold">Error:</span> {apiError}
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
