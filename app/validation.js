exports.validateEmployee = (employee) => {
    if (employee.EmployeeNumber.length > 8 || employee.EmployeeNumber == '') {
        return { valid: false, ErrorMessage: 'Please input a valid Employee Number.' }
    } else if (employee.Name.length > 100 || employee.Name == '') {
        return { valid: false, ErrorMessage: 'Please input a name.' }
    } else if (employee.Address.length > 200 || employee.Address == '') {
        return { valid: false, ErrorMessage: 'Please input a valid address.' }
    } else if (employee.PostCode.length > 8 || employee.Address == '') {
        return { valid: false, ErrorMessage: 'Please input a valid post code.' }
    } else if (employee.NI == '') {
        return { valid: false, ErrorMessage: 'Please input a National Insurance Number.' }
    } else if (employee.IBAN.length > 34 || employee.IBAN == '') {
        return { valid: false, ErrorMessage: 'Please input a valid IBAN.' }
    } else if (employee.BIC.length > 11 || employee.BIC == '') {
        return { valid: false, ErrorMessage: 'Please input a valid BIC.' }
    } else if (employee.Salary < 7000 || employee.Salary == '') {
        return { valid: false, ErrorMessage: 'The salary should be greater than £7,000.' }
    } else {
        return { valid: true, employee }
    }
}

exports.validateSales = (salesEmployee) => {
    if (salesEmployee.EmployeeID.length > 8 || salesEmployee.EmployeeID == '') {
        return { valid: false, ErrorMessage: 'Please input a valid Employee Number.' }
    } else if (salesEmployee.CommissionRate == '') {
        return { valid: false, ErrorMessage: 'Please input a valid Commission Rate.' }
    } else if (salesEmployee.TotalSales == '') {
        return { valid: false, ErrorMessage: 'Please input a value for Total Sales.' }
    } else {
        return { valid: true, salesEmployee }
    }
}