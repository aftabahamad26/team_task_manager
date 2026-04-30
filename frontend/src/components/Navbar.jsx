import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Team Task Manager</Link>
      <div className="flex gap-4 items-center">
        {userInfo ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {(userInfo.role === 'admin' || userInfo.role === 'Admin') && <Link to="/projects">Projects</Link>}
            <span className="font-semibold">{userInfo.name} ({userInfo.role})</span>
            <button onClick={logoutHandler} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
