import knex from 'knex'; //Query builder
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') //resolve padroniza o caminho. __dirname global var do dir atual
    },
    useNullAsDefault: true
});

export default connection;