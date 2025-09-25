import express from "express";

import {createComplaint} from '../controller/complainControllers.js';

const complaintRouter = express.Router();

complaintRouter.post("/createComplaint", upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),createComplaint);

export default complaintRouter;