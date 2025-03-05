import routes from './Routes.js';
import express from 'express'
import connectToDatabase from './database.js';
import fileUpload from 'express-fileupload';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT =9000;
const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(fileUpload({
    createParentPath: true
  }));
  app.use(cors());

app.use(routes);

connectToDatabase();
app.get('/',(req, res)=>{
    console.log("Hello")
})
app.listen(PORT ,()=>{
    console.log('server on http://localhost:'+PORT);
});
