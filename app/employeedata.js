const mysql = require('mysql')
const dbconfig = require('./dbconfig.json')
const util = require('util')

let wrapDB = (dbconfig) => {
    const pool = mysql.createPool(dbconfig)
    return {
        query(sql, args) {
            console.log("Query attempted")
            return util.promisify(pool.query)
                .call(pool, sql, args)
        },
        release() {
            return util.promisify(pool.releaseConnection)
                .call(pool)
        }
    }
}

const db = wrapDB(dbconfig)

// Function to get the employee data
// which will be called from the router when reading the list-employees template
getEmployees = async () => {
    return await db.query(
        "SELECT *" +
        " FROM Employee;"
    )
}

exports.getEmployeesByDepartment = async () => {
    return await getEmployees()
}

exports.addEmployee = async (newEmployee) => {
    let results = await db.query('INSERT INTO Employee SET ?', newEmployee)
    return results.insertId;
}