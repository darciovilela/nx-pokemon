import express from 'express';
import cors from 'cors';
import * as path from 'path';
// import { pokemon } from './pokemon';
import axios from 'axios';

const app = express();
app.use(cors());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to pokemon api Darcio!' });
});
// Original route to get pokemon from ts local file
// app.get('/pokemon', (req, res) => {
//   res.send(pokemon);
// });


// Original search route
// app.get('/search', (req, res) => {
//   const q = ((req.query.q as string) ?? '').toLowerCase()
//   res.send(pokemon.filter(({ name: {english} }) => 
//   english.toLowerCase().includes(q)))
// });

// New route to use a real API
app.get('/pokemon', async (req, res) => {
  const q = ((req.query.q as string) ?? '').toLowerCase();
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
    // const data = response.data.results;
    const results = response.data.filter(({ name }) => name.includes(q));
    res.send(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
