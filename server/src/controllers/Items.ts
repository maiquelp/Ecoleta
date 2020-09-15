import { Request, Response } from 'express';
import connection from '../database/connection';

class Items {

    async index(req: Request, res: Response) {
        const items = await connection('items').select('*');

        const serializedItems = items.map( e => {
            return {
                id: e.id,
                title: e.title,
                //image_url: `http://localhost:3333/uploads/${e.image}`
                image_url: `http://192.168.0.105:3333/uploads/${e.image}` // mobile não enxerga o localhost
            };    
        });

        return res.json(serializedItems);
    }
}

export default Items;