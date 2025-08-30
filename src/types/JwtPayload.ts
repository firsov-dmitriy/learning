export interface JwtPayload {
  sub: string;
  email: string;
  exp?: string;
  name?: string;
}
