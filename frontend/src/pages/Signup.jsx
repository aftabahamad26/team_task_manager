import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/api';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signup(name, email, password, role);
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" required />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2 rounded">
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Signup</button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
