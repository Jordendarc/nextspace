import NextAuth from 'next-auth/next';
import { authOptions } from "@/utils/authOptions";

const handler = NextAuth(authOptions);

// Export the handler as GET and POST with explicit typing
export { handler as GET, handler as POST };