require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const cors = require("cors");
const PORT = process.env.PORT || 3001;

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://foodie-orpin-nine.vercel.app"
        ],
        credentials: true
    })
)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const startApolloServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    db.once("open", () => {
        app.listen(PORT, () => {
            console.log(`API server port: ${PORT}`);
        });
    });
};

startApolloServer();