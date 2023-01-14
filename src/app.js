import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const PORT = 5001;

const mongoClient = new MongoClient(process.env.DATABASE_URL);

let db;

try {
    await mongoClient.connect();
    console.log("Conectado ao Banco de Dados");

} catch (error) {
    console.log(error.message);
}

db = mongoClient.db();


app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});