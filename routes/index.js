const controllers = require('../controller.index.js')
 const router = require('express').Router()

 router.get('/query', controllers.getCars)
 router.post('/purchase',controllers.createCars)

 module.exports = router
