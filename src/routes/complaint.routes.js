import express from "express";

import {createComplaint} from '../controller/complain.controllers.js';

const Router = express.Router();

Router.post("/createComplaint",createComplaint);

export default Router;