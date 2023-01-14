import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { postMessages, postParticipantsSchemas } from "./schemas.js";
import { pegarHoraAtual } from "./pegarHoraAtual.js";

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

app.post("/participants", async (req, res) => {
    const data = req.body;
    const { value, error } = postParticipantsSchemas.validate(data);
    if (error) return res.status(422).send(error.message);

    const participanteJaCadastrado = !!(await db.collection("participants").findOne(value));

    if (participanteJaCadastrado) return res.sendStatus(409);

    await db.collection("participants").insertOne({ name: value.name, lastStatus: Date.now() });
    await db.collection("messages").insertOne({ from: value.name, to: 'Todos', text: 'entra na sala...', type: 'status', time: pegarHoraAtual() });
    res.sendStatus(201);
});

app.get("/participants", async (req, res) => {
    const participantesCadastrados = await db.collection("participants").find().toArray();
    res.send(participantesCadastrados);
});

app.post("/messages", async (req, res) => {
    const data = req.body;
    const { value, error } = postMessages.validate(data);
    if (error) return res.status(422).send(error.message);

    const { user } = req.headers;

    const participanteJaCadastrado = !!(await db.collection("participants").findOne({ name: user }));

    if (!participanteJaCadastrado) return res.sendStatus(422);

    await db.collection("messages").insertOne({ ...value, from: user, time: pegarHoraAtual() });

    res.sendStatus(201);




});


app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});