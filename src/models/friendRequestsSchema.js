import mongoose, { Schema } from "mongoose";

const friendRequestsSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  acceptance: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
    default: "pending",
  },
  updatedAt: {
    type: Date,
  },
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestsSchema);

export default FriendRequest;
