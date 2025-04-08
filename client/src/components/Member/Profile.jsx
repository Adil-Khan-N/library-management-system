import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import api from '../../services/api';
import '../../styles/member.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/member/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="profile-container">
      <h2>Member Profile</h2>
      <div className="profile-details">
        <div className="detail-row">
          <span className="detail-label">Member ID:</span>
          <span className="detail-value">{profile.member_id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Name:</span>
          <span className="detail-value">{profile.name}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{profile.email}</span>
        </div>
        {/* Add more profile details as needed */}
      </div>
    </div>
  );
};

export default Profile;