const pool = require('../../dbpool')

exports.get_all_sobremesas = function(req, res, next) {
    const queryString = "SELECT * FROM sobremesa"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get sobremesa")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_sobremesa = function(req, res, next) {
    const descricao = req.body.descricao;

    if(!descricao){
        return res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'INSERT INTO sobremesa (descricao) VALUES (?)'
    pool.query(queryString, [descricao], (err, results, fields) =>{
        if (err) {
            console.log("Failed to insert new sobremesa: " + err)
            return res.status(500).json({message: err})
        }

        return res.status(201).json({
            message: 'Inserted successfuly',
            createdSobremesaID: results.insertId
        });
    })
}

exports.get_sobremesa = function(req, res, next) {
    const idSobremesa = req.params.idSobremesa
    const queryString = "SELECT * FROM sobremesa WHERE idSobremesa = ?"

    pool.query(queryString, [idSobremesa], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get sobremesa")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_sobremesa = function(req, res, next) {
    const idSobremesa = req.params.idSobremesa
    const descricao = req.body.descricao;

    if(!descricao){
        return res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'UPDATE sobremesa SET descricao = ? WHERE idSobremesa = ?'
    pool.query(queryString, [descricao, idSobremesa], (err, results) =>{
        if (err) {
            console.log("Failed to update new sobremesa: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}