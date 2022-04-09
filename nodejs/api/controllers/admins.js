const pool = require('../../dbpool')
const jwt = require('jsonwebtoken')

exports.get_all_admins = function(req, res, next) {


    const queryString = "SELECT idAdmin, email, nome FROM admin"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get admin")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })

}

exports.insert_admin = function(req, res, next) {

    const email = req.body.email
    const password = req.body.password
    const nome = req.body.nome
    const adminFields = [email, password, nome]

    /* missing fields */
    if (!email || !password || !nome) {
        return res.status(400).json({
            message: 'Missing fields'
        })
    }
    
    /* check if the email already exists */
    const getEmailQuery = 'SELECT * FROM admin WHERE email = ?'
    pool.query(getEmailQuery, [email], (err, rows, fields) => {

        if (err) {  return res.status(500).json({message: err})}

        if (rows.length > 0) {return res.status(409).json({message: "Email already exists"});}

        else {
            const queryString = 'INSERT INTO admin (email, password, nome) VALUES (?, ?, ?)'
            
            pool.query(queryString, adminFields, (err, results, fields) => {
                if (err) {return res.status(500).json({message: err})}
                else{
                    return res.status(201).json({
                        message: 'Inserted successfuly',
                        createdAdminID: results.insertId
                    });
                }
            });
        }
    });
}

exports.get_admin = function(req, res, next) {
    const idAdmin = req.params.idAdmin
    const queryString = "SELECT idAdmin, email, nome FROM admin WHERE idAdmin = ?"

    pool.query(queryString, [idAdmin], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get admin")
            return res.status(500).json({
                message: err
            })
        }
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_admin = function(req, res, next){
    const idAdmin = req.params.idAdmin
    const nome = req.body.nome
    const adminFields = [nome, idAdmin]

    /* missing fields */
    if (!email || !nome || !idAdmin) {
        return res.status(400).json({
            message: 'Missing fields'
        })
    }

    const queryString = 'UPDATE admin \
                                 SET nome = ? \
                                 WHERE idAdmin = ?'
    pool.query(queryString, adminFields, (err, results) => {
        if (err) {
            console.log("Failed to insert new admin: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }

    });
}

exports.login = function(req, res, next){
    const email = req.body.email
    const password = req.body.password

    if(!email || !password){
        return res.status(400).json({
            message : "Missing fields in request"
        })
    }

    const queryString = "SELECT * FROM admin WHERE email = ? and password = ?"
    pool.query(queryString, [email, password], (err, rows, fields) => {
        if (err) {
            return res.status(500).json({error: err})
        }
        if(rows.length < 1){
            return res.status(401).json({message: "Auth failed"})
        }
        else{
            const token = jwt.sign(
                {
                    tipo: "administrador",
                    id: rows[0].idAdmin
                },
                "mykey",
                {
                    expiresIn: "1h"
                });

            return res.status(200).json({
                message: "Auth successful",
                token: token,
                administrador: JSON.parse(JSON.stringify(rows))
            });
        }
    })
}

exports.edit_admin_password = function(req, res, next){
    const idAdmin = req.params.idAdmin
    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword

    if(idAdmin == null || newPassword == null || oldPassword == null){
        return res.status(400).json({
            message : "Missing fields in request"
        })
    }

    const queryString = "SELECT * FROM admin WHERE idAdmin = ?"

    pool.query(queryString, [idAdmin], (err, rows, fields) => {
        if (err) { return res.status(500).json({error: err}) }

        if(rows.length < 1){ return res.status(401).json({message: "Admin ID incorrect"}) } 
         else{
             /* Atualizar a base de dados */
            const queryString = 'UPDATE admin SET password = ? WHERE idAdmin = ?'
            
            pool.query(queryString, [oldPassword, idAdmin], (err, results) => {
                if (err) {
                    console.log("Failed to update admin: " + err)
                    return res.status(500).json({message: err})
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
