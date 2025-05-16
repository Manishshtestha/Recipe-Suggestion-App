// e:\Sem 6\Project\kitchen_genie\src\next-auth.d.ts
import { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Extends the default NextAuth Session interface.
   */
  interface Session {
    user: {
      /** The user's unique identifier. */
      id: string;
    } & DefaultSession["user"]; // Combines with default user properties (name, email, image)
  }
}

declare module "next-auth/jwt" {
  /**
   * Extends the default NextAuth JWT interface.
   */
  interface JWT extends DefaultJWT {
    /** The user's unique identifier, added in the jwt callback. */
    id: string;
  }
}
