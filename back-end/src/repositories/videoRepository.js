const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');
const readline = require('readline');
const path = require('path');
const  { v4: uuidv4 } = require('uuid');

exports.videoDownload = async (urlYt, id, qualityVideo) => {  

  const idCheck = ytdl.validateID(id);
  if(!idCheck){
    return {message: "invalid ID"}
  }
  const urlCheck =  ytdl.validateURL(urlYt);
  if(!urlCheck){
    return {message: "invalid URL"}
  }

  const videoName = await this.getInfor(id);

    const ref = urlYt;
    const tracker = {
        start: Date.now(),
        audio: { downloaded: 0, total: Infinity },
        video: { downloaded: 0, total: Infinity },
        merged: { frame: 0, speed: '0x', fps: 0 },
      };

      const audio = ytdl(ref, { quality: 'highest' })
        .on('progress', (_, downloaded, total) => {
            tracker.audio = { downloaded, total };
      });

      const video = ytdl(ref, { quality: qualityVideo })
      .on('progress', (_, downloaded, total) => {
          tracker.video = { downloaded, total };
      });

        let progressbarHandle = null;
        const progressbarInterval = 1000;
        const showProgress = async () => {
        readline.cursorTo(process.stdout, 0);
        const toMB = i => (i / 1024 / 1024).toFixed(2);

        process.stdout.write(`Audio  | ${(tracker.audio.downloaded / tracker.audio.total * 100).toFixed(2)}% processed `);
        process.stdout.write(`(${toMB(tracker.audio.downloaded)}MB of ${toMB(tracker.audio.total)}MB).${' '.repeat(10)}\n`);

        process.stdout.write(`Video  | ${(tracker.video.downloaded / tracker.video.total * 100).toFixed(2)}% processed `);
        process.stdout.write(`(${toMB(tracker.video.downloaded)}MB of ${toMB(tracker.video.total)}MB).${' '.repeat(10)}\n`);

        process.stdout.write(`Merged | processing frame ${tracker.merged.frame} `);
        process.stdout.write(`(at ${tracker.merged.fps} fps => ${tracker.merged.speed}).${' '.repeat(10)}\n`);

        process.stdout.write(`running for: ${((Date.now() - tracker.start) / 1000 / 60).toFixed(2)} Minutes.`);
        readline.moveCursor(process.stdout, 0, -3);
        };

        const ffmpegProcess = cp.spawn(ffmpeg, [
  
            '-loglevel', '8', '-hide_banner',

            '-progress', 'pipe:3',

            '-i', 'pipe:4',
            '-i', 'pipe:5',

            '-map', '0:a',
            '-map', '1:v',

            '-c:v', 'copy',

            `${videoName}.mp4`,
          ], {
            windowsHide: true,
            stdio: [

              'inherit', 'inherit', 'inherit',

              'pipe', 'pipe', 'pipe',
            ],
          });
          ffmpegProcess.on('close', () => {
            console.log('done');

            process.stdout.write('\n\n\n\n');
            clearInterval(progressbarHandle);
          });
          

          ffmpegProcess.stdio[3].on('data', async chunk => {

            if (!progressbarHandle) progressbarHandle =  setInterval(showProgress, progressbarInterval);

            const lines = chunk.toString().trim().split('\n');
            const args = {};
            for (const l of lines) {
              const [key, value] = l.split('=');
              args[key.trim()] = value.trim();
            }
            tracker.merged = args;
          });

      audio.pipe(ffmpegProcess.stdio[4])
      video.pipe(ffmpegProcess.stdio[5]);
      return {message: "download realizado com sucesso!"};
}

exports.mp3fromVideo = async (urlYt, id) => {

  const idCheck = ytdl.validateID(id);
  if(!idCheck){
    return {message: "invalid ID"}
  }
  const urlCheck =  ytdl.validateURL(urlYt);
  if(!urlCheck){
    return {message: "invalid URL"}
  }
    
    const mp3Name = uuidv4()

    ytdl(urlYt, { filter: format => format.container === 'mp4' }, 'audioonly').pipe(fs.createWriteStream(`${mp3Name}.mp3`));

    return {message: "download realizado com sucesso!"};

}

exports.getInfor = async (id) => {
  return await ytdl.getInfo(id).then(info => {
    return info.videoDetails.title
  })
}
