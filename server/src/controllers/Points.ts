import { Request, Response } from 'express';
import connection from '../database/connection';

class Points {
    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude,
            items
        } = req.body;  //desestruturação. Transforma as propriedades do objeto em variáveis

        const trx = await connection.transaction(); //transforma os próximos 2 inserts em 1 única transação. Caso 1 insert dê erro, o outro não é executado
        
        const point = {
            image: req.file.filename,
            name,
            email,
            whatsapp,
            city,
            uf,
            latitude,
            longitude //short syntax. prop recebendo var com mesmo nome.
        }

        const insertedId = await trx('points').insert(point);//após inserir, retorna um array com as ids criadas

        const pointItems = items.split(','). // string para array separando na ,
            map((e: string) => Number(e.trim())). // elimina espaços em branco e converte para array de numeros
            map((e: number) => {
                return {
                    points_id: insertedId[0], //primeiro e único elemento.
                    items_id: e
                }
        })

        await trx('point_items').insert(pointItems);

        await trx.commit(); 

        return res.json({
            id: insertedId[0],
            ...point, //spread operator. retorna todas as propriedades de um objeto
        })

    };

    async show(req: Request, res: Response) {
        const { id } = req.params; //desestruturado de: const id = req.params.id

        const point = await connection('points').where('id', id).first();

        if (!point) {
            return res.status(400).send('400 - Point not found.');
        }

        const serializedPoint = {
            ...point,
                //image_url: `http://localhost:3333/uploads/${e.image}`
                image_url: `http://192.168.0.123:3333/uploads/${point.image}` // mobile não enxerga o localhost
        };    
        
        const items = await connection('items').
            join('point_items', 'items.id', '=', 'point_items.items_id').
            where('point_items.points_id', id).
            select('items.title');

        return res.json({ point: serializedPoint, items });
    };

    async index(req: Request, res: Response) {
        const { city, uf, items } = req.query; //desestruturação

        const parsedItems = String(items).split(','). //transforma a string em array
            map( e => Number(e.trim())); //transforma em arry de números e elimina espaços

        const points = await connection('points').
        join('point_items', 'points.id', '=', 'point_items.points_id').
        whereIn('point_items.items_id', parsedItems).
        where('city', String(city)).
        where('uf', String(uf)).
        distinct().
        select('points.*');    

        const serializedPoints = points.map( e => {
            return {
                ...e,
                //image_url: `http://localhost:3333/uploads/${e.image}`
                image_url: `http://192.168.0.123:3333/uploads/${e.image}` // mobile não enxerga o localhost
            };    
        });

        return res.json(serializedPoints);
    }


}

export default Points;