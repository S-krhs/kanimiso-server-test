const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();

const prisma = new PrismaClient();

router.get('/', async (req, res, next) => {
  try {
    console.log("データベースとの接続を開始します。");
    const allPics = await prisma.test.findMany();
    console.log("データの取得に成功しました。");
    res.json(allPics);
  } catch (e) {
    console.log("データの取得に失敗しました。:", e);
    next(e);
  }
});

// エラーハンドリングの例外処理
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

// プロセス終了時にPrismaClientの接続を切断
process.on('beforeExit', () => {
  prisma.$disconnect();
  console.log("データベースとの接続を終了しました。");
});

module.exports = router;
