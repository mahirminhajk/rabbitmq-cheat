import { createClient, RedisClientType } from "redis";

class RedisService {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL,
        });

        this.client.on('error', this.onError);

        this.connect(); // Automatically connect on instantiation
    }

    private async connect() {
        if (!this.client.isOpen) {
            try {
                await this.client.connect();
                console.log('🟩 Redis Client Connected');
            } catch (err) {
                console.error('🟥 Failed to connect to Redis:', err);
            }
        }
    }

    private onError(err: Error) {
        console.error('🟥 Redis Client Error', err);
    }

    public async set(key: string, value: string, expiryInSeconds?: number): Promise<void> {
        try {
            if (expiryInSeconds) {
                await this.client.set(key, value, { EX: expiryInSeconds });
            } else {
                await this.client.set(key, value);
            }
            console.log(`✅ Set key: ${key}`);
        } catch (err) {
            console.error('🟥 Error setting key in Redis:', err);
        }
    }

    public async get(key: string): Promise<string | null> {
        try {
            return await this.client.get(key);
        } catch (err) {
            console.error('🟥 Error getting key from Redis:', err);
            return null;
        }
    }

    public async delete(key: string): Promise<void> {
        try {
            await this.client.del(key);
            console.log(`✅ Deleted key: ${key}`);
        } catch (err) {
            console.error('🟥 Error deleting key from Redis:', err);
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.client.quit();
            console.log('🟩 Redis connection closed.');
        } catch (err) {
            console.error('🟥 Error closing Redis connection:', err);
        }
    }
}

// Export a single instance of RedisService
const redisService = new RedisService();
export default redisService;
