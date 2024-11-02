import getFriendRequests from "./getFriendRequests.js";

const socketHandler = (socket, userId) => {
  getFriendRequests(socket, userId);
};

export default socketHandler;
