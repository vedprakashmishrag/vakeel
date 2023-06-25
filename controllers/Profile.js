
import User from '../models/User.js';
import multer from 'multer';
import fs from "fs";


const updateprofile = async (req, res) => { 
  
     
 
        //file uploading 
            var storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'public/images/')
                },
                filename: function (req, file, cb) {
                 let filename = file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
                    cb(null, filename)
                     
                }
            }); 
        
            var upload = multer({ storage: storage }).single('image');
            upload(req, res, async function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err)
                } else if (err) {
                    return res.status(500).json(err)
                }  
                if (req.file) {
                    req.body.image= req.file.filename;  
                    //req.body.imgname
                   //removing old file
                   if (req.body.imgname.length >0) {
                    const path = 'public/images/'+req.body.imgname;

                    await fs.unlink(path, function (err) {
                      if (err) {
                          console.error(err);
                      } else {
                          console.log("File removed:", path);
                      }
                      });
                   }
                    
                }
              

                // update records
                let dataToUpdate = req.body  
                const data = await User.updateOne({ email:req.body.email }, { $set: dataToUpdate }); 
               
                if (data){ 
                    res.redirect('dashboard');  
                }else{
                    msg='Information NotUpdated'
                    console.log('Information NotUpdated') 
                }
            });
        // end of file uploading   
    
}


//get request
const  profile = async (req, res) => { 
    const data = await User.findById(req.params.id);   
        res.render('updateprofile', {
            title: 'Update Profile here',
            msg: null,
            logged:true,
            email : data.email,
            name: data.name,
            phone: data.phone,
            image: data.image,
            id:data._id
        });  
     
    }


    
//get request
const  profileview = async (req, res) => { 
    const data = await User.findById(req.params.id);   
        res.render('profileview', {
            title: 'Update Profile here',
            msg: null,
            logged:true,
            email : data.email,
            name: data.name,
            phone: data.phone,
            image: data.image,
            id:data._id
        });  
     
    }
 
export  {profile,  updateprofile, profileview} ;