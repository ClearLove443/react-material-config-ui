import express from "express";
import { DOMAIN, PORT } from "./config.js";

import { MongoClient, ObjectId } from "mongodb";
const uri =
  "mongodb+srv://admin:GKuI6Qi66ZiS4xEw@cluster0.uhkgaqs.mongodb.net/";
const client = new MongoClient(uri);
await client.connect();
const db = client.db("customer");

const app = express();
// 用于解析JSON格式的请求体
app.use(express.json());
// app.use(cors());

// POST请求的处理
app.post("/submit", (req, res) => {
  console.log(req.body); // 在控制台打印请求体
  // res.send(req.body);
  res.send([
    {
      input: req.body.input,
      select: JSON.stringify(req.body.select),
    },
  ]);
});

app.get("/api/regions", (req, res) => {
  res.json({ regions: ["APAC", "EMEA", "NAM"] });
  // res.send({ regions: ["APAC", "EMEA", "NAM"] });
});
app.get("/api/types", (req, res) => {
  res.json({ types: ["Oracle", "Hive", "Neo4j"] });
  // res.send({ regions: ["APAC", "EMEA", "NAM"] });
});
app.post("/api/datasource/upsert", (req, res) => {
  console.log(req.body); // 在控制台打印请求体

  const uuid = req.body.uuid;
  const updateDoc = { $set: req.body }; // 更新文档
  const options = { upsert: true }; // 设置 upsert 选项

  // db.collection("datasource").insert(req.body);
  db.collection("datasource").updateOne({ uuid: uuid }, updateDoc, options);
  res.send("Upsert successful");

  // setTimeout(() => {
  //   res.send("data source added");
  // }, 1);
});
app.get("/api/datasources", async (req, res) => {
  const data = await db.collection("datasource").find().toArray();
  // console.log(data);
  res.json(data);
});

app.get("/api/datasource/:uuid?", async (req, res) => {
  const uuid = req.params.uuid;
  // console.log(uuid);
  const data = await db.collection("datasource").findOne({ uuid: uuid });
  // console.log(data);
  res.json(data);
});

app.delete("/api/datasource/:uuid?", async (req, res) => {
  const uuid = req.params.uuid;
  const data = await db.collection("datasource").deleteOne({ uuid: uuid });
  res.json(data);
});

app.get("/api/customer", async (req, res) => {
  const data = await db
    .collection("customer")
    .find(
      {},
      {
        sort: {
          _id: -1,
        },
        projection: {
          _id: 0,
          id: "$_id",
          firstName: 1,
          lastName: 1,
          email: 1,
          state: 1,
        },
      }
    )
    .toArray();
  // console.log(data);
  res.json({ meta: { totalRowCount: data.length }, data });
});

app.post("/api/customer", (req, res) => {
  db.collection("customer").insertOne(req.body);
  res.send("Upsert successful");
});

app.put("/api/customer/:id", (req, res) => {
  const id = req.params.id + "";
  db.collection("customer").updateOne(
    { _id: new ObjectId(id) },
    { $set: req.body }
  );
  res.send("Update successful");
});

app.delete("/api/customer/:id", (req, res) => {
  const id = req.params.id + "";
  db.collection("customer").deleteOne({ _id: new ObjectId(id) });
  res.send("Delete successful");
});

// app.use("/", AppRoutes);
app.listen(PORT);
console.log(`应用启动成功 端口:${PORT}, domain:${DOMAIN}`);
