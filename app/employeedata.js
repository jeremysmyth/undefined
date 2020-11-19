const mysql = require('mysql')
const dbconfig = require('./dbconfig.json')
const util = require('util')

let wrapDB = (dbconfig) => {
    const pool = mysql.createPool(dbconfig)
    return {
        query (sql, args) {
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
    return await db.query (
        "SELECT Employee.EmployeeID, Employee.Name, Employee.Address, Employee.PostCode, Employee.NI, Employee.IBAN, Employee.BIC, Employee.Salary, Employee.EmployeeNumber, Department.DepartmentName" +
        " FROM Employee, Department " +
        " WHERE Employee.DepartmentID = Department.DepartmentID;"
    )
}

getEmployeesByDepartment = async (departmentId) => {
    return await db.query (
        "SELECT Employee.EmployeeID, Employee.Name, Employee.Address, Employee.PostCode, Employee.NI, Employee.IBAN, Employee.BIC, Employee.Salary, Employee.EmployeeNumber, Department.DepartmentName" +
        " FROM Employee, Department" + 
        " WHERE Employee.DepartmentID = ?" +
        " AND Department.DepartmentID = Employee.DepartmentID;",
        [departmentId]
    )
}

exports.getAllEmployees = async () => {
    return await getEmployees()
}

exports.getAllEmployeesPerDepartment = async (departmentId) => {
    return await getEmployeesByDepartment (departmentId)
}