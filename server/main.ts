import express from 'express';
import { prompt } from 'enquirer';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import { env } from 'process';
import cors from 'cors';

const app = express();

const su: string[] = [];

const token: {[key: string]: string[]} = {};

app.use(cors({
  origin: env.CLIENT as string
}));

if(process.argv.includes('--with-client')) app.use(express.static('./build'))

app.post('/su', bodyParser.json(), (req, res) => {
  if(!existsSync('./data/.pass')) {res.sendStatus(500); return;}

  if(bcrypt.compareSync(req.body.pass, readFileSync('./data/.pass', 'utf-8'))) {
    const r = rand();
    su.push(r);

    res.json({t: r});
  } else {
    res.sendStatus(403)
  }
})

app.post('/token', bodyParser.json(), (req, res) => {
  if(!su.includes(req.body.su||'')) {
    res.sendStatus(403);
    return;
  }

  //TODO
  
  const j = rand();
  if(token[req.body.id]) token[req.body.id].push(j); else token[req.body.id] = [j];
  res.json({token: j})
})

function rand() {
  const q = 'abcdefghijklmnopqrstuvwxyz1234567890'
  let p = '';
  for(var f = 0; f<13; f++) {p+=q[Math.floor(Math.random()*q.length)]}
  return p;
}

const start = () => app.listen(3001, () => console.log('Server running'))

if(!existsSync('./data')) mkdirSync('./data')

if (!existsSync('./data/.pass')) {
  prompt({
    type: 'password',
    name: 'pass',
    message: 'Create a password'
  }).then(v => {
    // @ts-ignore
    writeFileSync('./data/.pass', bcrypt.hashSync(v.pass, 12))
    start();
  })
} else start();