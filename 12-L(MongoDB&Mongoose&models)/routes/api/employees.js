const express = require('express');
const router = express.Router();
const {getAllEmployees,createNewEmployee,updateEmployee,deleteEmployee,getEmployee} = require('../../controllers/employeesController');
const verifyJWT = require('../../middleware/verifyJWT');
const employeesController = require('../../controllers/employeesController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');
router.route('/')
    // .get(getAllEmployees)
    .get(employeesController.getAllEmployees)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.createNewEmployee)
    // .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    // .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);


router.route('/:id')
    .get(employeesController.getEmployee)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeesController.updateEmployee)
    .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);


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