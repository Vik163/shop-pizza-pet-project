import { doubleCsrf } from 'csrf-csrf';

export const doubleCsrfOptions = {
  getSecret: () => 'Secret', // A function that optionally takes the request and returns a secret
  cookieName: '__Host-psifi.x-csrf-token', // The name of the cookie to be used, recommend using Host prefix.
  cookieOptions: {
    sameSite: true, // Recommend you make this strict if posible
    secure: true,
    maxAge: 60 * 60 * 24 * 5 * 1000, // See cookieOptions below
  },
  size: 64, // The size of the generated tokens in bits
  // ignoredMethods: ['HEAD', 'OPTIONS'], // A list of request methods that will not be protected.
  getTokenFromRequest: (req) => req.headers['x-csrf-token'], // A function that returns the token from the request
};

export const { validateRequest, doubleCsrfProtection } =
  doubleCsrf(doubleCsrfOptions);
