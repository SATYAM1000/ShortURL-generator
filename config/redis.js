import redis from "redis";

let redisClient = null;

export const initializeRedisClient = async () => {
  if (!redisClient) {
    redisClient = redis.createClient();
    redisClient.on("error", (err) => console.log("Redis Client Error", err));
    redisClient.on("connect", () =>
      console.log("Redis Client Connected and ready to use...")
    );
    await redisClient.connect();
  }
  return redisClient;
};
