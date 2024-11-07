import mongoose from "mongoose";
import User from "../models/user.js";

const contactsHandlers = (io, socket, userId) => {
  socket.on("getContacts", async () => {
    if (mongoose.Types.ObjectId.isValid(userId)) {
      const userInfo = await User.findById(userId).populate({
        path: "friends",
        select: "fullName username email photo phone",
      });
      const friends = userInfo.friends;

      friends.forEach((ele) => {
        if (!ele.photo) {
          ele.photo = "defaultProfilePhoto.jpg";
        }
      });

      socket.emit("contactsUpdate", friends);
    }
  });
};

export default contactsHandlers;
