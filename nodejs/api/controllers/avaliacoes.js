const pool = require('../../dbpool')

exports.get_all_avaliacoes = function(req, res, next) {

    const queryString = "SELECT * FROM avaliacao ORDER BY dataAvaliacao"
    pool.query(queryString, (err, rows, fields) => {
        if (err)   return res.status(500).json({message: err})
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_avaliacao = function(req, res, next) {
    const avaliacao = req.body.avaliacao;
    const idRefeicao = req.body.idRefeicao;
    const idConsumidor = req.body.idConsumidor;
    const dataAvaliacao = req.body.dataAvaliacao;
    const avaliacaoFields = [avaliacao, idRefeicao, idConsumidor, dataAvaliacao]

    if(avaliacao == null || idRefeicao == null || idConsumidor == null || dataAvaliacao == null){
        return res.status(400).json({message: 'Missing fields'})
    }

    if(avaliacao < 1 || avaliacao > 5) 
        return res.status(400).json({message: "Avaliacao must be between 0-5"})

    /* check if refeicao has already been rate by consumidor*/
    const getEmailQuery = 'SELECT * FROM avaliacao WHERE idConsumidor = ? AND idRefeicao = ?'
    pool.query(getEmailQuery, [idConsumidor, idRefeicao], (err, rows, fields) => {
        if (err) {return res.status(500).json({message: err})        }

        if (rows.length > 0) {return res.status(409).json({message: "Consumidor has already rate Refeicao"})}

        else {
            const queryString = 'INSERT INTO avaliacao (avaliacao, idRefeicao, idConsumidor, dataAvaliacao) VALUES (?, ?, ?, ?)'
            pool.query(queryString, avaliacaoFields, (err, results, fields) =>{
                
                if (err) {return res.status(500).json({message: err})}

                return res.status(201).json({
                    message: 'Inserted successfuly',
                    createdAvaliacaoID: results.insertId
                });
            })
        }
    });
}

exports.get_avaliacao = function(req, res, next) {
    const idAvaliacao = req.params.idAvaliacao
    const queryString = "SELECT * FROM avaliacao WHERE idAvaliacao = ?"

    pool.query(queryString, [idAvaliacao], (err, rows, fields) => {
        if (err)    return res.status(500).json({message: err})
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_avaliacao = function(req, res, next) {
    const idAvaliacao = req.params.idAvaliacao
    const avaliacao = req.body.avaliacao;
    const idRefeicao = req.body.idRefeicao;
    const idConsumidor = req.body.idConsumidor;
    const dataAvaliacao = req.body.dataAvaliacao;
    const avaliacaoFields = [avaliacao, idRefeicao, idConsumidor, dataAvaliacao, idAvaliacao]

    if(!avaliacao || !idRefeicao || !idConsumidor || !dataAvaliacao){
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'UPDATE avaliacao SET avaliacao = ?, idRefeicao = ?, idConsumidor = ?, dataAvaliacao = ? WHERE idAvaliacao = ?'
    pool.query(queryString, avaliacaoFields, (err, results) =>{
        if (err) {
            console.log("Failed to update new avaliacao: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}

exports.get_avaliacoes_consumidor = function(req, res, next) {
    const idConsumidor = req.params.idConsumidor
    const queryString = "SELECT * FROM avaliacao WHERE idConsumidor = ?"

    pool.query(queryString, [idConsumidor], (err, rows, fields) => {
        if (err)    return res.status(500).json({message: err})
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}