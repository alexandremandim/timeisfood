const pool = require('../../dbpool')

exports.get_all_acompanhamentos = function(req, res, next) {
    const queryString = "SELECT * FROM acompanhamento"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get acompanhamento")
            res.status(500).json({
                message: err
            })
        }
        res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_acompanhamento = function(req, res, next) {
    const descricao = req.body.descricao;

    if(!descricao){
        res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'INSERT INTO acompanhamento (descricao) VALUES (?)'

    pool.query(queryString, [descricao], (err, results, fields) =>{
        if (err) {
            console.log("Failed to insert new acompanhamento: " + err)
            res.status(500).json({message: err})
        }

        res.status(201).json({
            message: 'Inserted successfuly',
            createdAcompanhamentoID: results.insertId
        });
    })
}

exports.get_acompanhamento = function(req, res, next) {
    const idAcompanhamento = req.params.idAcompanhamento
    const queryString = "SELECT * FROM acompanhamento WHERE idAcompanhamento = ?"

    pool.query(queryString, [idAcompanhamento], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get acompanhamento")
            res.status(500).json(err)
        }

        res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_acompanhamento = function(req, res, next) {
    const idAcompanhamento = req.params.idAcompanhamento
    const descricao = req.body.descricao;

    if(!descricao){
        res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'UPDATE acompanhamento SET descricao = ? WHERE idAcompanhamento = ?'
    pool.query(queryString, [descricao, idAcompanhamento], (err, results) =>{
        if (err) {
            console.log("Failed to update new acompanhamento: " + err)
            res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}