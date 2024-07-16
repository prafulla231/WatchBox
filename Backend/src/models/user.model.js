import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    avatar:{
        type:String, //cloudinary link
        required:true
    },
    coverImage:{
        type:String,
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ]

},{timestamps:true})


userSchema.pre("save",async function(next){
    //jab bhi save hoga ye banda password save karta hi jayega..avtar change kia to bhi password change
    //solution:
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password) //return true and false
}

//Dono jwt tokens hai
userSchema.methods.generateAccessToken =  function(){
   jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.userName,
            fullName : this.fullName 
        },
        process.env.Access_token_Secret,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken =  function(){
    jwt.sign(
        {
            _id:this._id //info kam hoti hai kyuki baar baar reffresh hota hai
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const user = mongoose.model("user",userSchema)

