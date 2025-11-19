import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio cannot exceed 500 characters';
    }
    
    if (formData.avatar && formData.avatar.trim() !== '' && !isValidUrl(formData.avatar)) {
      newErrors.avatar = 'Please enter a valid URL';
    }
    
    return newErrors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const response = await api.put('/users/profile', formData);
      updateUser(response.data.user);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
        
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                Profile updated successfully!
              </div>
            )}
            
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                disabled
                className="mt-1 input bg-gray-100 cursor-not-allowed"
              />
              <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 input ${errors.name ? 'border-red-500' : ''}`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className={`mt-1 input ${errors.bio ? 'border-red-500' : ''}`}
                placeholder="Tell us about yourself..."
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.bio.length}/500 characters
              </p>
              {errors.bio && (
                <p className="mt-1 text-sm text-red-600">{errors.bio}</p>
              )}
            </div>

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar URL
              </label>
              <input
                id="avatar"
                name="avatar"
                type="text"
                value={formData.avatar}
                onChange={handleChange}
                className={`mt-1 input ${errors.avatar ? 'border-red-500' : ''}`}
                placeholder="https://example.com/avatar.jpg"
              />
              {errors.avatar && (
                <p className="mt-1 text-sm text-red-600">{errors.avatar}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setFormData({
                  name: user?.name || '',
                  bio: user?.bio || '',
                  avatar: user?.avatar || ''
                })}
                className="btn btn-secondary"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
