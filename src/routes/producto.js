const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/productos', async (req, res)=>{

    try{
        const productos = await pool.query('SELECT * FROM producto');
        res.json(productos);
    }catch(e){
        res.json(e);
    }
});

router.post('/addProd', async (req, res)=>{
    const {
        nombre,
        cantidad,
        subcategoria,
        fecha,
        grupo,
        programa,
        facultad
    } = req.body;

    const newProd ={      
        nombre,
        cantidad,
        subcategoria,
        fecha,
        grupo,
        programa,
        facultad
    }
    console.log(newProd);
    await pool.query('INSERT INTO producto SET ?', [newProd]);
    res.redirect('productos');
});

router.get('/deleteProd/:id', async (req, res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM producto WHERE id = ?', [id]);
    res.redirect('/prod/productos');
});

router.post('/editProd/:id', async(req, res)=>{
    const {id} = req.params;
    const {
        nombre,
        cantidad,
        subcategoria,
        fecha,
        grupo,
        programa,
        facultad
    } = req.body;

    await pool.query('UPDATE producto SET nombre = ?, cantidad = ?, subcategoria = ?, fecha = ?, grupo = ?, programa = ?, facultad =?  WHERE id = ?', [nombre, cantidad, subcategoria, fecha, grupo, programa, facultad, id]);
    res.redirect('/prod/productos');
});

router.get('/findById/:id', async(req, res)=>{
    const {id} = req.params;
    let producto = await pool.query('SELECT * FROM producto WHERE id = ?', [id]);

    producto = producto[0];
    
    if(producto != null){
        res.json(producto);
    }else{
        msg = 'El producto no existe'
        res.json(msg);
    }
    
});

router.post('/addMasiva', async(req, res)=>{
    const lista  = req.body;
    var i = 0;
    try {
        while(i < lista.length){
        
            const newProd = {
                nombre : lista[i].nombre,
                cantidad : lista[i].cantidad,
                subcategoria : lista[i].subcategoria,
                fecha : lista[i].fecha,
                grupo : lista[i].grupo,
                programa : lista[i].programa,
                facultad : lista[i].facultad
            }
    
            await pool.query('INSERT INTO producto SET ?', [newProd]);
            
            i++;
        }
        
        res.redirect('productos');
        
    } catch (error) {
        console.log(error);
    }

    
});

module.exports = router;
