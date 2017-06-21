const router = require('express').Router(),
  templateRoutes = require('./template.routes'),
  mapperRoutes = require('./mapper.routes'),
  scriptRoutes = require('./script.routes'),
  locatorRoutes = require('./locator.routes'),
  runRoutes = require('./run.routes');

router.use('/templates', templateRoutes);
router.use('/mappers', mapperRoutes);
router.use('/scripts', scriptRoutes);
router.use('/locators', locatorRoutes);
router.use('/run', runRoutes);

module.exports = router;


