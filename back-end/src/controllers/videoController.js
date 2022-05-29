const videoRepository = require('../repositories/videoRepository');

module.exports = class videoController {

    static async videoGet(req, res){ 

        try {

            return  res.json( await videoRepository.videoDownload(req.body.urlYt, req.body.id, req.body.qualityVideo))

        } catch (error) {
            console.log(error);
        }

    };

    static async mp3get(req, res){
        try {
            return   res.json( await videoRepository.mp3fromVideo(req.body.urlYt, req.body.id))
        } catch (error) {
            console.log(error);
        }
    }

};