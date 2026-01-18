export interface signup {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface user {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  googleId: string;
  facebookId: string;
  refreshToken: string;
  accessToken: string;
}

export interface ApiUser {
  success: boolean;
  message: string;
  data: user;
}
