
import {redis, RedisClient} from 'bun';

const redisClient = new RedisClient("redis://localhost:6379");
redisClient.connect().then(()=>"Redis is connected").catch((error)=>console.log(error))

export default redisClient;
