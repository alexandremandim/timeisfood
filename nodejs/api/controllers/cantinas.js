const pool = require('../../dbpool')

exports.get_all_cantinas = function(req, res, next) {
    const queryString = "SELECT * FROM cantina"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get cantina")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.get_cantina = function(req, res, next) {
    const idCantina = req.params.idCantina
    const queryString = "SELECT * FROM cantina WHERE idCantina = ?"

    pool.query(queryString, [idCantina], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get cantina")
            return res.status(500).json(err)
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_cantina = function(req, res, next){
    let idCantina = req.params.idCantina 
    let tempoReserva = req.body.tempoReserva 
    let tempoAnularReserva = req.body.tempoAnularReserva

    if(idCantina == null || tempoAnularReserva == null || tempoReserva == null){
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'UPDATE cantina SET tempoReserva = ?, tempoAnularReserva = ? \
                            WHERE idCantina = ?'
    pool.query(queryString, [tempoReserva, tempoAnularReserva, idCantina], (err, results) =>{
        if (err) {
            console.log("Failed to update cantina: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}