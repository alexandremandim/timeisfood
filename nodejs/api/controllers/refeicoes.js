const pool = require('../../dbpool')

exports.get_all_refeicoes = function(req, res, next) {
    const queryString = "SELECT R.idRefeicao, R.data, R.idSopa, SO.descricao AS sopaDescricao,\
                                R.idPratoPrincipal, P.descricao AS pratoDescricao, \
                                R.idSobremesa, S.descricao AS sobremesaDescricao, \
                                R.idHorario, R.idAdmin, H.horaInicio, H.horaFim,\
                                R.energia, R.lipidos, R.lipidos_saturados, R.hidratos,\
                                R.hidratos_acucares, R.fibra, R.proteinas, R.sal, R.energiaR,\
                                R.lipidosR, R.lipidos_saturadosR, R.hidratosR, R.hidratos_acucaresR,\
                                R.fibraR, R.proteinasR, R.salR, R.eVegetariana as eVegetariana\
                        FROM refeicao R\
                        LEFT JOIN sobremesa S ON R.idSobremesa = S.idSobremesa\
                        LEFT JOIN horario H ON R.idHorario = H.idHorario\
                        LEFT JOIN pratoprincipal P ON R.idPratoPrincipal = P.idPratoPrincipal\
                        LEFT JOIN sopa SO ON R.idSopa = SO.idSopa\
                        ORDER BY R.data desc ;"

    pool.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to get refeicao")
            return res.status(500).json({
                message: err
            })
        }
        /*
        for (var i = 0; i < rows.length; i++) {
            console.log(rows[i]);
            
            const idRefeicao = objectRows[i].idRefeicao
            const queryGetAcompanhamentos = "SELECT A.idAcompanhamento, A.descricao FROM acompanhamentorefeicao AC\
                                             LEFT JOIN acompanhamento A ON AC.idAcompanhamento = A.idAcompanhamento\
                                             WHERE idRefeicao = ?;"
            pool.query(queryString, [idRefeicao], (err, rowsAcom, fields) => {
                if (err) {
                    console.log("Failed to get refeicao")
                    return res.status(500).json({message: err})
                }
                objectRows[i].acompanhamentos = rowsAcom
            })
        }*/
        
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.get_refeicao = function(req, res, next) {
    const idRefeicao = req.params.idRefeicao
    const queryString = "SELECT R.idRefeicao, R.data, R.idSopa, SO.descricao AS sopaDescricao,\
                                R.idPratoPrincipal, P.descricao AS pratoDescricao, \
                                R.idSobremesa, S.descricao AS sobremesaDescricao, \
                                R.idHorario, R.idAdmin, H.horaInicio, H.horaFim,\
                                R.energia, R.lipidos, R.lipidos_saturados, R.hidratos,\
                                R.hidratos_acucares, R.fibra, R.proteinas, R.sal, R.energiaR,\
                                R.lipidosR, R.lipidos_saturadosR, R.hidratosR, R.hidratos_acucaresR,\
                                R.fibraR, R.proteinasR, R.salR, R.eVegetariana as eVegetariana\
                        FROM refeicao R\
                        LEFT JOIN sobremesa S ON R.idSobremesa = S.idSobremesa\
                        LEFT JOIN horario H ON R.idHorario = H.idHorario\
                        LEFT JOIN pratoprincipal P ON R.idPratoPrincipal = P.idPratoPrincipal\
                        LEFT JOIN sopa SO ON R.idSopa = SO.idSopa\
                        WHERE R.idRefeicao = ?"

    pool.query(queryString, [idRefeicao], (err, rows, fields) => {
        if (err) {
            console.log("Failed to get refeicao")
            return res.status(500).json({message: err})
        }

        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.insert_refeicao = function(req, res, next) {
    const data = req.body.data;
    const idSopa = req.body.idSopa;
    const idPratoPrincipal = req.body.idPratoPrincipal;
    const idSobremesa = req.body.idSobremesa;
    const idHorario = req.body.idHorario;
    const idAdmin = req.body.idAdmin;
    const energia = req.body.energia;
    const lipidos = req.body.lipidos;
    const lipidos_saturados = req.body.lipidos_saturados;
    const hidratos = req.body.hidratos;
    const hidratos_acucares = req.body.hidratos_acucares;
    const fibra = req.body.fibra;
    const proteinas = req.body.proteinas;
    const sal = req.body.sal;
    const energiaR = req.body.energiaR;
    const lipidosR = req.body.lipidosR;
    const lipidos_saturadosR = req.body.lipidos_saturadosR;
    const hidratosR = req.body.hidratosR;
    const hidratos_acucaresR = req.body.hidratos_acucaresR;
    const fibraR = req.body.fibraR;
    const proteinasR = req.body.proteinasR;
    const salR = req.body.salR;
    const eVegetariana = req.body.eVegetariana
    
    const refeicoesFields = [data, idSopa, idPratoPrincipal, idSobremesa, idHorario, idAdmin, energia, lipidos, lipidos_saturados, hidratos, hidratos_acucares,
                            fibra, proteinas, sal, energiaR, lipidosR, lipidos_saturadosR, hidratosR, hidratos_acucaresR, fibraR, proteinasR, salR, eVegetariana];

    
    if(!data || !idSopa || !idPratoPrincipal || !idSobremesa || !idHorario || !idAdmin || !energia || !lipidos || !lipidos_saturados || !hidratos || !hidratos_acucares ||
        !fibra || !proteinas || !sal || !energiaR || !lipidosR || !lipidos_saturadosR || !hidratosR || !hidratos_acucaresR || !fibraR || !proteinasR || !salR || eVegetariana ==null){
            return res.status(400).json({
                message: 'Missing fields'
            })
    }

    const queryString = 'INSERT INTO refeicao (data, idSopa, idPratoPrincipal, idSobremesa, idHorario, idAdmin, energia, lipidos, lipidos_saturados, hidratos, hidratos_acucares, \
                        fibra, proteinas, sal, energiaR, lipidosR, lipidos_saturadosR, hidratosR, hidratos_acucaresR, fibraR, proteinasR, salR,eVegetariana) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?, ?, ?, ?, ?,?,?,?)'
    pool.query(queryString, refeicoesFields, (err, results, fields) =>{
        if (err) {
            console.log("Failed to insert new refeicoes: " + err)
            return res.status(500).json({message: err})
        }

        return res.status(201).json({
            message: 'Inserted successfuly',
            createdRefeicaoID: results.insertId
        });
    })
}

exports.get_refeicaoBetweenDatas = function(req, res, next) {
    const dataInicio = req.body.dataInicio
    const dataFim = req.body.dataFim

    if(dataInicio == null || dataFim == null) return res.status(400).json({message: 'Missing fields'})

    const queryString = "SELECT R.idRefeicao, R.data, R.idSopa, SO.descricao AS sopaDescricao,\
                                R.idPratoPrincipal, P.descricao AS pratoDescricao, \
                                R.idSobremesa, S.descricao AS sobremesaDescricao, \
                                R.idHorario, R.idAdmin, H.horaInicio, H.horaFim,\
                                R.energia, R.lipidos, R.lipidos_saturados, R.hidratos,\
                                R.hidratos_acucares, R.fibra, R.proteinas, R.sal, R.energiaR,\
                                R.lipidosR, R.lipidos_saturadosR, R.hidratosR, R.hidratos_acucaresR,\
                                R.fibraR, R.proteinasR, R.salR, R.eVegetariana\
                        FROM refeicao R\
                        LEFT JOIN sobremesa S ON R.idSobremesa = S.idSobremesa\
                        LEFT JOIN horario H ON R.idHorario = H.idHorario\
                        LEFT JOIN pratoprincipal P ON R.idPratoPrincipal = P.idPratoPrincipal\
                        LEFT JOIN sopa SO ON R.idSopa = SO.idSopa\
                        WHERE R.data between ? and ? "

    pool.query(queryString, [dataInicio, dataFim], (err, rows, fields) => {
        if (err)    return res.status(500).json({message: err})
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.get_refeicaoBetweenDatasParams = function(req, res, next) {

    const dataInicio = req.params.dataInicio
    const dataFim = req.params.dataFim

    if(dataInicio == null || dataFim == null) return res.status(400).json({message: 'Missing fields'})

    const queryString = "SELECT R.idRefeicao, R.data, R.idSopa, SO.descricao AS sopaDescricao,\
                                R.idPratoPrincipal, P.descricao AS pratoDescricao, \
                                R.idSobremesa, S.descricao AS sobremesaDescricao, \
                                R.idHorario, R.idAdmin, H.horaInicio, H.horaFim,\
                                R.energia, R.lipidos, R.lipidos_saturados, R.hidratos,\
                                R.hidratos_acucares, R.fibra, R.proteinas, R.sal, R.energiaR,\
                                R.lipidosR, R.lipidos_saturadosR, R.hidratosR, R.hidratos_acucaresR,\
                                R.fibraR, R.proteinasR, R.salR, R.eVegetariana\
                        FROM refeicao R\
                        LEFT JOIN sobremesa S ON R.idSobremesa = S.idSobremesa\
                        LEFT JOIN horario H ON R.idHorario = H.idHorario\
                        LEFT JOIN pratoprincipal P ON R.idPratoPrincipal = P.idPratoPrincipal\
                        LEFT JOIN sopa SO ON R.idSopa = SO.idSopa\
                        WHERE R.data between ? and ? "

    pool.query(queryString, [dataInicio, dataFim], (err, rows, fields) => {
        if (err)    return res.status(500).json({message: err})
        return res.status(200).json(JSON.parse(JSON.stringify(rows)));
    })
}

exports.edit_refeicao = function(req, res, next) {
    console.log("edit refeicao")
    const idRefeicao = req.params.idRefeicao;
    const data = req.body.data;
    const idSopa = req.body.idSopa;
    const idPratoPrincipal = req.body.idPratoPrincipal;
    const idSobremesa = req.body.idSobremesa;
    const idHorario = req.body.idHorario;
    const idAdmin = req.body.idAdmin;
    const energia = req.body.energia;
    const lipidos = req.body.lipidos;
    const lipidos_saturados = req.body.lipidos_saturados;
    const hidratos = req.body.hidratos;
    const hidratos_acucares = req.body.hidratos_acucares;
    const fibra = req.body.fibra;
    const proteinas = req.body.proteinas;
    const sal = req.body.sal;
    const energiaR = req.body.energiaR;
    const lipidosR = req.body.lipidosR;
    const lipidos_saturadosR = req.body.lipidos_saturadosR;
    const hidratosR = req.body.hidratosR;
    const hidratos_acucaresR = req.body.hidratos_acucaresR;
    const fibraR = req.body.fibraR;
    const proteinasR = req.body.proteinasR;
    const salR = req.body.salR;
    
    const refeicoesFields = [data, idSopa, idPratoPrincipal, idSobremesa, idHorario, idAdmin, energia, lipidos, lipidos_saturados, hidratos, hidratos_acucares,
                            fibra, proteinas, sal, energiaR, lipidosR, lipidos_saturadosR, hidratosR, hidratos_acucaresR, fibraR, proteinasR, salR, idRefeicao];

    
    if(!data || !idSopa || !idPratoPrincipal || !idSobremesa || !idHorario || !idAdmin || !energia || !lipidos || !lipidos_saturados || !hidratos || !hidratos_acucares ||
        !fibra || !proteinas || !sal || !energiaR || !lipidosR || !lipidos_saturadosR || !hidratosR || !hidratos_acucaresR || !fibraR || !proteinasR || !salR){
            return res.status(400).json({
                message: 'Missing fields'
            })
    }

    const queryString = "UPDATE refeicao SET data = ?, idSopa = ?, idPratoPrincipal = ?, idSobremesa = ?,  idHorario = ?, idAdmin = ?, energia = ?, lipidos = ?, \
                                             lipidos_saturados = ?, hidratos = ?, hidratos_acucares = ?,  fibra = ?, proteinas = ?, sal = ?, energiaR = ?, \
                                             lipidosR = ?, lipidos_saturadosR = ?, hidratosR = ?, hidratos_acucaresR = ?,  fibraR = ?, proteinasR = ?, salR = ? \
                        WHERE idRefeicao = ?"
    
    pool.query(queryString, refeicoesFields, (err, results) =>{
        console.log(refeicoesFields)
        if (err) {
            console.log("Failed to update new refeicao: " + err)
            return res.status(500).json({message: err})
        }

        if(results.affectedRows == 1){
            return res.status(201).json({
                message: 'Updated successfuly'
            }); 
        }
    })


}
