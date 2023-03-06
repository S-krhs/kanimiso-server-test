const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
//const Memcached = require('memcached');

const prisma = new PrismaClient();
//const memcachedClient = new Memcached('localhost:11211');


//const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
//const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
//const { PollyCustomizations } = require('aws-sdk/lib/services/polly');
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

    // const imageArray = await Promise.all(
    //   images.map(async (image) => {
    //     const params = {
    //       Bucket: process.env.BUCKET_NAME,
    //       Key: decodeURI(image.path)
    //     };
    //     const imageData = await s3.getObject(params).promise();

    //     return {
    //       "name":image.timestamp,
    //       "body": imageData.Body
    //     };
    //   })
    // );

    //const imageArrayJson = JSON.stringify(imageArray);

    
    //res.send(imageArrayJson);
    //res.send(images);

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