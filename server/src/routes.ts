import express from 'express';
import Points from './controllers/Points';
import Items from './controllers/Items';

const routes = express.Router();
// Tipos de rota: 
//     GET(busca informação), 
//     POST(cria informação), 
//     PUT(atualiza informação), 
//     DELETE(apaga informação)

// Tipos de parâmetros: 
//     Request params(ex:localhost:3333/users/5), 
//     Query params(ex:localhost:3333/users?search=x), 
//     Request body(ex: { name: 'João', email: 'j@j.com'})

// Métodos padrão dos Controllers:
//      index(listagem de registros),
//      show(unico registro),
//      create(criar registro),
//      update(atualizar registro),
//      delete(apagar registro)

const items = new Items();
routes.get('/items', items.index);

const points = new Points();
routes.post('/points', points.create);  
routes.get('/points/:id', points.show);  //Request param
routes.get('/points', points.index); 

export default routes;