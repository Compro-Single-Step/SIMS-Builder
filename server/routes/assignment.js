const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/login', (req, res) => {
  res.render('login', {});
});

module.exports = router;