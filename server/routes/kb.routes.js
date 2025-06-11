const express = require('express');
const router = express.Router();
const {
  createKnowledgeBase,
  insertData,
  searchKB
} = require('../controllers/kb.controller.js');

router.post('/init', createKnowledgeBase);
router.post('/insert', insertData);
router.get('/search', searchKB);

module.exports = router;
