const { Router } = require('express');
const videoController = require('../controllers/videoController');

const router = Router();


router.post('/download', videoController.videoGet);


module.exports = router;
