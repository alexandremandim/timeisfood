const pool = require('../../dbpool')

exports.get_all_pratosprincipais = function(req, res, next) {
    const queryString = "SELECT * FROM pratoprincipal"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get pratoprincipal")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_pratoprincipal = function(req, res, next) {
    const descricao = req.body.descricao;

    if(!descricao){
        return res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'INSERT INTO pratoprincipal (descricao) VALUES (?)'
    pool.query(queryString, [descricao], (err, results, fields) =>{
        if (err) {
            console.log("Failed to insert new pratoprincipal: " + err)
            return res.status(500).json({message: err})
        }

        return res.status(201).json({
            message: 'Inserted successfuly',
            createdPratoPrincipalID: results.insertId
        });
    })
}

exports.get_pratoprincipal = function(req, res, next) {
    const idPratoPrincipal = req.params.idPratoPrincipal
    const queryString = "SELECT * FROM pratoprincipal WHERE idPratoPrincipal = ?"

    pool.query(queryString, [idPratoPrincipal], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get pratoprincipal")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_pratoprincipal = function(req, res, next) {
    const idPratoPrincipal = req.params.idPratoPrincipal
    const descricao = req.body.descricao;

    if(!descricao){
        return res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'UPDATE pratoprincipal SET descricao = ? WHERE idPratoPrincipal = ?'
    pool.query(queryString, [descricao, idPratoPrincipal], (err, results) =>{
        if (err) {
            console.log("Failed to update new pratoprincipal: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}