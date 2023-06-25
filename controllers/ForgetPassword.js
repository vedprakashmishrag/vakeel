import User from '../models/User.js';
import bcrypt from 'bcrypt'; 
 
const ForgetPassword = async (req, res) => { 
 let msg=null,error=null; 
    if (req.method == 'POST') { 
 
        try {
      
            const { email, password } = req.body;
            let user = await User.findOne({ email }).select('+password'); 
            if (!user) {
              
                error = 'User Email and password not Match' ;
            }
            
            const isMatch = await  bcrypt.compare(password, user.password);
            if (isMatch) { 
                //send email
                
            } 
            else{
                error ='Invalid Email or password';
            }
        } catch (error) {
             msg= error.message;
        }
    } else {
        res.render('forget_password', {
            title: 'Forget Password ',
            error: null,
            msg: null, 
        });
    }
};
export default ForgetPassword;