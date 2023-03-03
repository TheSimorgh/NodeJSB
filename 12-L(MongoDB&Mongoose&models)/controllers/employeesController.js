const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees)
      return res.status(204).json({ message: "No Employees found" });
    res.json(employees);
  } catch (error) {
    console.log(`Error getAllEmployees : ${error}`);
  }
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res
      .status(400)
      .json({ message: `First and Last name are required` });
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });

    res.status(201).json({ message: `User created successfully`, result });
  } catch (error) {
    console.log(`Error createNewEmployee : ${error}`);
  }
};

const updateEmployee = async (req, res) => {
  try {

    if (!req?.params?.id) {
      return res.status(400).json({ message: "ID parameter is required." });
    }

    const employee = await Employee.findOne({ _id: req.params.id }).exec();
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.params.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
   
     const result = await employee.save();
     res.json({ message: `User Updated Successfully`, result });
  } catch (error) {
    console.log(`Error updateEmployee : ${error}`);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "Employee ID required." });
    }

    const employee = await Employee.findByIdAndDelete({ _id: req.params.id });
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.params.id}.` });
    }
    res.json(employee);
  } catch (error) {
    console.log(`Error deleteEmployee : ${error}`);
  }
};

const getEmployee = async (req, res) => {
  try {
    // if (!req?.params?.id){  return res.status(400).json({ message: "Employee ID required." })}
    // ;
    // const employee = Employee.findOne({ _id: req.params.id }).exec();
    // if (!employee) {
    //   return res
    //     .status(204)
    //     .json({ message: `No employee matches ID ${req.params.id}.` });
    // }
    // res.json(employee);
    if (!req?.params?.id)
      return res.status(400).json({ message: "Employee ID required." });

    const employee = await Employee.findById({ _id: req.params.id }).exec();
    if (!employee) {
      return res
        .status(204)
        .json({ message: `No employee matches ID ${req.params.id}.` });
    }
    res.json(employee);
  } catch (error) {
    console.log(`Error getEmployee : ${error}`);
  }
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
// const data = {
//     employees: require('../model/data.json'),
//     setEmployees: function (data) { this.employees = data }
// }

// const getAllEmployees = (req, res) => {
//     res.json(data.employees);
// }

// const createNewEmployee = (req, res) => {
//     const newEmployee = {
//         id: data.employees?.length ? data.employees[data.employees.length - 1].id  + 1 : 1,
//         firstname: req.body.firstname,
//         lastname: req.body.lastname
//     }

//     if (!newEmployee.firstname || !newEmployee.lastname) {
//         return res.status(400).json({ 'message': 'First and last names are required.' });
//     }

//     data.setEmployees([...data.employees, newEmployee]);
//     res.status(201).json(data.employees);
// }

// const updateEmployee = (req, res) => {
//     const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
//     if (!employee) {
//         return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
//     }
//     if (req.body.firstname) employee.firstname = req.body.firstname;
//     if (req.body.lastname) employee.lastname = req.body.lastname;
//     const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
//     const unsortedArray = [...filteredArray, employee];
//     data.setEmployees(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
//     res.json(data.employees);
// }

// const deleteEmployee = (req, res) => {
//     const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
//     if (!employee) {
//         return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
//     }
//     const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
//     data.setEmployees([...filteredArray]);
//     res.json(data.employees);
// }

// const getEmployee = (req, res) => {
//     const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
//     if (!employee) {
//         return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
//     }
//     res.json(employee);
// }

// module.exports = {
//     getAllEmployees,
//     createNewEmployee,
//     updateEmployee,
//     deleteEmployee,
//     getEmployee
// }
