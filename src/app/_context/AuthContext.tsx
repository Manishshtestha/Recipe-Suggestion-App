// src/app/_context/AuthContext.tsx
"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { IUser } from "@/app/_lib/models/userModel"; // Assuming IUser doesn't include password

// Define the shape of the user object you want to store in the context
// Exclude sensitive data like password hash
type AuthenticatedUser = Omit<IUser, "password" | "followers" | "following"> & {
	_id: string;
}; // Ensure _id is string

interface AuthContextType {
	user: AuthenticatedUser | null;
	isLoadingAuth: boolean; // To handle initial loading of auth state
	login: (userData: AuthenticatedUser, token?: string) => void; // Token is optional for now
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<AuthenticatedUser | null>(null);
	const [isLoadingAuth, setIsLoadingAuth] = useState(true); // Start as true

	useEffect(() => {
		// Try to load user data from localStorage on initial load
		try {
			const storedUser = localStorage.getItem("authUser");
			const storedToken = localStorage.getItem("authToken"); // If you implement JWTs

			if (storedUser) {
				setUser(JSON.parse(storedUser));
			}
			// Here you might also validate the token if it exists
		} catch (error) {
			console.error("Failed to load auth state from localStorage", error);
			// Clear potentially corrupted storage
			localStorage.removeItem("authUser");
			localStorage.removeItem("authToken");
		} finally {
			setIsLoadingAuth(false);
		}
	}, []);

	const login = (userData: AuthenticatedUser, token?: string) => {
		setUser(userData);
		localStorage.setItem("authUser", JSON.stringify(userData));
		if (token) {
			localStorage.setItem("authToken", token);
		}
		setIsLoadingAuth(false); // Ensure loading is false after login
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("authUser");
		localStorage.removeItem("authToken"); // Clear token on logout
		setIsLoadingAuth(false);
		// You might want to redirect to login page here or call an API to invalidate server session
		// router.push('/login'); // If using next/router
		console.log("User logged out");
	};

	return (
		<AuthContext.Provider value={{ user, isLoadingAuth, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
