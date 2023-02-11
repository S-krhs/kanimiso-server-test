const { PrismaClient } = require('@prisma/client');

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next) => {
  const prisma = new PrismaClient();
  const allPics = await prisma.test.findMany();
  res.json(allPics);
});

module.exports = router;
