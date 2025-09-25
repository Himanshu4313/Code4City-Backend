import express from "express";
import authJWT from "../middleware/authJWT.js";
import {createComplaint} from '../controller/complainControllers.js';

const complaintRouter = express.Router();

complaintRouter.post("/createComplaint",
    authJWT,
    upload.fields([
    { name: "images", maxCount: 3 }, // images field array
    { name: "video", maxCount: 1 },  // video field array
  ]),
  createComplaint
);

export default complaintRouter;