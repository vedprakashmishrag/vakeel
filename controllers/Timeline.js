import User from "../models/User.js"; 

const timeline = async(req, res) => {

    let { page, size } = req.query;
    // If the page is not applied in query.
    if (!page) {
  
        // Make the Default value one.
        page = 1;
    }

    if (!size) {
        size = 5;
    }
    //  We have to make it integer because
        // query parameter passed is string
        const limit = parseInt(size);
        const skip=page*size
        //console.log('skip', skip)

        let count= await User.countDocuments(); 
       const totalpage = Math.ceil(count/size); 
    const data =await User.find({}, 'name email image'  ).sort(
        { name: 1  }).skip(skip).limit(limit); 
 
    res.render('timeline', { title: 'Timeline' ,  page,
    size, totalpage:totalpage, data:data});
};
export default timeline;