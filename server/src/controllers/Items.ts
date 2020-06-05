import { Request, Response } from 'express';
import connection from '../database/connection';

class Items {

    async index(req: Request, res: Response) {
        const items = await connection('items').select('*');

        const serializedItems = items.map( e => {
            return {
                id: e.id,
                title: e.title,
                image_url: `http://localhost:3333/uploads/${e.image}`
            };    
        });

        return res.json(serializedItems);
    }
}

export default Items;