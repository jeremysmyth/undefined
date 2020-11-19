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
    return await db.query (
        "SELECT Employee.EmployeeID, Employee.Name, Employee.Address, Employee.PostCode, Employee.NI, Employee.IBAN, Employee.BIC, Employee.Salary, Employee.EmployeeNumber, Department.DepartmentName" +
        " FROM Employee, Department " +
        " WHERE Employee.DepartmentID = Department.DepartmentID;"
    )
}

getEmployeesByDepartment = async (departmentId) => {
    return await db.query ( 
        "SELECT Employee.EmployeeID, Employee.Name, Employee.Address, Employee.PostCode," + 
        " Employee.NI, Employee.IBAN, Employee.BIC, Employee.Salary, Employee.EmployeeNumber, Department.DepartmentName" +
        " FROM Employee, Department" + 
        " WHERE Employee.DepartmentID = ?" +
        " AND Department.DepartmentID = Employee.DepartmentID;",
        [departmentId]
    )
}

getEmployeesSalesDepartment = async () => {
    return await db.query (
        "SELECT Employee.EmployeeID, Employee.Name, Employee.Address, Employee.PostCode, Employee.NI, Employee.IBAN, Employee.BIC," +
        " Employee.Salary, Employee.EmployeeNumber, Department.DepartmentName, SalesEmployee.CommissionRate, SalesEmployee.TotalSales" +
        " FROM Employee, Department, SalesEmployee" + 
        " WHERE Employee.DepartmentID = 4" +
        " AND Department.DepartmentID = Employee.DepartmentID" +
        " AND SalesEmployee.EmployeeID = Employee.EmployeeID;",
    )
}

getDepartments = async () => {
    return await db.query (
        "SELECT * FROM Department"
    )
}

getGrossPayReport = async () => {
    return await db.query (
        "SELECT Name, ROUND((Salary / 12) * 0.75, 2) as GrossPay" + 
        " FROM Employee" + 
        " LEFT JOIN SalesEmployee USING (EmployeeID)" + 
        " WHERE SalesEmployee.EmployeeID IS NULL" +
        " UNION" +
        " SELECT Name, ROUND((Salary / 12 + CommissionRate *  TotalSales) * 0.75, 2) as GrossPay" +
        " FROM Employee" + 
        " INNER JOIN SalesEmployee USING (EmployeeID);"
    )
}

getHighestSalesReport = async () => {
    return await db.query (
        "SELECT Employee.Name, SalesEmployee.TotalSales" + 
        " FROM Employee, SalesEmployee" + 
        " WHERE Employee.EmployeeID = SalesEmployee.EmployeeID" + 
        " ORDER BY SalesEmployee.TotalSales DESC" +
        " LIMIT 1;"
    )
}

exports.getAllEmployees = async () => {
    return await getEmployees()
}

exports.addEmployee = async (newEmployee) => {
    let results = await db.query('INSERT INTO Employee SET ?', newEmployee)
    return results.insertId;
}
exports.addSalesEmployee = async (salesEmployee) => {
    let results = await db.query('INSERT INTO SalesEmployee SET ?', salesEmployee)
    return results.insertId;
}
exports.getAllEmployeesPerDepartment = async (departmentId) => {
    return await getEmployeesByDepartment (departmentId)
}
exports.getAllDepartments = async () => {
    return await getDepartments()
}


exports.getAllSalesEmployees = async () => {
    return await getEmployeesSalesDepartment()
}

exports.getEmployeeGrossPay = async () => {
    return await getGrossPayReport ()
}

exports.getHighestSalesEmployee = async () => {
    return await getHighestSalesReport()
}