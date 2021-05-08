const mariadb = require('mariadb');

const HOST = "bcjkat46xuevrlrkj1lf-mysql.services.clever-cloud.com";
const USERNAME = "uydppfro53w5mi1s";
const PASSWORD = "LbI5udi7XBEVhRD08YEf";
const DATABASENAME = "bcjkat46xuevrlrkj1lf";

/**
 * Clase MDB para realizar consultas sobre la base de datos 
 * de MariaDB.
 * Author: Ariel Alejandro Wanger
 * Sector: Gobierno de la Ciudad de Buenos Aires.
 */
class MDB {
    constructor() {}
    /**
     * Ejecuta una consulta de tipo de Cambios o Dinámicas. Hace uso de Transacciones. 
     * Puede disponer del uso de parámetros. Cuando no se utilizan los parámetros se 
     * debe añadir la palabra clave null o también undefined. 
     * @param {*} query Consulta en lenguajes SQL.
     * @param {*} params Parámetros para la consulta. En la cadena de SQL se usa el 
     * caracter ? para asignar el parámetro y luego el órden de los parámetros de 
     * paso. 
     * Por ejemplo: consulta SQL query = "UPDATE FROM clientes SET campo = 'valor' id = ?" 
     * y en la variable de paso params = [1] (El uno es un valor no índice).
     * @param {*} result Retorna el ResultSet de la consulta.
     */
    static executequery(query, params, result) {          
        mariadb.createConnection({
            host: HOST, 
            user: USERNAME, 
            password: PASSWORD, 
            database: DATABASENAME
        }).then(conn => {
            conn.beginTransaction()
            .then(() => {
                if (params === null || params === undefined) {
                    conn.query(query)
                    .then((rows) => {
                        result(rows);
                    });                
                } else {
                    conn.query(query, params)
                    .then((rows) => {
                        result(rows);
                    });
                }          
            })
            .then(() => {
                conn.commit();
            })
            .catch(() => {
                conn.rollback();
                result(null);
            })
        }).catch(() => {
            result(null);
        }); 
    };

    /**
     * Ejecuta una consulta de tipo Estática o de Cambios. Para los cambios no 
     * existen Transacciones para supervisar los procesos. No recomendado para 
     * consultas de cambio. 
     * Puede disponer del uso de parámetros. Cuando no se utilizan los parámetros 
     * se debe añadir la palabra clave null o también undefined. 
     * @param {*} query Consulta en lenguajes SQL.
     * @param {*} params Parámetros para la consulta. En la cadena de SQL se usa el 
     * caracter ? para asignar el parámetro y luego el órden de los parámetros de 
     * paso. Por ejemplo: consulta SQL query = "SELECT * FROM clientes WHERE id = ?" y en 
     * la variable de paso params = [1] (El uno es un valor no índice).
     * @param {*} result Retorna el ResultSet de la consulta.
     */
    static executenonquery(query, params, result) {
        mariadb.createConnection({
            host: HOST, 
            user: USERNAME, 
            password: PASSWORD, 
            database: DATABASENAME
        }).then(conn => { 
            if (params === null || params === undefined) {
                conn.query(
                    query
                ).then(rows => {
                    result(rows);
                    conn.end();
                }).catch(error => {
                    result(null);
                });
            } else {
                conn.query(
                    query, params
                ).then(rows => {
                    result(rows);
                    conn.end();
                }).catch(error => {
                    result(null);
                });
            }
        })
        .catch(error => {
            result(null);
        });
    };
}
// Exportar la clase para su consumo.
module.exports = {
    MDB
}