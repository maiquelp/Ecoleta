import multer from 'multer';
import path from 'path'; // dependência nativa para lidar com localização de arquivos em diferentes SOs
import crypto from 'crypto';


export default {
    storage: multer.diskStorage({
        destination: path.resolve('__dirname', '..', 'uploads'),
        filename(req, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex');
            const fileName = `${hash}-${file.originalname}`;
            callback(null, fileName); // em caso de erro retorna null, senão retorna o nome do arquivo
        }
    })
}