import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

const options = {
  providers: [
    Providers.Kakao({
      clientId: process.env.KAKAO_ID,
      clientSecret: process.env.KAKAO_SECRET
    }),
    Providers.Google({
      clientId: process.env.Google_ID,
      clientSecret: process.env.Google_SECRET,
      redirect_uri: process.env.Google_REDIRECT_URL
    }),
    Providers.Credentials({
      name: "Custom Provider",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "john@doe.com" },
        userpwd: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        const response = await axios.post(
          "http://localhost:3000/api/user/login",
          credentials
        );
        var t = response.data;
        console.log("role 은 왱?", t.data.role);
        if (t.data.status !== 0) {
          const user = {
            uid: t.data._id,
            name: t.data.name,
            email: t.data.email,
            phone: t.data.phone,
            role: t.data.role,
            nickname: t.data.nickname
          };
          return user;
        }
      }
    })
  ],
  pages: {
    error: "/signin"
  },
  session: {
    jwt: true

    // 리프레쉬토큰, 2주 maxAge: 14 * 24 * 60 * 60
  },
  jwt: {
    signingKey: JSON.stringify({
      kty: "oct",
      kid: process.env.NEXT_AUTH_KID,
      alg: "HS512",
      k: process.env.NEXT_AUTH_K
    })
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.user = user;
      }
      return Promise.resolve(token);
    },
    session: async (session, user) => {
      session.user = user;
      session.user = user.user;
      session.user.uid ? session.user.uid : (session.user.uid = user.user.id);
      session.user.role
        ? session.user.role
        : (session.user.role = user.user.role);
      session.user.nickname
        ? session.user.nickname
        : (session.user.nickname = user.user.nickname);
      return Promise.resolve(session);
    }
  },
  database: process.env.DATABASE_URL
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => NextAuth(req, res, options);
