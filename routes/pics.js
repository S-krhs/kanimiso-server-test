const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

var toString = Object.prototype.toString

router.get('/', async (req, res) => {
  try {
    console.log("データの取得を開始します。");
    data = await prisma.works.findMany();
    data.map(d=>{
      d.path = process.env.S3_ENDPOINT + decodeURI(d.path);
    })

    res.setHeader('Content-Type', 'text/javascript');
    res.send(data);

    // ToDo:Cache

  } catch (e) {
    console.log("データの取得に失敗しました。:", e);
    console.error(e.stack);
    res.status(500).send('Server Error');
  }finally{
    prisma.$disconnect();
    console.log("データベースとの接続を終了しました。");
  }
});

module.exports = router;