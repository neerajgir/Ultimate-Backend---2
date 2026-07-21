import mongoose from "mongoose"
import validator from "validator"

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email:", value);
                
            }
        }
    },
    password: {
        type: String,
        require: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid Password:", value);
                
            }
        }
    },
    image: {
        type: String,
        require: false
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User