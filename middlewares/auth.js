 
export const isAuthenticated =  (req, res, next) => {
    
    const {user} = req.session;
 
    if (user) { 
        next();
    } else {
         res.redirect('/login'); 
} 
}