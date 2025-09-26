//enable dotenv file for provide sensative data
import {config} from "dotenv";
config();
//import express to used it functionalities
import express from "express";
//import cors
import cors from "cors";

import authRouter from "./src/routes/authRoutes.js";
import complaintRouter from "./src/routes/complaintRoutes.js";
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
//create instance of express
const app = express();
// Third party middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:[process.env.FRONTEND_CLIENT_URL],                                                                                                          credentials:true
}));

app.use(cookieParser())
app.use(morgan('dev'))

// All routes here 
app.use('/api/v1/user',authRouter); // for auth route
app.use('/api/v1/complaint/',complaintRouter)
 
app.get('/',(req , res)=>{
       res.status(200).json({Message:"Welcome to Code4City backend"});
})

//This route for unknown url request to server 
app.use((req , res) =>{
         res.status(400).send('OOPS! 404 page not found');
})
//export app
export default app;