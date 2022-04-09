const pool = require('../../dbpool')

exports.get_all_avisos = function(req, res, next) {
    const queryString = "SELECT * FROM aviso ORDER BY dataLancamento DESC"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get aviso")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_aviso = function(req, res, next) {
    const dataLancamento = req.body.dataLancamento
    const descricao = req.body.descricao
    const idAdmin = req.body.idAdmin
    const titulo = req.body.titulo
    const avisoFields = [dataLancamento, descricao, idAdmin, titulo]

    if(titulo == null || !dataLancamento || !descricao || !idAdmin){
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'INSERT INTO aviso (dataLancamento, descricao, idAdmin, titulo) VALUES (?, ?, ?, ?)'
    pool.query(queryString, avisoFields, (err, results, fields) =>{
        if (err)    return res.status(500).json({message: err})        
        return res.status(201).json({createdAvisoID: results.insertId});
    })
}

exports.get_aviso = function(req, res, next) {
    const idAviso = req.params.idAviso
    const queryString = "SELECT * FROM aviso WHERE idAviso = ?"

    pool.query(queryString, [idAviso], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get aviso")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_aviso = function(req, res, next) {
    const idAviso = req.params.idAviso

    const dataLancamento = req.body.dataLancamento
    const descricao = req.body.descricao
    const idAdmin = req.body.idAdmin
    const avisoFields = [dataLancamento, descricao, idAdmin, idAviso]
    //console.log(avisoFields)

    if(!dataLancamento || !descricao || !idAdmin){
        return res.sendStatus(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'UPDATE aviso SET dataLancamento = ?, descricao = ?, idAdmin = ? WHERE idAviso = ?'
    pool.query(queryString, avisoFields, (err, results) =>{
        if (err) {
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}