import express, {Router} from "express"
import {signUp, logIn, logOut, getUserData} from "../controllers/auth.controller.js"
import { upload } from "../middlewares/multer.js";
import {checkAuth} from "../middlewares/checkAuth.js"
const authRouter = express(Router());

authRouter.post("/signup", upload.single("profileImage") , signUp)
authRouter.post("/login", logIn)
authRouter.post("/logout", logOut)
authRouter.get("/getuserdata", checkAuth, getUserData)

export default authRouter