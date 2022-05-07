const videoRepository = require('../repositories/videoRepository');



module.exports = class videoController {


    static async videoGet(req, res){

        try {
            return res.json(videoRepository.videoDownload());
        } catch (error) {
            console.log(error);
        }

    };


};