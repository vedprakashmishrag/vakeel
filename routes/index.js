 import express from 'express';
 import index from '../controllers/Index.js';
 import login from '../controllers/Login.js';
 import ForgetPassword from '../controllers/ForgetPassword.js';
 import logout from '../controllers/Logout.js';
 import {signup,signupprocess} from '../controllers/Signup.js';
 import about from '../controllers/About.js';
 import contact from '../controllers/Contact.js';
 import search from '../controllers/Search.js';
 import services from '../controllers/Services.js';
 import privacy from '../controllers/Privacy.js';
 import tnc from '../controllers/Tnc.js';
 import timeline from '../controllers/Timeline.js';
 import {profileview} from '../controllers/Profile.js';
 import {isAuthenticated} from "../middlewares/auth.js";
 var router = express.Router();

 /* GET home page. */
 router.get('/', index);
 router.get('/login', login);
 router.get('/forget-password', ForgetPassword);
 router.get('/logout', logout);
 router.get('/signup', signup);
 router.get('/search', search);
 router.get('/timeline', timeline);
 router.get('/profileview/:id', isAuthenticated, profileview);

 router.get('/services', services);
 router.get('/about', about);
 router.get('/contact', contact);
 router.get('/privacy', privacy);
 router.get('/termandconditions', tnc);

 /* post call */
 router.post('/login', login);
 router.post('/signupprocess', signupprocess);

 export default router;