const pool = require('../../dbpool')

exports.get_all_horarios = function(req, res, next) {
    const queryString = "SELECT * FROM horario"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get horario")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_horario = function(req, res, next) {
    const descricao = req.body.descricao;
    const horaInicio = req.body.horaInicio;
    const horaFim = req.body.horaFim;
    const horarioFields = [descricao, horaInicio, horaFim]

    /* missing fields */
    if (!descricao || !horaInicio || !horaFim) {
        return res.status(404).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'INSERT INTO horario (descricao, horaInicio, horaFim) VALUES (?,?,?)'
    pool.query(queryString, horarioFields, (err, results, fields) => {
        if (err) {
            console.log("Failed to insert new horario: " + err)
            return res.status(500).json({message: err})
        }

        return res.status(201).json({
            message: 'Inserted successfuly',
            createdHorarioID: results.insertId
        });
    })
}

exports.get_horario = function(req, res, next) {
    const idHorario = req.params.idHorario
    const queryString = "SELECT * FROM horario WHERE idHorario = ?"

    pool.query(queryString, [idHorario], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get horario")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_horario = function(req, res, next) {
    const idHorario = req.params.idHorario

    const descricao = req.body.descricao;
    const horaInicio = req.body.horaInicio;
    const horaFim = req.body.horaFim;
    const horarioFields = [descricao, horaInicio, horaFim, idHorario]

    /* missing fields */
    if (!descricao || !horaInicio || !horaFim) {
        return res.status(404).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'UPDATE horario \
                         SET descricao = ?, horaInicio = ?, horaFim = ? \
                         WHERE idHorario = ?'
    pool.query(queryString, horarioFields, (err, results) => {
        if (err) {
            console.log("Failed to update new horario: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}