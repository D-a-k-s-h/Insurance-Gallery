const express = require('express');
const { createPolicy, updatePolicy } = require('../Controllers/Policy');
const { auth } = require('../Middlewares/middlewares');
const { deleteUser, createAndUpdateUser } = require('../Controllers/User');
const { createAndUpdateCompanies, deleteCompany } = require('../Controllers/Company');
const { createAndUpdateMake, deleteMake } = require('../Controllers/Make');
const { createAndUpdateModals, deleteModal } = require('../Controllers/Modal');
const router = express.Router();

//Creation
router.post('/create-policy',auth,createPolicy);
router.post('/update-policy',auth,updatePolicy);
router.post('/create-agent',auth,createAndUpdateUser);
router.post('/create-update-company',auth,createAndUpdateCompanies);
router.post('/create-update-make',auth,createAndUpdateMake);
router.post('/create-update-modal',auth,createAndUpdateModals);

//Deletion
router.post('/delete-user',auth,deleteUser);
router.post('/delete-company',auth,deleteCompany);
router.post('/delete-make',auth,deleteMake);
router.post('/delete-modal',auth,deleteModal);

module.exports = router;