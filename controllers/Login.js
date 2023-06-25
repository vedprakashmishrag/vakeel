import User from '../models/User.js';
import bcrypt from 'bcrypt'; 
 
const login = async (req, res) => { 
 let msg=null,error=null;
 if (req.session.user) {
    res.redirect('/dashboard');
 }
    if (req.method == 'POST') { 
 
        try {
      
            const { email, password } = req.body;
            let user = await User.findOne({ email }).select('+password'); 
            if (!user) {
              
                error = 'User Email and password not Match' ;
            }
            
            const isMatch = await  bcrypt.compare(password, user.password);
            if (isMatch) { 
                req.session.user = {
                    _id:user._id,
                    name:user.name,
                    email:user.email
                }
                req.session.save(err => {
                    if(err){
                        console.log(err);
                    } else {
                        //res.send(req.session.user)
                        res.redirect('/dashboard');
                    }
                });
               
                
            } 
            else{
                error ='Invalid Email or password';
            }
        } catch (error) {
             msg= error.message;
        }
    } else {
        res.render('login', {
            title: 'Login ',
            error: null,
            msg: null, 
        });
    }
};
export default login;