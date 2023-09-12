import { IncomingMessage } from 'http';

export function isAuthenticated(req: IncomingMessage): boolean {
  const cookie = req.headers?.cookie;

  if (!cookie) {
    return false;
  }

  return true;
}
