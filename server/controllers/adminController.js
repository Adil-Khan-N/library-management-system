const Member = require('../models/Member');
const User = require('../models/User');

const createMember = async (req, res) => {
  const { name, email } = req.body;
  
  try {
    // Create member
    const member = await Member.create({ name, email });
    
    // Create user with default credentials (email as password)
    const user = await User.create({
      userid: email,
      password: email, // Default password same as email
      member_id: member.member_id,
      role: 'member'
    });

    res.status(201).send({ member, user });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const deleteMember = async (req, res) => {
  const { memberId } = req.params;

  try {
    // Check if member is associated with any groups (simplified for this example)
    // In a real implementation, you would check the members_group_mapping table
    
    // Delete user first
    await User.destroy({ where: { member_id: memberId } });
    
    // Then delete member
    await Member.destroy({ where: { member_id: memberId } });

    res.send({ message: 'Member deleted successfully' });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.send(members);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = { createMember, deleteMember, getAllMembers };