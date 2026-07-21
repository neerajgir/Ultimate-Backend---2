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

export {signUp}