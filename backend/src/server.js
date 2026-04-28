// // src/server.js
// import app from "./app.js";
// import "dotenv/config";

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Servidor rodando em http://localhost:${PORT}`);
// });

//import express from "express";
//import cors from "cors";
//import { recommendRecipes } from "./services/recommend/recommend.service.js";

//const app = express();
//const PORT = 3000;

//app.use(cors()); // 🔥 ISTO RESOLVE O ERRO
//app.use(express.json());

//app.post("/recommend", async (req, res) => {
  //try {
    //const result = await recommendRecipes(req.body);
    //res.json(result);
  //} catch (error) {
    //console.error("🔥 ERRO NO BACKEND:", error);
    //res.status(500).json({ error: error.message });
  //}
//});

//app.listen(PORT, () => {
  //console.log(`Servidor rodando em http://localhost:${PORT}`);
//});

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});