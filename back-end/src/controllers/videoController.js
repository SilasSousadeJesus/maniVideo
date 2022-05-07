const videoRepository = require('../repositories/videoRepository');



module.exports = class videoController {


    static async videoGet(req, res){ 

        try {
            return (videoRepository.videoDownload(req.body.urlYt, req.body.qualityVideo));
        } catch (error) {
            console.log(error);
        }

    };

    static async mp3get(req, res){
        try {
             (videoRepository.mp3fromVideo(req.body.urlYt))
        } catch (error) {
            console.log(error);
        }
    }

};