const express = require('express');
const router = express.Router();
const {getAllEmployees,createNewEmployee,updateEmployee,deleteEmployee,getEmployee} = require('../../controllers/employeesController');

router.route('/')
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee);

router.route('/:id')
    .get(getEmployee)
 

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const data = {};
// data.employees = require("../../model/data.json");

// router.route('/')
//     .get((req, res) => {
//         res.json(data.employees);
//     })
//     .post((req, res) => {
//         res.json({
//             "firstname": req.body.firstname,
//             "lastname": req.body.lastname
//         });
//     })
//     .put((req, res) => {
//         res.json({
//             "firstname": req.body.firstname,
//             "lastname": req.body.lastname
//         });
//     })
//     .delete((req, res) => {
//         res.json({ "id": req.body.id })
//     });

// router.route('/:id')
//     .get((req, res) => {
//         res.json({ "id": req.params.id });
//     });

// module.exports = router;