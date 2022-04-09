const jwt = require('jsonwebtoken')

/* C */
exports.auth_consumidor = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        
        if(decoded.tipo == "consumidor"){
            req.userData = decoded;
            next()
        }
        else{
            return res.status(401).json({
                error: error,
                message:"Auth failed"
            })
        }
    }catch(error){
        return res.status(401).json({
            error: error,
            message:"Auth failed"
        })
    }
}
/* A */
exports.auth_administrador = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        console.log(decoded)
        if(decoded.tipo == "administrador"){
            req.userData = decoded;
            next()
        }
        else{
            return res.status(401).json({
                error: error,
                message:"Auth failed"
            })
        }
    }catch(error){
        return res.status(401).json({
            error: error,
            message:"Auth failed"
        })
    }
}
/* F */
exports.auth_funcionario = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        
        if(decoded.tipo == "funcionario"){
            req.userData = decoded;
            next()
        }
        else{
            return res.status(401).json({
                error: error,
                message:"Auth failed"
            })
        }
    }catch(error){
        return res.status(401).json({
            error: error,
            message:"Auth failed"
        })
    }
}
/* TODOS */
exports.auth_todos = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY) 
        console.log(decoded) 
        req.userData = decoded;
        next()
    }catch(error){
        return res.status(401).json({
            error: error,
            message:"Auth failed"
        })
    }
}
/* A,C */
exports.auth_administradorconsumidor = function(req,res,next){

    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        console.log(decoded)
        if(decoded.tipo == "consumidor" || decoded.tipo == "administrador"){
            req.userData = decoded;
            next()
        }
        else{
            return res.status(401).json({
                error: error,
                message:"Auth failed"
            })
        }
    }catch(error){
        return res.status(401).json({
            error: error,
            message:"Auth failed"
        })
    }
}
/* A,F */
exports.auth_administradorfuncionario = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        
        if(decoded.tipo == "funcionario" || decoded.tipo == "administrador"){
            req.userData = decoded;
            next()
        }
        else{
            return res.status(401).json({
                error: error,
                message:"Auth failed"
            })
        }
    }catch(error){
        return res.status(401).json({
            error: error,
            message:"Auth failed"
        })
    }
}