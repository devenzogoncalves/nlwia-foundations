import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { log } from 'console';

const filePath = './tmp/audio.mp4';
const outputPath = filePath.replace('.mp4', '.wav');

const convert = () => new Promise((resolve, reject) => {
  console.log('Convertendo o vídeo');
  
  ffmpeg.setFfmpegPath(ffmpegStatic);
  ffmpeg()
    .input(filePath)
    .audioFrequency(16000)
    .audioChannels(1)
    .format('wav')
    .save(outputPath)
    .on('end', () => {
      const file = fs.readFileSync(outputPath);
      const fileDecoded = wav.decode(file);
    
      const audioData = fileDecoded.channelData[0];
      const floatArray = new Float32Array(audioData);
    
      console.log('Video convertido');
      resolve(floatArray)
    
      fs.unlinkSync(outputPath);
    })
    .on('error', () => {
      console.log(error);
      reject(error);
    })
    
});


export default convert;