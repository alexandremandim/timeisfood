const pool = require('../../dbpool')

exports.get_all_sopas = function(req, res, next) {
    const queryString = "SELECT * FROM sopa"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get sopa")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_sopa = function(req, res, next) {
    const descricao = req.body.descricao;

    if(!descricao){
        return res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'INSERT INTO sopa (descricao) VALUES (?)'
    pool.query(queryString, [descricao], (err, results, fields) =>{
        if (err) {
            console.log("Failed to insert new sopa: " + err)
            return res.status(500).json({message: err})
        }

        return res.status(201).json({
            message: 'Inserted successfuly',
            createdSopaID: results.insertId
        });
    })
}

exports.get_sopa = function(req, res, next) {
    const idSopa = req.params.idSopa
    const queryString = "SELECT * FROM sopa WHERE idSopa = ?"

    pool.query(queryString, [idSopa], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get sopa")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_sopa = function(req, res, next) {
    const idSopa = req.params.idSopa
    const descricao = req.body.descricao;

    if(!descricao){
        res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'UPDATE sopa SET descricao = ? WHERE idSopa = ?'
    pool.query(queryString, [descricao, idSopa], (err, results) =>{
        if (err) {
            console.log("Failed to update new sopa: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}