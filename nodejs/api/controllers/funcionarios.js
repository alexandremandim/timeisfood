const pool = require('../../dbpool')
const jwt = require('jsonwebtoken')

exports.get_all_funcionarios = function(req, res, next) {
    const queryString = "SELECT idFuncionario, nome, email FROM funcionario"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get funcionario")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_funcionario = function(req, res, next) {

    const nome = req.body.nome;
    const password = req.body.password;
    const email = req.body.email;
    const funcionarioFields = [nome, password, email]

    if(!nome || !password || !email){
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    /* check if the email already exists */
    const getEmailQuery = 'SELECT * FROM funcionario WHERE email = ?'
    pool.query(getEmailQuery, [email], (err, rows, fields) => {

        if (err) {
            console.log('Failed to get email from funcionario')
            return res.status(500).json({message: err})
        }

        if (rows.length > 0) {
            console.log('Existing Email')
            return res.status(409).json({
                message: "Email already exists"
            })
        }

        else {
            const queryString = 'INSERT INTO funcionario (nome, password, email) VALUES (?,?,?)'
            pool.query(queryString, funcionarioFields, (err, results, fields) =>{
                if (err) {
                    console.log("Failed to insert new funcionario: " + err)
                    return res.status(500).json({message: err})
                }

                return res.status(201).json({
                    message: 'Inserted successfuly',
                    createdFuncionarioID: results.insertId
                });
            })
        }

    });
}

exports.get_funcionario = function(req, res, next) {
    const idFuncionario = req.params.idFuncionario
    const queryString = "SELECT idFuncionario, nome, email FROM funcionario WHERE idFuncionario = ?"

    pool.query(queryString, [idFuncionario], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get funcionario")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_funcionario = function(req, res, next) {
    const idFuncionario = req.params.idFuncionario
    const nome = req.body.nome;
    const password = req.body.password;
    const email = req.body.email;
    const funcionarioFields = [nome, password, email, idFuncionario]

    if(!nome || !password || !email) {
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'UPDATE funcionario SET nome = ?, password = ?, email = ? WHERE idFuncionario = ?'
    pool.query(queryString, funcionarioFields, (err, results) =>{
        if (err) {
            console.log("Failed to update new funcionario: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })
}

exports.login = function(req, res, next){
    const email = req.body.email
    const password = req.body.password

    if(email == null || password == null){
        return res.status(400).json({
            message : "Missing fields in request"
        })
    }

    const queryString = "SELECT * FROM funcionario WHERE email = ? and password = ?"
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
                    tipo: "funcionario",
                    id: rows[0].idFuncionario
                },
                "mykey",
                {
                    expiresIn: "1h"
                });

            return res.status(200).json({
                message: "Auth successful",
                token: token,
                funcionario: JSON.parse(JSON.stringify(rows))
            });
        }
    })
}

exports.edit_funcionarios_password = function(req, res, next){
    const idFuncionario = req.params.idFuncionario
    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword

    if(idFuncionario == null || newPassword == null || oldPassword == null){
        return res.status(400).json({
            message : "Missing fields in request"
        })
    }

    const queryString = "SELECT * FROM funcionario WHERE idFuncionario = ?"

    pool.query(queryString, [idFuncionario], (err, rows, fields) => {
        if (err) { return res.status(500).json({error: err}) }

        if(rows.length < 1){ return res.status(401).json({message: "Funcionario ID incorrect"}) }

        else{
            /* Atualizar a base de dados */
            const queryString = 'UPDATE funcionario SET password = ? WHERE idFuncionario = ?'
            
            pool.query(queryString, [newPassword, idFuncionario], (err, results) => {
                if (err) {return res.status(500).json({message: err})}
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