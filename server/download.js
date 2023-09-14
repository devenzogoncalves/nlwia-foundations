import ytdl from "ytdl-core";
import fs from 'fs';

const download = videoID => {
    const videoURL = `https://www.youtube.com/shorts/${videoID}`;

    ytdl(videoURL, { quality: 'lowestaudio', filter:'audioonly'})

    .on('info', info => {
      const seconds = info.formats[0].approxDurationMs / 1000;

      console.log('Buscando vídeo');

      if (seconds>60) throw new Error("A duração desse vídeo é maior que 60 segundos");

      console.log('Fazendo download do vídeo');
    })

    .on('end', () => {
      console.log('Download do vídeo finalizado');
    })

    .on('error', error => {
      console.log('Não foi possível realizar o download do vídeo:', error)
    })
    
    .pipe(fs.createWriteStream('./tmp/audio.mp4'));
}

export default download;