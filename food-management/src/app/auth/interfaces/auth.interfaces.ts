export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
  }

  export interface RegisterRequest {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    profileImage: File;
  }
  
  export interface RegisterResponse {
    message: string;
    statusCode?: number;
    additionalInfo?: {
      errors?: {
        [key: string]: string[];
      };
    };
  }
  