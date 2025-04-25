import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { config } from '../config/config'
import { IJwtPayload } from '../interfaces/common.interface'


export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]
    if (!token) {
        res.status(401).json({
            status: false,
            message: 'Access token missing.',
            data: null,
        });
        return
    }
    try {
    
        const payload = jwt.verify(token, config.jwtSecret) as IJwtPayload;

        req.user = {
            id: payload.id,
            type: payload.type,
        }
        console.log("req.user", req.user)
        next()
    } catch (error) {
        res.status(403).json({
            status: false,
            message: 'Invalid or expired token.',
            data: null,
        });
        return
    }
}