export default () => ({
    listenPort: parseInt(process.env.LISTEN_PORT) || 3000,
    jwtSecret: process.env.JWT_SECRET,
    database: {
        connectionString: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
    }
});
