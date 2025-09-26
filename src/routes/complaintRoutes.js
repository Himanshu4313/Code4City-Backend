import express from "express";
import authJWT from "../middleware/authJWT.js";
import {
  createComplaint,
  getAllComplaints,
  getComplaintById,
  filterComplaints,
  updateComplaintStatus,
  deleteComplaint,
  filterComplaintsByDate,
} from "../controller/complainControllers.js";
import upload from "../middleware/multerMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const complaintRouter = express.Router();

complaintRouter.post(
  "/createComplaint",
  authJWT,
upload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
  { name: "videoURL", maxCount: 1 }
]),
  createComplaint
);
complaintRouter.get("/", authJWT, isAdmin, getAllComplaints);
complaintRouter.get("/:id", authJWT, isAdmin, getComplaintById);
complaintRouter.patch("/update/:id", authJWT, isAdmin, updateComplaintStatus);
complaintRouter.delete("/:id", authJWT, isAdmin, deleteComplaint);
complaintRouter.get("/filter", authJWT, isAdmin, filterComplaintsByDate);
complaintRouter.get(
  "/filter/complaint-type",
  authJWT,
  isAdmin,
  filterComplaints
);

export default complaintRouter;
