const pool = require('../../dbpool')

exports.get_all_acompanhamentosrefeicoes = function(req, res, next) {
    const queryString = "SELECT * FROM acompanhamentorefeicao"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get acompanhamentorefeicao")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_acompanhamentorefeicao = function(req, res, next) {
    const idRefeicao = req.body.idRefeicao;
    const idAcompanhamento = req.body.idAcompanhamento;

    if(!idRefeicao || !idAcompanhamento){
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'INSERT INTO acompanhamentorefeicao VALUES (?,?)'
    pool.query(queryString, [idRefeicao, idAcompanhamento], (err, results, fields) =>{
        if (err) {
            console.log("Failed to insert new acompanhamentorefeicao: " + err)
            return res.status(500).json({message: err})
        }

        return res.status(201).json({
            message: 'Inserted successfuly'
        });
    })
}

exports.get_acompanhamentorefeicaoPorRefeicao = function(req, res, next) {
    const idRefeicao = req.params.idRefeicao;
    const queryString = "SELECT * FROM acompanhamentorefeicao WHERE idRefeicao = ?";

    pool.query(queryString, [idRefeicao], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get acompanhamentorefeicao")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}
