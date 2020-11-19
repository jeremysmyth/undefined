const express = require('express')
const router = express.Router()

const employeedata = require('./employeedata')

// Add your routes here - above the module.exports line
router.get('/list-employees', async (req, res) => {
    res.render('list-employees', { employees: await employeedata.getEmployeesByDepartment()})
})

module.exports = router
