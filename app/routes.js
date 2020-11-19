const express = require('express')
const router = express.Router()

const employeedata = require('./employeedata')

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => {

    if (req.query.departmentID) {
        let id = parseInt(req.query.departmentID)
        console.log(id)
        res.render('list-employees', { employees: await employeedata.getAllEmployeesPerDepartment(id)})
    }
    else {
        console.log('else')
        res.render('list-employees', { employees: await employeedata.getAllEmployees()})
    }
})

router.get('/filter-by-department', async (req, res) => {
    res.render('departmentfilter', {departments : await employeedata.getAllDepartments()})
})

router.post('/addnewemployee', async (req, res) => {
    
    var employee = req.body
    await employeedata.addEmployee(employee)
    res.redirect('/list-employees')
})

router.get('/gross-pay-report', async (req, res) => {
    res.render('grosspayreport', { employees: await employeedata.getEmployeeGrossPay()})
})

module.exports = router
