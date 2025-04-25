import express, { Application } from "express";
import http from "http"; 
import cors from "cors"
import morgan from "morgan";
import appRoutes from "./routes/app.routes";
import HTTPException from "./utils/http-exception";
import errorHandler from "./middlewares/error.middleware";

class Server { 
    private app: Application;
    private httpServer: http.Server;
    constructor () {
        this.app = express()
        this.httpServer = http.createServer(this.app)

    }

    
  public start(): void {
    this.setupMiddleware();
    this.setupRoutes();
  
    this.setupGlobalError();
    this.listenServer();
  }

  private setupMiddleware(): void {
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupRoutes(): void {
    appRoutes(this.app);
  }

  private setupGlobalError(): void {
    this.app.use((req, res, next) => {
      next(HTTPException.notFound(`The URL ${req.originalUrl} doesn't exist.`));
    });
    this.app.use(errorHandler);
  }

  public listenServer() {
    const port = process.env.PORT || 5000;
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default Server;