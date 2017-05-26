const router = require('express').Router(),
  templateRoutes = require('./template.routes'),
  mapperRoutes = require('./mapper.routes');

router.use('/templates', templateRoutes);
router.use('/mapper', mapperRoutes);

module.exports = router;
