const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Member = require('../models/Member');

const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    // Create member first
    const member = await Member.create({ name, email });
    
    // Create user with default credentials
    const user = await User.create({
      userid: email,
      password,
      member_id: member.member_id,
      role: 'member'
    });

    const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET || 'librarysecret');
    user.session = token;
    await user.save();

    res.status(201).send({ user, member, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { userid: email } });
    if (!user) {
      throw new Error('Invalid login credentials');
    }

    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = jwt.sign({ userid: user.userid }, process.env.JWT_SECRET || 'librarysecret');
    user.session = token;
    await user.save();

    const member = await Member.findByPk(user.member_id);

    res.send({ user, member, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

const logout = async (req, res) => {
  try {
    req.user.session = null;
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = { register, login, logout };