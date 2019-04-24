export interface JwtResponse {
  user: {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    accessToken: string,
    expiresIn: string
  };
}
