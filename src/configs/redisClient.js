import redis from "ioredis";
import "dotenv/config";

const redisClient = new redis(process.env.REDIS_URL);

export default redisClient;
