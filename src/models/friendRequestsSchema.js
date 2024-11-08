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

friendRequestsSchema.index({ from: 1, to: 1, acceptance: 1 });
const FriendRequest = mongoose.model("FriendRequest", friendRequestsSchema);

export default FriendRequest;
