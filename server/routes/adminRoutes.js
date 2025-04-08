const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const roleCheck = require('../middlewares/roleCheck');
const { createMember, deleteMember, getAllMembers } = require('../controllers/adminController');

router.use(auth);
router.use(roleCheck('admin'));

router.post('/members', createMember);
router.delete('/members/:memberId', deleteMember);
router.get('/members', getAllMembers);

module.exports = router;