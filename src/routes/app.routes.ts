import { Application } from "express"
import imageRoutes from "./image.routes"
import authRoutes from "./auth.routes"

function appRoutes(app: Application) {
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/image', imageRoutes)
}

export default appRoutes