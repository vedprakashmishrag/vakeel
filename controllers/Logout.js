 
 
const logout = async (req, res) => {  
    req.session.destroy(err => {
        if(err){
            console.log(err);
        } else {
           console.log('Session is destroyed')
        }
    });
  
    
   res.redirect('/login');
};
export default logout;