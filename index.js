const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.port || 4000;

app.use(cors());
app.set('port', port);
app.use(express.json());
app.use(express.urlencoded());
app.use(require('./src/routes'));




app.listen(app.get('port'), ()=>{
    console.log('Microservicio CRUD en el puerto ', app.get('port'));
})