import connectDb from "./config/db";
import Server from "./server";
import 'dotenv/config'


class UserGalleryApp {
    public async run(): Promise<void>{
        const server = new Server();
        const port = process.env.PORT || 5000
        try {
            await connectDb(); 
            server.start();
        } catch (error) {
            console.error("Failed to start server:", error);
        }
    }
}

const userGalleryApp: UserGalleryApp = new UserGalleryApp();
userGalleryApp.run();