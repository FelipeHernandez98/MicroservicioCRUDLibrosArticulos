const express = require('express');
const router = express.Router();
const pool = require('../database');


router.post('/addArticulo', async(req, res)=>{

    const {
        id_articulo,
        nombre_revista,
        titulo_articulo,
        autores_articulo,
        fecha_articulo,
        volumen_articulo,
        pagina_inical,
        pagina_final,
        issn_articulo,
        url_articulo,
        doi_articulo
    } = req.body;

            newArticulo = {
                id_articulo,
                nombre_revista,
                titulo_articulo,
                autores_articulo,
                fecha_articulo,
                volumen_articulo,
                pagina_inical,
                pagina_final,
                issn_articulo,
                url_articulo,
                doi_articulo
            }
    await pool.query('INSERT INTO articulo SET ?', [newArticulo]);
    res.redirect('articulos');
});

router.get('/articulos', async (req, res)=>{

    const articulos = await pool.query('SELECT * FROM articulo');
    res.json(articulos);
});

router.post('/editArt/:id_articulo', async(req, res)=>{
    const { id_articulo} = req.params;
    const {
            nombre_revista,
            titulo_articulo,
            autores_articulo,
            año_articulo,
            mes_articulo,
            volumen_articulo,
            pagina_inical,
            pagina_final,
            issn_articulo,
            url_articulo,
            doi_articulo    
    } = req.body;

    await pool.query('UPDATE articulo SET nombre_revista =?, titulo_articulo =?, autores_articulo =?, fecha_articulo =?, volumen_articulo =?, pagina_inical =?, pagina_final =?, issn_articulo =?, url_articulo =?, doi_articulo =? WHERE id_articulo =?',
    [nombre_revista,
        titulo_articulo,
        autores_articulo,
        fecha_articulo,
        volumen_articulo,
        pagina_inical,
        pagina_final,
        issn_articulo,
        url_articulo,
        doi_articulo,
        id_articulo]);

res.redirect('/art/articulos');
});

router.delete('/deleteArt/:id_articulo', async(req, res)=>{
    const { id_articulo } = req.params;
    await pool.query('DELETE FROM articulo WHERE id_articulo= ?', [id_articulo]);
});

router.get('/findById/:id', async(req, res)=>{
    const {id} = req.params;
    let  articulo = await pool.query('SELECT * FROM articulo WHERE id_articulo = ?', [id]);

    articulo = articulo[0];
    
    if(articulo != null){
        res.json(articulo);
    }else{
        msg = 'El articulo no existe'
        res.json(msg);
    }
    
});


router.post('/masivo', async (req, res) => {
    const lista = req.body;
    var i = 0;
    try {
        while (i < lista.length) {

            const newArt = {
                id_articulo: lista[i].id_articulo,
                nombre_revista: lista[i].nombre_revista,
                titulo_articulo: lista[i].titulo_articulo,
                autores_articulo: lista[i].autores_articulo,
                fecha_articulo: lista[i].fecha_articulo,
                volumen_articulo: lista[i].volumen_articulo,
                pagina_inical: lista[i].pagina_inical,
                pagina_final: lista[i].pagina_final,
                issn_articulo: lista[i].issn_articulo,
                url_articulo: lista[i].url_articulo,
                doi_articulo: lista[i].doi_articulo
            }

            await pool.query('INSERT INTO articulo SET ?', [newArt]);

            i++;
        }

        res.redirect('articulos');

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;