import mongoose from "mongoose";
import bcrypt from "bcrypt"; 

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        unique:true 
    },
    image:{
        data: Buffer,
        contentType: String
    },
    role: {
        type: String,
        enum: ["user", "admin", "super_admin", "banned", "guest", "provider"],
        default: "user",
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },           
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },  
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

UserSchema.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) return next(); 
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
}); 
		
export default mongoose.model("User", UserSchema);