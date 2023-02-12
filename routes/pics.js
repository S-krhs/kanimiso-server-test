const { PrismaClient } = require('@prisma/client');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next) => {

  const prisma = new PrismaClient();

  try{

    console.log("データベースとの接続を開始します。")
    const allPics = await prisma.test.findMany();
    res.json(allPics);
    console.log("データの取得に成功しました。")

  }catch(e){

    console.log("データの取得に失敗しました。:",e);

  }finally{

    prisma.$disconnect();
    console.log("データベースとの接続を終了しました。");

  }

});

module.exports = router;
