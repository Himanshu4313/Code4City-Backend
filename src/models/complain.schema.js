import mongoose from "mongoose";
const Schema = mongoose.Schema;

const complain = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        enum: ["point"],
        default: "point",
    },
    images: {
      image1: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },
      image2: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },
      image3: {
        public_id: {
          type: String,
        },
        secure_url: {
          type: String,
        },
      },
    },
    videoURL: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },

    status:{
        type:String,
        enum:["pending", "In-progress" , "Resolved"],
        default : "pending",
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true 
    }
  },
  {
    timestamps: true,
  }
);

const complaintModel = mongoose.model("complaint", complain);

export default complaintModel;
