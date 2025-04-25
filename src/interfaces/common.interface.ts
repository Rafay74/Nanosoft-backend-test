export interface IResponse<T = any> {
    status: "success" | "error";
    message: string;
    data?: T;
  }

  export interface IJwtPayload {
    id: string;
    email?: string;
    type?: string;
    iat?: number;
    exp?: number;
  }