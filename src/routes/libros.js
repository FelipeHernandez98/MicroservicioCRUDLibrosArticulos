const express = require('express');
const router = express.Router();
const pool = require('../database');


router.post('/addLibro', async(req, res)=>{

    const { 
        id_libro, 
        titulo_libro, 
        isbn_libro, 
        fecha_publicacion_libro,
        autores_libro,
        editorial_libro,
        lugar_publicacion_libro,
        certificado_creditos_libro,
        certificado_investigacion_libro,
        numero_capitulos_libro } = req.body;

    newLibro = {
        id_libro, 
        titulo_libro, 
        isbn_libro, 
        fecha_publicacion_libro,
        autores_libro,
        editorial_libro,
        lugar_publicacion_libro,
        certificado_creditos_libro,
        certificado_investigacion_libro,
        numero_capitulos_libro
    }

    await pool.query('INSERT INTO libro SET ?', [newLibro]);
    res.redirect('libros');
});

router.get('/libros', async (req, res)=>{

    const libros = await pool.query('SELECT * FROM libro');

    res.json(libros);
});

router.post('/editLibro/:id_libro', async(req, res)=>{
    
    const { id_libro } = req.params;
    const { 
        titulo_libro, 
        isbn_libro, 
        fecha_publicacion_libro,
        autores_libro,
        editorial_libro,
        lugar_publicacion_libro,
        certificado_creditos_libro,
        certificado_investigacion_libro,
        numero_capitulos_libro } = req.body;

    await pool.query('UPDATE libro SET titulo_libro = ?, isbn_libro = ?, fecha_publicacion_libro = ?, autores_libro = ?, editorial_libro = ?, lugar_publicacion_libro = ?, certificado_creditos_libro = ?, certificado_investigacion_libro = ?, numero_capitulos_libro =? WHERE id_libro = ?', 
        [titulo_libro, 
        isbn_libro, 
        fecha_publicacion_libro,
        autores_libro,
        editorial_libro,
        lugar_publicacion_libro,
        certificado_creditos_libro,
        certificado_investigacion_libro,
        numero_capitulos_libro, 
        id_libro]);

        res.redirect('/lib/libros');    
});

router.delete('/deleteLib/:id_libro', async(req, res)=>{
    const { id_libro } = req.params;
    await pool.query('DELETE FROM libro WHERE id_libro= ?', [id_libro]);
});

router.get('/findById/:id', async(req, res)=>{
    const {id} = req.params;
    let libro = await pool.query('SELECT * FROM libro WHERE id_libro = ?', [id]);

    libro = libro[0];
    
    if(libro != null){
        res.json(libro);
    }else{
        msg = 'El libro no existe'
        res.json(msg);
    }
    
});

router.post('/masivo', async (req, res) => {
    const lista = req.body;
    var i = 0;
    try {
        while (i < lista.length) {

            const newLibro = {
                id_libro: lista[i].id_libro,
                titulo_libro: lista[i].titulo_libro,
                isbn_libro: lista[i].isbn_libro,
                fecha_publicacion_libro: lista[i].fecha_publicacion_libro,
                autores_libro: lista[i].autores_libro,
                editorial_libro: lista[i].editorial_libro,
                lugar_publicacion_libro: lista[i].lugar_publicacion_libro,
                certificado_creditos_libro: lista[i].certificado_creditos_libro,
                certificado_investigacion_libro: lista[i].certificado_investigacion_libro,
                numero_capitulos_libro: lista[i].numero_capitulos_libro
            }

            await pool.query('INSERT INTO libro SET ?', [newLibro]);

            i++;
        }

        res.redirect('libros');

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;