import express from 'express';
import multer from 'multer';    
import { celebrate, Joi } from 'celebrate'

import multerConfig from './config/multer'

import Points from './controllers/Points';
import Items from './controllers/Items';

const routes = express.Router();
const upload = multer(multerConfig);
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
const points = new Points();

routes.get('/items', items.index);

routes.get('/points/:id', points.show);  //Request param
routes.get('/points', points.index); 
routes.post('/points', 
    upload.single('image'), 
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            city: Joi.string().required(),
            items: Joi.string().required(),
            uf: Joi.string().required().max(2),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        })
    }, {
        abortEarly: false // valida todos os campos de uma vez
    }),
    points.create); // single para unico arquivo e image para nome do campo  


export default routes;