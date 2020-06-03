import express from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(express.json()); // usando o padrão JSON no body da requisição

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(cors()); // quando em produção, adicionar cors({origin: www.etc.com})

app.listen(3333);