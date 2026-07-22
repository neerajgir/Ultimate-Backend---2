import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";


const signUp = async (req, res) => {
    try {
        const {firstName, lastName, email, password, userName} = req.body
        if(!firstName || !lastName || !email || !password || !userName){
            return res.status(400).json({message: "Fill All Details.."})
        }
        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message: "User already exist"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            userName
        })

        const token = generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT == "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })

        return res.status(201).json({user: {
            firstName,
            lastName,
            email,
            userName
        }})
    } catch (error) {
        return res.status(500).json({Message: error})
    }
} 

const logIn = async (req,res) => {
    try {
        const {email, password} = req.body
        const existUser = await User.findOne({email})
        if(!existUser) {
            return res.status(400).json({message: "User Does Not Exist."})
        }

        const comparePassword = await bcrypt.compare(password, existUser.password)
        if(!comparePassword) {
            return res.status(400).json({message: "Incorrect Password"})
        }
        const token = generateToken(existUser._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT == "production",
            sameSite: "strict",
            maxAge: 7*24*60*60*1000
        })
        return res.status(200).json({message: "Login Successfully.", user: {
            firstName: existUser.firstName,
            lastName: existUser.lastName,
            email: existUser.email,
            userName: existUser.userName
        }})
    } catch (error) {
        return res.status(400).json(error)
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message: "Logout Successfully."})
    } catch (error) {
        return res.status(400).json(error)
    }
}

export {signUp, logIn, logOut}