import chatsHandlers from "./chatsHandlers.js";
import contactsHandlers from "./contactsHandlers.js";
import friendRequestsHandlers from "./friendRequestsHandlers.js";
import messagesHandlers from "./messagesHandlers.js";

const socketHandler = (io, socket, userId) => {
  friendRequestsHandlers(io, socket, userId);
  contactsHandlers(io, socket, userId);
  chatsHandlers(io, socket, userId);
  messagesHandlers(io, socket, userId);
};

export default socketHandler;
