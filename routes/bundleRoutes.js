const express = require('express');
const router = express.Router();
const { purchaseBundle, getBundles } = require('../controllers/bundleController');

router.get('/', getBundles);
router.post('/purchase', purchaseBundle);

module.exports = router;