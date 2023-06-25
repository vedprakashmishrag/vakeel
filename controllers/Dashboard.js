import User from '../models/User.js';   
const dashboard = (req, res) => {   
        
if (req.session.user._id) { 
       res.render('dashboard', {
                  title: 'dashboard : User Dashboard',
                  logged: true,
                  msg: `logged in as ${req.session.user.name}`,
                  error:null,
                  id:req.session.user._id
              });
}else{
        res.redirect('/login');
}
    
}
export default dashboard;
