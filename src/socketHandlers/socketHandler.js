import contactsHandlers from "./contactsHandlers.js";
import friendRequestsHandlers from "./friendRequestsHandlers.js";

const socketHandler = (io, socket, userId) => {
  friendRequestsHandlers(io, socket, userId);
  contactsHandlers(io, socket, userId);
};

export default socketHandler;
