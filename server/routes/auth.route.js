import express, {Router} from "express"
import {signUp, logIn, logOut} from "../controllers/auth.controller.js"
import { upload } from "../middlewares/multer.js";
const authRouter = express(Router());

authRouter.post("/signup", upload.single("profileImage") , signUp)
authRouter.post("/login", logIn)
authRouter.post("/logout", logOut)


export default authRouter