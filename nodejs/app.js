const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const bcrypt = require('bcrypt-nodejs')
//const saltRounds = 10;
//module.exports.bcrypt = bcrypt;


  /* Routes */
const acompanhamentosRoutes = require('./api/routes/acompanhamentos');
const adminsRoutes = require('./api/routes/admins');
const avaliacoesRoutes = require('./api/routes/avaliacoes');
const avisosRoutes = require('./api/routes/avisos');
const cantinasRoutes = require('./api/routes/cantinas');
const consumidoresRoutes = require('./api/routes/consumidores');
const funcionariosRoutes = require('./api/routes/funcionarios');
const horariosRoutes = require('./api/routes/horarios');
const pratosprincipaisRoutes = require('./api/routes/pratosprincipais');
const refeicoesRoutes = require('./api/routes/refeicoes');
const senhasconsumidoresRoutes = require('./api/routes/senhasconsumidores');
const sobremesasRoutes = require('./api/routes/sobremesas');
const sopasRoutes = require('./api/routes/sopas');
const tiposenhasRoutes = require('./api/routes/tiposenhas');
const acompanhamentorefeicaoRoutes = require('./api/routes/acompanhamentorefeicao');

/* Midlewares */

/* Logging in console */
app.use(morgan('dev'));

/* Body Parser -> Ajuda a fazer parsing à informação dos pedidos */
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());

/* Handling Cors -> Assegura que prevenimos erros CORS (Mecanismos de segurança dos browsers) */
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/* Reencaminhas os pedidos para estes ficheiros */
app.use('/acompanhamentos', acompanhamentosRoutes);
app.use('/admins', adminsRoutes);
app.use('/avaliacoes', avaliacoesRoutes);
app.use('/avisos', avisosRoutes);
app.use('/cantinas', cantinasRoutes);
app.use('/consumidores', consumidoresRoutes);
app.use('/funcionarios', funcionariosRoutes);
app.use('/horarios', horariosRoutes);
app.use('/pratosprincipais', pratosprincipaisRoutes);
app.use('/refeicoes', refeicoesRoutes);
app.use('/senhasconsumidores', senhasconsumidoresRoutes);
app.use('/sobremesas', sobremesasRoutes);
app.use('/sopas', sopasRoutes);
app.use('/tiposenhas', tiposenhasRoutes);
app.use('/acompanhamentorefeicao', acompanhamentorefeicaoRoutes);

/* Errors */
app.use( (req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
      res.status(error.status || 500);
      /*res.json({
            error: {
                message: error.message
            }
      });*/
});

/* Exports */
module.exports = app;