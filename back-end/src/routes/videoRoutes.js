const { Router } = require('express');
const videoController = require('../controllers/videoController');

const router = Router();


router.post('/downloadVideo', videoController.videoGet);
router.post('/downloadMp3', videoController.mp3get);

module.exports = router;
