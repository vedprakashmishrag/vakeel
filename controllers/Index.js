 
const index = (req, res) => {  
 
    res.render('index', { title: 'Express', logged: false }); 
   
};
export default index;