import express from "express"; 
var router = express.Router();
import dashboard from '../controllers/Dashboard.js';
import {profile, updateprofile} from "../controllers/Profile.js";

import {isAuthenticated} from "../middlewares/auth.js";

router.get('/dashboard', isAuthenticated, dashboard);
router.get('/update-profile/:id', isAuthenticated, profile);
router.post('/update-profile', isAuthenticated, updateprofile);

export default router;