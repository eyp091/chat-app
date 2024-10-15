import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectMongoDB from "../db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // mevcut çalışma dizininin yolunu alır.

dotenv.config();

app.use(express.json()); // json formatında gelen HTTP isteklerinin gövdesini (body) js objesine dönüştürerek "req.body" üzerinde kullanılabilir hale getirir.
app.use(cookieParser()); // cookileri işlemek için kullanılan mw, (req.cookie) 

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist'))); // verilen dizinde bulunan statik dosyaları istemcilere sunar

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

// app.get('/', (req, res) => {
//     // root route http://localhost:5000/
//     res.send("Hello World!");
// })

server.listen(PORT, () => {
    connectMongoDB();
    console.log(`Server Running on port ${PORT}`);
});