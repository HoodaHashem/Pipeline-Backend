import mongoose, { Schema } from "mongoose";

const friendRequestsSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
  },
  to: {
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  acceptance: {
    type: Boolean,
    default: false,
  },
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestsSchema);

export default FriendRequest;
