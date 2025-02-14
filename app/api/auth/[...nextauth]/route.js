import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "abc@xyz.com" },
        password: { label: "Password", type: "password" },
      },
      async author5ize(credentials) {
        // 🔹 Call backend API for authentication
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user = await res.json();
        if (!res.ok || !user) throw new Error("Invalid email or password");

        return user;
      },
    }),
  ],
  callbacks: {  
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token; // Save JWT token
        token.id = user.user.id; // Extract ID
        token.email = user.user.email; // Save email
        token.role = user.user.role; // Save role

        // ✅ Ensure the name exists and split it correctly
        let firstName = "";
        let lastName = "";

        if (user.user.name) {
          const nameParts = user.user.name.trim().split(/\s+/); // Trim and split by spaces
          firstName = nameParts[0] || ""; // First name
          lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""; // Last name (handles multiple words)
        }

        token.firstName = firstName;
        token.lastName = lastName;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        role: token.role,
        firstName: token.firstName, // Add first name
        lastName: token.lastName, // Add last name
      };
      session.accessToken = token.accessToken; // Include JWT token in session
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Store in .env file
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
