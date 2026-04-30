import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, getTasksByProject, createTask } from '../services/api';
import { Users, Plus, Calendar, User, Info } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const { data: projectData } = await getProjectById(id);
      const { data: tasksData } = await getTasksByProject(id);
      console.log('Project Tasks Debug:', tasksData);
      setProject(projectData);
      setTasks(tasksData);
    } catch (error) {
      alert('Failed to fetch project details');
      console.error(error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, description, dueDate, project: id, assignedTo });
      setTitle('');
      setDescription('');
      setDueDate('');
      setAssignedTo('');
      setShowAddForm(false);
      fetchData();
    } catch (error) {
      alert('Failed to create task');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Done': 'bg-green-100 text-green-800 border-green-200',
      'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-[10px] font-semibold border ${colors[status]}`}>
        {status}
      </span>
    );
  };

  if (!project) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Project Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Info size={120} />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{project.name}</h1>
          <p className="text-gray-500 max-w-2xl">{project.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Project Tasks</h2>
            {(userInfo.role === 'admin' || userInfo.role === 'Admin') && (
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm font-semibold shadow-md shadow-indigo-100"
              >
                <Plus size={18} />
                {showAddForm ? 'Cancel' : 'New Task'}
              </button>
            )}
          </div>

          {/* Add Task Form */}
          {showAddForm && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300">
              <h2 className="text-lg font-bold mb-4 text-indigo-900">Create New Task</h2>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Task Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required placeholder="Enter task title" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Due Date</label>
                    <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Assign To</label>
                    <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" required>
                      <option value="">Select Member</option>
                      {project.members.map(member => (
                        <option key={member._id} value={member._id}>{member.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Task details..." />
                  </div>
                </div>
                <button type="submit" className="w-full md:w-fit bg-indigo-600 text-white py-2.5 px-10 rounded-lg hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100">
                  Assign Task
                </button>
              </form>
            </div>
          )}

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-500">
                No tasks found for this project.
              </div>
            ) : (
              tasks.map(task => (
                <div key={task._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
                    {getStatusBadge(task.status)}
                  </div>
                  <p className="text-sm text-gray-500 mb-6 line-clamp-2">{task.description || 'No description provided.'}</p>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm uppercase">
                          {(task.assignedTo?.name || "U").charAt(0)}
                        </div>
                        <span className="text-gray-600 font-medium">To: {task.assignedTo?.name || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                          {(task.assignedBy?.name || "Admin").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-700 font-medium">By: {task.assignedBy?.name || "Admin"}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-medium uppercase tracking-wider">
                      <Calendar size={12} />
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar: Team Members */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-indigo-600" size={20} />
            <h2 className="text-xl font-bold text-gray-800">Project Team</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-50">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {project.admin.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">{project.admin.name}</p>
                <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-tighter">Project Admin</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Members</p>
              {project.members.map(member => (
                <div key={member._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{member.name}</p>
                    <p className="text-[10px] text-gray-400">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
