import complaintModel from "../models/complain.schema";

export const createComplaint = async (req, res) => {
  const {
    title,
    description,
    category,
    location,
    image1,
    image2,
    image3,
    videoURL,
  } = req.body;
  const userID = req.user.id;
  try {
    if (!title || !description || !category || !location || !videoURL) {
      return res.status(400).json({
        message: "Fill required fields",
      });
    }

    // check if same complaint already exists
    const existingComplaint = await complaintModel.findOne({
      category,
      location,
      description,
    });

    if (existingComplaint) {
      return res.status(400).json({ message: "Complaint already exists" });
    }

    const complaint = await complaintModel.create({
      title,
      description,
      category,
      location,
      images: {
        image1: {
          public_id: "",
          secure_url: image1,
        },
        image2: {
          public_id: "",
          secure_url: image2,
        },
        image3: {
          public_id: "",
          secure_url: image3,
        },
      },
      videoURL: {
        public_id: "",
        secure_url: videoURL,
      },
    });

    if (!complaint) {
      res.status(400).json({
        success: false,
        message: "create complaint failed please try again",
      });

      // now handle image and video

      if (req.files) {
        try {
          // ✅ Upload images (image1, image2, image3)
          if (req.files.images) {
            for (let i = 0; i < req.files.images.length; i++) {
              const img = req.files.images[i];

              const result = await cloudinary.v2.uploader.upload(img.path, {
                folder: "code4city/images",
                width: 250,
                height: 250,
                gravity: "faces",
                crop: "fill",
              });

              // save into schema fields image1, image2, image3
              complaint.images[`image${i + 1}`] = {
                public_id: result.public_id,
                secure_url: result.secure_url,
              };

              fs.rmSync(img.path);
            }
          }

          // ✅ Upload video
          if (req.files.video) {
            const videoFile = req.files.video[0];

            const result = await cloudinary.v2.uploader.upload(videoFile.path, {
              folder: "code4city/videos",
              resource_type: "video", // required for videos
            });

            complaint.videoURL = {
              public_id: result.public_id,
              secure_url: result.secure_url,
            };

            fs.rmSync(videoFile.path);
          }
        } catch (error) {
          return res.status(500).json({
            success: false,
            message: "File(s) not uploaded, Please try again",
            error,
          });
        }
        await complaint.save();
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create complaint",
      error: error,
    });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
        const allComplaintData = await complaintModel.findAll();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the complaint data.",
      error: error,
    });
  }
};

export const getComplaintById = async (req, res) => {
  try {
  } catch (error) {}
};

export const updateComplaint = async (req, res) => {
  try {
  } catch (error) {}
};

export const deleteComplaint = async (req, res) => {
  try {
  } catch (error) {}
};
