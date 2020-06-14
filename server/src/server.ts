import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';
import { errors } from 'celebrate'

const app = express();

app.use(cors()); // quando em produção, adicionar cors({origin: www.etc.com})

app.use(express.json()); // para usar JSON no body da requisição

app.use(routes); // rotas no arquivo routes.ts

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors()); // erros retornados do celebrate

app.listen(3333);