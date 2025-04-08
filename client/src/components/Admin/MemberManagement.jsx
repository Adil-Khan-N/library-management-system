import { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import AuthContext from '../../contexts/AuthContext';
import '../../styles/admin.css';

const MemberManagement = () => {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.get('/api/admin/members');
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    if (user?.role === 'admin') {
      fetchMembers();
    }
  }, [user]);

  const handleCreateMember = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/admin/members', { name, email });
      setMembers([...members, response.data.member]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

  const handleDeleteMember = async (memberId) => {
    try {
      await api.delete(`/api/admin/members/${memberId}`);
      setMembers(members.filter(member => member.member_id !== memberId));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  if (user?.role !== 'admin') {
    return <div>Access denied. Admin privileges required.</div>;
  }

  return (
    <div className="admin-container">
      <h2>Member Management</h2>
      
      <div className="create-member-form">
        <h3>Create New Member</h3>
        <form onSubmit={handleCreateMember}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-button">Create Member</button>
        </form>
      </div>

      <div className="members-list">
        <h3>Existing Members</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.member_id}>
                <td>{member.member_id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>
                  <button 
                    onClick={() => handleDeleteMember(member.member_id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberManagement;