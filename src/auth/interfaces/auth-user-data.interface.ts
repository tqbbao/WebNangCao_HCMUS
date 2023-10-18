export interface AuthUserData {
  /**
   *	The "subject" of the token. The value of this property it the user ID
   *	that granted this token.
   */
  sub: number;

  /**
   *	The subject's (user) email.
   */
  email: string;
}