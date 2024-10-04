import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    originalURL: {
      type: String,
      required: true,
      validate: {
        validator: urlValidator,
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    shortURLCode: {
      type: String,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.model("Url", urlSchema);

function urlValidator(url) {
  return /^(ftp|http|https):\/\/[^ "]+$/.test(url);
}
