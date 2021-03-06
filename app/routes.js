const express = require('express')
const router = express.Router()

const employeedata = require('./employeedata')
const validation = require('./validation')

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => {
    if (req.query.departmentID && req.query.departmentID != 4) {
        let id = parseInt(req.query.departmentID)
        console.log(id)
        res.render('list-employees', { employees: await employeedata.getAllEmployeesPerDepartment(id) })
    }
    else if(req.query.departmentID && req.query.departmentID == 4) {
        let id = parseInt(req.query.departmentID)
        console.log(id)
        res.render('list-sales-employees', { employees: await employeedata.getAllSalesEmployees()})
    }
    else {
        res.render('list-employees', { employees: await employeedata.getAllEmployees()})

    }
})

router.get('/filter-by-department', async (req, res) => {
    res.render('departmentfilter', { departments: await employeedata.getAllDepartments() })
})

router.post('/addnewemployee', async (req, res) => {
    var newEmployee = req.body
    const validEmployee = validation.validateEmployee(newEmployee)
    if (validEmployee.valid) {
        await employeedata.addEmployee(validEmployee.employee)
        res.redirect('/list-employees')
    }
    else {
        res.locals.errormessage = validEmployee.ErrorMessage
        res.render('addnewemployee', req.body)
    }
})

router.get('/gross-pay-report', async (req, res) => {
    res.render('grosspayreport', { employees: await employeedata.getEmployeeGrossPay() })
})

router.get('/highest-sales-report', async (req, res) => {
    let employee = await employeedata.getHighestSalesEmployee()
    console.log(employee[0].Name)
    console.log(employee[0].TotalSales)
    res.render('highestsalesreport', { employee: employee[0] })
})

router.post('/addsalesemployee', async (req, res) => {
    var salesEmployee = req.body
    const validSales = validation.validateSales(salesEmployee)
    if (validSales.valid) {
        await employeedata.addSalesEmployee(validSales.salesEmployee)
        res.redirect('/list-employees')
    }
    else {
        res.locals.errormessage = validSales.ErrorMessage
        res.render('addsalesemployee', req.body)
    }
})

router.get('/addnewproject', async (req, res) => {
    res.render('addproject')
})

router.post('/addnewproject', async (req, res) => {
    let project = req.body
    await employeedata.addProject(project)
    res.redirect('/') 
})

router.get('/employeeproject', async (req, res) => {
    res.render('employeeproject', { employees: await employeedata.getProjectEmployees()})
})

module.exports = router
