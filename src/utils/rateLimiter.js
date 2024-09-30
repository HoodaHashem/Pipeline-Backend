import redisClient from "../configs/redisClient.js";
import CustomError from "./customError.js";

function rateLimiter({ maxRequests, seconds }) {
  return async function (req, res, next) {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const requests = await redisClient.incr(ip);
    let ttl;
    if (requests === 1) {
      await redisClient.expire(ip, seconds);
      ttl = seconds;
    } else {
      ttl = await redisClient.ttl(ip);
    }
    if (requests > maxRequests) {
      next(new CustomError("Too many requests", 429));
    } else {
      next();
    }
  };
}

export default rateLimiter;
