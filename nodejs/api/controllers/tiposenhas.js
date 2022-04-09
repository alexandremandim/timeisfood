const pool = require('../../dbpool')

exports.get_all_tiposenhas = function(req, res, next) {
    const queryString = "SELECT * FROM tiposenha"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get tiposenha")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_tiposenha = function(req, res, next) {
    const descricao = req.body.descricao;
    const preco = req.body.preco;
    const tiposenhaFields = [descricao, preco]

    if(!descricao || !preco){
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'INSERT INTO tiposenha (descricao, preco) VALUES (?, ?)'
    pool.query(queryString, tiposenhaFields, (err, results, fields) =>{
        if (err) {
            console.log("Failed to insert new tiposenha: " + err)
            return res.status(500).json({message: err})
        }

        return res.status(201).json({
            message: 'Inserted successfuly',
            createdTipoSenhaID: results.insertId
        });
    })
}

exports.get_tiposenha = function(req, res, next) {
    const idTipoSenha = req.params.idTipoSenha
    const queryString = "SELECT * FROM tiposenha WHERE idTipoSenha = ?"

    pool.query(queryString, [idTipoSenha], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get tiposenha")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_tiposenha = function(req, res, next) {
    const idTipoSenha = req.params.idTipoSenha
    
    const descricao = req.body.descricao;
    const preco = req.body.preco;
    const tiposenhaFields = [descricao, preco, idTipoSenha]

    if(!descricao || !preco){
        return res.status(400).json({
            message: 'Missing field descricao'
        })
    }

    const queryString = 'UPDATE tiposenha SET descricao = ?, preco = ? WHERE idTipoSenha = ?'
    pool.query(queryString, tiposenhaFields, (err, results) =>{
        if (err) {
            console.log("Failed to update new tiposenha: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}