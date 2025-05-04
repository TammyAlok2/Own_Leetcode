import bcrypt from 'bcryptjs'
import { db } from '../libs/db.js';
import { UserRole } from '../generated/prisma/index.js';
import jwt from 'jsonwebtoken'


export const register = async (req, res) => {
    // taking the data from the body 
    const { email, password, name } = req.body;

    try {
        // check if the user already exists
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",

            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: UserRole.USER
            }
        })

        const token = await jwt.sign({
            id: newUser.id
        },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }

        )

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error",
        })
    }

}


export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // check if the user already exists
        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })
        if (!existingUser) {
            return res.status(400).json({
                message: "User does not exist",

            })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid credentials",

            })
        }

        const token = await jwt.sign({
            id: existingUser.id
        },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }

        )

        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
                role: existingUser.role
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error",
        })
    }

}

export const logout = async (req, res, next) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({
            message: "User logged out successfully",
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error",
        })
    }

}

export const check = async (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized",
        })
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        const user = await db.user.findUnique({
            where: {
                id: decoded.id
            }
        })
        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
            })
        }
        res.status(200).json({
            message: "User is logged in",
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error",
        })
    }
}