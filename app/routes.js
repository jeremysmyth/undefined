const express = require('express')
const router = express.Router()

const employeedata = require('./employeedata')

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => {
    res.render('list-employees', { employees: await employeedata.getEmployeesByDepartment()})
})

router.post('/addnewemployee', async (req, res) => {
    
    var employee = req.body
    await employeedata.addEmployee(employee)
    res.redirect('/list-employees')
})

module.exports = router
