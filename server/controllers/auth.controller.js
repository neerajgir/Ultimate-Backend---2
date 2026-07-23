import generateToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import uploadImage from "../config/cloudinary.js";


const signUp = async (req, res) => {
    try {
        const {firstName, lastName, email, password, userName} = req.body
        if(!firstName || !lastName || !email || !password || !userName){
            return res.status(400).json({message: "Fill All Details.."})
        }

        let profileImage;
        if(req.file){
            profileImage = await uploadImage(req.file.path)
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
            userName,
            profileImage
        })

        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: process.env.NODE_ENVIRONMENT === "production" ? "strict" : "none",
            maxAge: 7*24*60*60*1000
        }

        const token = generateToken(user._id)
        res.cookie("token", token, cookieOptions)

        return res.status(201).json({user: {
            firstName,
            lastName,
            email,
            userName,
            profileImage
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
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENVIRONMENT === "production",
            sameSite: process.env.NODE_ENVIRONMENT === "production" ? "strict" : "none",
            maxAge: 7*24*60*60*1000
        }

        const token = generateToken(existUser._id)
        res.cookie("token", token, cookieOptions)
        return res.status(200).json({message: "Login Successfully.", user: {
            firstName: existUser.firstName,
            lastName: existUser.lastName,
            email: existUser.email,
            userName: existUser.userName,
            profileImage: existUser.profileImage
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

const getUserData = async (req,res) => {
    try {
        let userId = req.userId
        if(!userId){
            return res.status(400).json({message: "user id not found"})
        }
        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({message: "user not found"})
        }
        return res.status(200).json({user})
    } catch (error) {
        return res.status(400).json(error)
    }
}

export {signUp, logIn, logOut, getUserData}