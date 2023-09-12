import { parse } from 'cookie';

export function checkAccessTokenCookie(handler) {
  return async (req, res) => {
    const cookies = parse(req.headers.cookie || ''); // Parse cookies from the request

    if (!cookies.accessToken) {
      // If the "accessToken" cookie doesn't exist, redirect to "/auth/login"
      res.writeHead(302, {
        Location: '/auth/login'
      });
      res.end();
      return;
    }

    // If the "accessToken" cookie exists, continue with the original handler
    return handler(req, res);
  };
}
