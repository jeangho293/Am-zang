import { Router } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const globalRouter = Router();

const s3client = new S3Client({
  region: "us-east-1",
  endpoint: "http://localhost:4566",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "test",
    secretAccessKey: "test",
  },
});

globalRouter.get("/ping", (req, res, next) => {
  res.send("pong");
});

globalRouter.post("/test", async (req, res, next) => {
  const params = {
    Bucket: "anogle", // S3 버킷 이름
    Key: `uploads/${Date.now()}-${1}`, // 파일 저장 경로 및 이름
    Body: Buffer.from(req.body.buffer.data), // buffer.data를 Buffer로 변환
    ContentType: req.body.mimetype, // MIME 타입 설정
  };

  const a = new PutObjectCommand(params);
  const response = await s3client.send(a);
  console.log(response);

  res.json({});
});
