const express = require('express');
const { searchPolicy, getAgents, getCaseTypes, getMakes, getRmNames, getPolicyInfo } = require('../Controllers/Policy');
const { getCompany } = require('../Controllers/Company');
const { auth } = require('../Middlewares/middlewares');
const { getUserInfo } = require('../Controllers/User');
const { getModals } = require('../Controllers/Modal');
const router = express.Router();

router.post('/search-policy',auth,searchPolicy);
router.get('/get-agents',auth,getAgents);
router.get('/get-companies',auth,getCompany);
//router.get('/get-case-types',auth,getCaseTypes);
router.get('/get-makes',auth,getMakes);
router.get('/get-rmnames',auth,getRmNames);
router.post('/get-user-info',auth,getUserInfo);
router.get('/get-modals',auth,getModals);
router.post('/get-policy-info',auth,getPolicyInfo);

module.exports = router;