const pool = require('../../dbpool')
const jwt = require('jsonwebtoken')
 
exports.get_all_consumidores = function(req, res, next){
    const queryString = "SELECT idConsumidor, NIF, email, genero, dataNascimento, \
                                nome, qrcode, utilizadorAceite\
                         FROM consumidor WHERE utilizadorAceite = 1"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_consumidor = function(req, res, next){
   
    const password = req.body.password
    const nif = req.body.NIF
    const email = req.body.email
    const genero = req.body.genero  
    const dataNascimento = req.body.dataNascimento
    const nome = req.body.nome
    const qrcode = req.body.qrcode
    const utilizadorAceite = 0
    const consumidorFields = [nif, email, password, genero, dataNascimento, nome, qrcode, utilizadorAceite]

    /* missing fields */
    if (!nif || !email || !password || !genero || !dataNascimento || !nome || !qrcode)  return res.status(400).json({message: 'Missing fields'})
    if(nif.length != 9) return res.status(400).json({message: "NIF must have 9 digits"})
    if(genero.length != 1)  return res.status(400).json({message: "Genero must have 1 character"})
    
    /* check if the email already exists */
    const getEmailQuery = 'SELECT * FROM consumidor WHERE email = ?'
    pool.query(getEmailQuery, [email], (err, rows, fields) => {

        if(err) return res.status(500).json({err})

        if(rows.length > 0) return res.status(409).json({message: "Email already exists"})

        /* check if the qrcode already exists */
        const getEmailQuery = 'SELECT * FROM consumidor WHERE qrcode = ?'
        pool.query(getEmailQuery, [qrcode], (err, rows, fields) => {
    
            if(err) return res.status(500).json({err})
    
            if(rows.length > 0) return res.status(409).json({message: "Qrcode already exists"})
    
            else {
                /* check if NIF already exists */
                const getNIFQuery = 'SELECT * FROM consumidor WHERE NIF = ?'
                pool.query(getNIFQuery, [nif], (err, rows, fields) => {
                    
                    /* Erros */
                    if (err) return res.status(500).json({err})
                    if (rows.length > 0)return res.status(409).json({message: "NIF already exists"})
    
                    else {
                        const queryString = 'INSERT INTO consumidor (NIF, email, password, genero, dataNascimento, nome, qrcode, utilizadorAceite) \
                                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
                        pool.query(queryString, consumidorFields, (err, results, fields) => {
                            if (err) return res.status(500).json({message: err})

                            return res.status(201).json({
                                message: 'Inserted successfuly',
                                createdConsumidorID: results.insertId
                            });
                        });
                    }
                });
            }
        });

    });
        

}

exports.get_consumidor = function(req, res, next){
    const idConsumidor = req.params.idConsumidor
    const queryString = "SELECT idConsumidor, NIF, email, genero, dataNascimento, \
                         nome, qrcode, utilizadorAceite FROM consumidor WHERE idConsumidor = ?"

    pool.query(queryString, [idConsumidor], (err, rows, fields) => {
        if (err) {return res.status(500).json({message: err})}

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_consumidor = function(req, res, next){

    const idConsumidor = req.params.idConsumidor
    const nif = req.body.NIF
    const genero = req.body.genero
    const dataNascimento = req.body.dataNascimento
    const nome = req.body.nome
    const qrcode = req.body.qrcode
    const utilizadorAceite = req.body.utilizadorAceite
    const consumidorFields = [nif, genero, dataNascimento, nome, qrcode, utilizadorAceite, idConsumidor]

    /* missing fields */
    if (!nif || !genero || !dataNascimento || !nome || !qrcode || utilizadorAceite == null) {
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    if(nif.length != 9) return res.status(400).json({message: "NIF must have 9 digits"})
    if(genero.length != 1)  return res.status(400).json({message: "Genero must have 1 character"})

    const queryString = 'UPDATE consumidor SET NIF = ?, genero = ?, dataNascimento = ?, \
                                nome = ?, qrcode = ?, utilizadorAceite = ? \
                        WHERE idConsumidor = ?'
    pool.query(queryString, consumidorFields, (err, results) => {
        if (err) {  return res.status(500).json({message: err}) }
        if(results.affectedRows == 1){  return res.status(201).json({message: 'Updated successfuly'});  }
        else{   return res.status(404).json({message: "ID not found"}) }
    });
}

exports.login = function(req, res, next){
    const email = req.body.email
    const password = req.body.password

    if(email == null || password == null){
        return res.status(400).json({
            message : "Missing fields in request"
        })
    }

    const queryString = "SELECT * FROM consumidor WHERE email = ? and password = ? and utilizadorAceite = 1"
    pool.query(queryString, [email, password], (err, rows, fields) => {
        if (err) {
            return res.sendStatus(500).json({error: err})
        }
        if(rows.length < 1){
            return res.status(401).json({message: "Auth failed"})
        }
        else{
            const token = jwt.sign(
                {
                    tipo: "consumidor",
                    id: rows[0].idConsumidor
                },
                "mykey",
                {
                    expiresIn: "1h"
                });

            return res.status(200).json({
                message: "Auth successful",
                token: token,
                consumidor: {
                    idConsumidor: rows[0].idConsumidor,
                    NIF: rows[0].NIF,
                    email: rows[0].email,
                    genero: rows[0].genero,
                    dataNascimento: rows[0].dataNascimento,
                    nome: rows[0].nome,
                    qrcode: rows[0].qrcode,
                    utilizadorAceite: rows[0].utilizadorAceite
                }
            });
        }
    })
}

exports.get_consumidoresNaoAceites = function(req, res, next){
    const queryString = "SELECT idConsumidor, NIF, email, genero, dataNascimento, \
                            nome, qrcode, utilizadorAceite\
                        FROM consumidor WHERE utilizadorAceite = 0"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get consumidor")
            return res.status(500).json(err)
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_consumidores_password = function(req, res, next){
    const idConsumidor = req.params.idConsumidor
    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword

    if(idConsumidor == null || newPassword == null || oldPassword == null){
        return res.status(400).json({
            message : "Missing fields in request"
        })
    }

    const queryString = "SELECT * FROM consumidor WHERE idConsumidor = ? and password = ?"

    pool.query(queryString, [idConsumidor, oldPassword], (err, rows, fields) => {
        if (err) { return res.status(500).json({error: err}) }

        if(rows.length < 1){ return res.status(401).json({message: "Consumidor ID incorrect"}) }

        else{
            const queryString = 'UPDATE consumidor SET password = ? WHERE idConsumidor = ?'
            pool.query(queryString, [newPassword, idConsumidor], (err, results) => {
                if (err) {
                    console.log("Failed to update consumidor" + err)
                    return res.status(500)
                }
                if(results.affectedRows == 1){
                    return res.status(201).json({
                        message: 'Updated successfuly'
                    }); 
                }
                else{
                    return res.status(401).json({error: 'Change password failed'})
                }
            });
        }
    })
}

exports.getSenhasReservadasByQrCode = function(req, res, next){
    
    let qrcode = req.params.qrcode
    let dataRefeicao = req.params.dataRefeicao
    
    if(!qrcode|| !dataRefeicao){ return res.status(400).json({message: 'Missing fields'})}

    const queryString = 'SELECT SC.idSenhaConsumidor, SC.usada, SC.reservada, \
    SC.dataCompra, SC.dataReserva, SC.idConsumidor, SC.idTipoSenha, SC.idFuncionario, \
    SC.idRefeicao, R.idHorario, R.eVegetariana \
    FROM senhaconsumidor SC \
    LEFT JOIN consumidor C on C.idConsumidor = SC.idConsumidor \
    LEFT JOIN refeicao R on R.idRefeicao = SC.idRefeicao \
    WHERE C.qrcode = ? AND SC.reservada = 1 AND SC.usada = 0 \
    AND SC.dataReserva AND R.data = ? ';
    

    pool.query(queryString, [qrcode, dataRefeicao], (err, rows, fields) => {
        
        if (err){    return res.status(500).json({message: err})}
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}