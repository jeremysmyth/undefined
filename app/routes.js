const express = require('express')
const router = express.Router()

const employeedata = require('./employeedata')
const validation = require('./validation')

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => {
    res.render('list-employees', { employees: await employeedata.getEmployeesByDepartment() })
})

router.post('/addnewemployee', async (req, res) => {
    var newEmployee = req.body
    const validEmployee = validation.validateEmployee(newEmployee)
    if (validEmployee.valid) {
        await employeedata.addEmployee(validEmployee)
        res.redirect('/list-employees')
    }
    else {
        res.locals.errormessage = validEmployee.ErrorMessage
        res.render('addnewemployee', req.body)
    }
})

module.exports = router
