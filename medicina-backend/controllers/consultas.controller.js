const { MDB } = require('../configs/databases');

const API_PATH = '/api-medicina';

const consultasCtrl = {};

consultasCtrl.getConsultas = async (req, res, next) => {
    let qry = "SELECT * FROM test";
    MDB.executenonquery(qry, null, 
        function(result) {
            if (result !== null || result !== undefined) {
                res.status(200).send(JSON.parse(JSON.stringify(result)));
                res.end();
            } else {
                
            }
        }
    );
}

consultasCtrl.getConsultas = async (req, res, next) => {
    let qry = "SELECT * FROM consultas";
    MDB.executenonquery(qry, null, 
        function(result) {
            if (result !== null || result !== undefined) {
                res.status(200).send(JSON.parse(JSON.stringify(result)));
                res.end();
            } else {
                
            }
        }
    );
}

module.exports = consultasCtrl;