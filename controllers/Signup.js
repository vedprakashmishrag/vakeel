import User from '../models/User.js';
import bcrypt from 'bcrypt';
const signup = async (req, res) => {
   let title = 'Signup : User Registration Form',
    error = null,
    msg = null;  
    res.render('signup', {
            title: title,
            msg: msg,
            error: error  
        }); 
};


const signupprocess = async (req, res) => {
    let title = 'Signup : User Registration Form',
     error = null,error1=null,
     msg = null;
      
         if (req.body.name.length < 3) { 
             error = '<div align ="center"><strong>Name must be more then two character!!!</strong></div>';
             msg = null;
         }else{
                 try {
                     const { name, email, password } = req.body;
                     let user = await User.findOne({ email });
                     if (user) { 
                     error1 = 'Email Already Exist in our database Try  Forgot password? ';
                     msg = null; 
                     }
                     user = await User.create({ name, email, password }); 
                     if (user) {

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
                                msg = 'Registration Successfull'
                                //
                            }
                        });
                        res.redirect('/dashboard');
                     }
                    
                 
                     } catch (error) { 
                         msg = null
                         error = error1+' Registration Failed ';
                          
                         res.render('signup', {
                                 title: title,
                                 msg: msg,
                                 error: error  
                             }); 
                              
                     }
              }
    
  
           
 };


export  {signup, signupprocess};