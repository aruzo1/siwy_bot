export class AuthenticationException extends Error {
  constructor() {
    super("Authentication failed");
  }
}
