import complaintModel from "../models/complainSchema.js";
import cloudinary from "cloudinary";
import fs from "fs/promises";
export const createComplaint = async (req, res) => {
  console.log("Enter controller");
  const { title, description, category, location, video } = req.body;
  const userID = req.user.id;
   
  try {
    console.log(title , description , category , location , video );
    
    if (!title || !description || !category || !location ) {
      return res.status(400).json({
        message: "Fill required fields",
      });
    }

    const existingComplaint = await complaintModel.findOne({
      category,
      location,
      description,
    });

    if (existingComplaint) {
      return res.status(400).json({ message: "Complaint already exists" });
    }

    // Create complaint instance (not saved yet)
    const complaint = new complaintModel({
      title,
      description,
      category,
      location,
      images: {},
      video: {},
      user: userID,
    });

    // Upload images
    if (req.files.image1) {
      const img1 = req.files.image1[0];
      const result = await cloudinary.v2.uploader.upload(img1.path, {
        folder: "code4city/images",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });
      complaint.images.image1 = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.rm(img1.path, { force: true });
    }

    if (req.files.image2) {
      const img2 = req.files.image2[0];
      const result = await cloudinary.v2.uploader.upload(img2.path, {
        folder: "code4city/images",
      });
      complaint.images.image2 = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
     await fs.rm(img2.path, { force: true });
    }

    if (req.files.image3) {
      const img3 = req.files.image3[0];
      const result = await cloudinary.v2.uploader.upload(img3.path, {
        folder: "code4city/images",
      });
      complaint.images.image3 = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.rm(img3.path), {force : true};
    }

    // Upload video
    if (req.files.video) {
      const videoFile = req.files.video[0];
      const result = await cloudinary.v2.uploader.upload(videoFile.path, {
        folder: "code4city/videos",
        resource_type: "video",
      });
      complaint.video = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
       await fs.rm(videoFile.path, { force: true });
    }

    // Save complaint after adding files
    await complaint.save();

    return res.status(201).json({
      success: true,
      message: "Complaint created successfully",
      data: complaint,
    });
  } catch (error) {
    console.error("Complaint creation error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating complaint",
      error: error.message,
    });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const allComplaintData = await complaintModel.find();
    return res.status(200).json({
      success: true,
      data: allComplaintData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the complaint data.",
      error: error.message,
    });
  }
};

export const getComplaintById = async (req, res) => {
  try {
    const data = await complaintModel.findById(req.params.id);
    if (!data) {
      return res.status(400).json({ message: "Data not found" });
    }
    return res.status(200).json({
      success: true,
      complainData: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the  data.",
      error: error.message,
    });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide a status",
      });
    }

    // Update status
    const updatedComplaint = await complaintModel.findByIdAndUpdate(
      req.params.id,
      { status }
    );

    if (!updatedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint status updated successfully",
      complaint: updatedComplaint,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update complaint status",
      error: error.message,
    });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await complaintModel.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    // Delete images from Cloudinary
    if (complaint.images) {
      for (let key of ["image1", "image2", "image3"]) {
        if (complaint.images[key]?.public_id) {
          await cloudinary.v2.uploader.destroy(
            complaint.images[key].public_id,
            {
              invalidate: true,
            }
          );
        }
      }
    }

    // Delete video from Cloudinary
    if (complaint.videoURL?.public_id) {
      await cloudinary.v2.uploader.destroy(complaint.videoURL.public_id, {
        resource_type: "video",
        invalidate: true,
      });
    }

    // Delete complaint from DB
    await complaintModel.findByIdAndDelete(complaintId);

    return res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete complaint",
      error: error.message,
    });
  }
};
export const filterComplaintsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide both startDate and endDate in YYYY-MM-DD format",
      });
    }

    const complaints = await complaintModel
      .find({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to filter complaints by date",
      error: error.message,
    });
  }
};

/**
 * Filter complaints (by date, status, category)
 */
export const filterComplaints = async (req, res) => {
  try {
    const { startDate, endDate, status, category } = req.query;

    let filter = {};

    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    if (status) {
      filter.status = status;
    }

    if (category) {
      filter.category = category;
    }

    const complaints = await complaintModel
      .find(filter)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
