class HTTPException extends Error {
    public statusCode: number;
    public message: string;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
    }
  
    static badRequest(message: string) {
      return new HTTPException(400, message);
    }
  
    static unauthorized(message: string) {
      return new HTTPException(401, message);
    }
  
    static forbidden(message: string) {
      return new HTTPException(403, message);
    }
  
    static notFound(message: string) {
      return new HTTPException(404, message);
    }
  
    static conflict(message: string) {
      return new HTTPException(409, message);
    }
    static internalServerError(message: string) {
      return new HTTPException(500, message);
    }
  }
  
  export default HTTPException;
  