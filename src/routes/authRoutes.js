import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);



export default router;



//now i am creating the register route, using post cause i am adding a user to the database. passing register as the name of the route
//and calling the register controller function. that means inside of our route file, all we gonna have is the defifnition of each route
//including what the http method is and what the route path name is. but the actual logic will be in controllers
