const { createClient } = require('redis');

type RedisError = {
    msg: string
}

export const connectRedis = async () => {
    const redisClient = createClient({
        url: 'redis://redis:6379', // Sử dụng tên service
    });

    redisClient.on('error', (err: RedisError) => console.log('Redis Client Error', err.msg));

    await redisClient.connect();
    console.log('Connected to Redis');
    return redisClient;
}
