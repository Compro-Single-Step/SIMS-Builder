const router = require('express').Router(),
  templateRoutes = require('./template.routes'),
  mapperRoutes = require('./mapper.routes'),
  scriptRoutes = require('./script.routes');

router.use('/templates', templateRoutes);
router.use('/mapper', mapperRoutes);
router.use('/scripts', scriptRoutes);

module.exports = router;
