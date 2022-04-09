const pool = require('../../dbpool')

exports.get_all_senhasconsumidores = function(req, res, next) {
    const queryString = "SELECT * FROM senhaconsumidor LEFT JOIN refeicao ON senhaconsumidor.idRefeicao = refeicao.idRefeicao ORDER BY refeicao.data DESC"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get senhaconsumidor")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_senhaconsumidor = function(req, res, next) {
    const usada = req.body.usada;
    const reservada = req.body.reservada;
    const dataCompra = req.body.dataCompra;
    const dataReserva = req.body.dataReserva;
    const idConsumidor = req.body.idConsumidor;
    const idTipoSenha = req.body.idTipoSenha;
    const idFuncionario = req.body.idFuncionario;
    const idRefeicao = req.body.idRefeicao;

    const senhaconsumidorFields = [usada, reservada, dataCompra, dataReserva, idConsumidor, idTipoSenha, idFuncionario, idRefeicao]

    if(usada == null || reservada == null || !dataCompra || !idConsumidor || !idTipoSenha){
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'INSERT INTO senhaconsumidor (usada, reservada, dataCompra, dataReserva, idConsumidor, idTipoSenha, idFuncionario, idRefeicao) \
                         VALUES (?,?,?,?,?,?,?,?)'
    pool.query(queryString, senhaconsumidorFields, (err, results, fields) =>{
        if (err) {
            console.log("Failed to insert new senhaconsumidor: " + err)
            return res.status(500).json({message: err})
        }

        return res.status(201).json({
            message: 'Inserted successfuly',
            createdSenhaConsumidorID: results.insertId
        });
    })
}

exports.get_senhaconsumidor = function(req, res, next) {
    const idSenhaConsumidor = req.params.idSenhaConsumidor
    const queryString = "SELECT * FROM senhaconsumidor LEFT JOIN refeicao ON senhaconsumidor.idRefeicao = refeicao.idRefeicao WHERE idSenhaConsumidor = ? "

    pool.query(queryString, [idSenhaConsumidor], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get senhaconsumidor")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_senhaconsumidor = function(req, res, next) {
    const idSenhaConsumidor = req.params.idSenhaConsumidor;
    const usada = req.body.usada;
    const reservada = req.body.reservada;
    const dataCompra = req.body.dataCompra;
    const dataReserva = req.body.dataReserva;
    const idConsumidor = req.body.idConsumidor;
    const idTipoSenha = req.body.idTipoSenha;
    const idFuncionario = req.body.idFuncionario;
    const idRefeicao = req.body.idRefeicao;

    const senhaconsumidorFields = [usada, reservada, dataCompra, dataReserva, idConsumidor, idTipoSenha, idFuncionario, idRefeicao, idSenhaConsumidor]

    if(usada == null || reservada == null || !dataCompra || !idConsumidor || !idTipoSenha){
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'UPDATE senhaconsumidor \
                         SET usada = ?, reservada = ?, dataCompra = ?, dataReserva = ?, idConsumidor = ?, idTipoSenha = ?, \
                             idFuncionario = ?, idRefeicao = ? \
                         WHERE idSenhaConsumidor = ?'
    pool.query(queryString, senhaconsumidorFields, (err, results) =>{
        if (err) {
            console.log("Failed to update new senhaconsumidor: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}

exports.get_senhasPorConsumidor = function(req, res, next) {
    const idConsumidor = req.params.idConsumidor
    const queryString = "SELECT * FROM senhaconsumidor LEFT JOIN refeicao ON senhaconsumidor.idRefeicao = refeicao.idRefeicao WHERE idConsumidor = ? "

    pool.query(queryString, [idConsumidor], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get senhaconsumidor")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.get_senhasUsadasPorConsumidor = function(req, res, next) {
    const idConsumidor = req.params.idConsumidor
    const queryString = "SELECT * FROM senhaconsumidor LEFT JOIN refeicao ON senhaconsumidor.idRefeicao = refeicao.idRefeicao WHERE idConsumidor = ? AND usada = 1"

    pool.query(queryString, [idConsumidor], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get senhaconsumidor")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.get_senhasNaoUsadasPorConsumidor = function(req, res, next) {
    const idConsumidor = req.params.idConsumidor
    const queryString = "SELECT * FROM senhaconsumidor LEFT JOIN refeicao ON senhaconsumidor.idRefeicao = refeicao.idRefeicao WHERE idConsumidor = ? AND usada = 0"

    pool.query(queryString, [idConsumidor], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get senhaconsumidor")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.get_senhasNaoReservadasPorConsumidor = function(req, res, next) {
    const idConsumidor = req.params.idConsumidor
    const queryString = "SELECT * FROM senhaconsumidor LEFT JOIN refeicao ON senhaconsumidor.idRefeicao = refeicao.idRefeicao WHERE idConsumidor = ? AND reservada = 0"

    pool.query(queryString, [idConsumidor], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get senhaconsumidor")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.get_senhasReservadasPorConsumidor = function(req, res, next) {
    const idConsumidor = req.params.idConsumidor
    const queryString = "SELECT * FROM senhaconsumidor LEFT JOIN refeicao ON senhaconsumidor.idRefeicao = refeicao.idRefeicao WHERE idConsumidor = ? AND reservada = 1"

    pool.query(queryString, [idConsumidor], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get senhaconsumidor")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}
