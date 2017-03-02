const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});
router.post('/authenticate', (req, res) => {
  console.log(res);
});


module.exports = router;