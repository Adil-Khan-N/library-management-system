const Member = require('../models/Member');

const getProfile = async (req, res) => {
  try {
    const member = await Member.findByPk(req.user.member_id);
    if (!member) {
      return res.status(404).send();
    }
    res.send(member);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = { getProfile };