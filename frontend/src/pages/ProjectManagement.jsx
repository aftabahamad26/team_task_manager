import { useEffect, useState } from 'react';
import { getProjects, createProject, getUsers } from '../services/api';
import { Link } from 'react-router-dom';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: projectsData } = await getProjects();
      const { data: usersData } = await getUsers();
      setProjects(projectsData);
      setUsers(usersData);
    } catch (error) {
      alert('Failed to fetch projects or users');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await createProject({ name, description, members: selectedMembers });
      setName('');
      setDescription('');
      setSelectedMembers([]);
      fetchData();
    } catch (error) {
      alert('Failed to create project');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Project Management</h1>
      
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Project Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-semibold text-gray-700">Assign Members</label>
            <div className="flex flex-wrap gap-3">
              {users.map(user => (
                <label 
                  key={user._id} 
                  className={`flex items-center gap-3 p-3 rounded-lg text-sm cursor-pointer transition-all border ${
                    (user.role === 'admin' || user.role === 'Admin') 
                      ? 'bg-blue-100 text-blue-700 border-blue-400' 
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    value={user._id} 
                    checked={selectedMembers.includes(user._id)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedMembers([...selectedMembers, user._id]);
                      else setSelectedMembers(selectedMembers.filter(id => id !== user._id));
                    }}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase ${
                      (user.role === 'admin' || user.role === 'Admin') ? 'bg-blue-200 text-blue-800' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">{user.name}</span>
                      <span className={`text-[10px] w-fit px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        (user.role === 'admin' || user.role === 'Admin') ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-fit px-8">Create Project</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project._id} className="bg-white p-6 rounded shadow border-t-4 border-blue-600">
            <h3 className="text-xl font-bold mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-4 h-12 overflow-hidden">{project.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{project.members.length} Members</span>
              <Link to={`/projects/${project._id}`} className="text-blue-600 font-semibold">View Details →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
