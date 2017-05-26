const router = require('express').Router(),
  templateRoutes = require('./template.routes');

router.use('/templates', templateRoutes);

module.exports = router;
