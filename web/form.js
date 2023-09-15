import server from './server.js'

const form = document.querySelector('#search');
const input = document.querySelector('#url');
const content = document.querySelector('#content');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const videoURL = input.value
  if (!videoURL.includes('shorts')) return content.textContent = "❌ Esse link não parece com o de um Short";

  const params = videoURL.split('/shorts/')[1];
  const videoID = params.split('?')[0];

  content.textContent = "Obtendo a transcrição do áudio"
  const transcription = await server.get(`/summary/${videoID}`);

  content.textContent = "Resumindo a transcrição";
  const summary = await server.post('/summary', {
    text: transcription.data.result
  });

  content.textContent = summary.data.result;
  content.classList.remove('placeholder');
});