import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/app/_lib/mongoose";
import UserModel from "@/app/_lib/models/userModel";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "john.doe@example.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Please enter email and password");
				}

				try {
					await dbConnect();
					const user = await UserModel.findOne({
						email: credentials.email,
					}).lean();

					if (!user) {
						throw new Error("No user found with this email.");
					}

					const isPasswordMatch = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!isPasswordMatch) {
						throw new Error("Incorrect password.");
					}

					return {
						id: user._id.toString(),
						name: user.name,
						email: user.email,
					};
				} catch (error: any) {
					throw new Error(error.message || "Authentication failed");
				}
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
