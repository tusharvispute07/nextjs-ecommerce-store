import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcrypt'

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      async authorize(credentials, req) {
        try {
          const client = await clientPromise;
          const db = client.db();
          const user = await db.collection('users').findOne({
            username: credentials.username
          });

          console.log('This is the user', user);

          if (user) {
            const passwordMatch = await bcrypt.compare(credentials.password, user.password);

            if (passwordMatch) {
              console.log("Logged in successfully");
              return user
            } else {
              console.log("Invalid password");
            }
          } else {
            console.log("User not found");
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise)
});
