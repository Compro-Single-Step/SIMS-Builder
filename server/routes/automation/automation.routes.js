const router = require('express').Router(),
  templateRoutes = require('./templateRoutes');

router.use('/templates', templateRoutes);

module.exports = router;
