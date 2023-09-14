import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors());

app.get('/summary/:id', (req, res) => {
  res.send(`Video id: ${req.params.id}`);
});

app.listen(3333, () => console.log('Server runnig on 3333'));
