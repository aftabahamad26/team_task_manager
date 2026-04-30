import { useEffect, useState } from 'react';
import { getStats, getMyTasks, updateTaskStatus, getAdminSummary } from '../services/api';
import { CheckCircle, Clock, AlertCircle, Users, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [tasks, setTasks] = useState([]);
  const [adminSummary, setAdminSummary] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    fetchData();
    if (userInfo.role === 'admin' || userInfo.role === 'Admin') {
      fetchAdminSummary();
    }
  }, []);

  const fetchData = async () => {
    try {
      const { data: statsData } = await getStats();
      const { data: tasksData } = await getMyTasks();
      console.log('Dashboard Tasks Debug:', tasksData);
      setStats(statsData);
      setTasks(tasksData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAdminSummary = async () => {
    try {
      const { data } = await getAdminSummary();
      setAdminSummary(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    console.log('Updating task:', taskId, 'to', newStatus);
    try {
      await updateTaskStatus(taskId, newStatus);
      fetchData();
      if (userInfo.role === 'admin' || userInfo.role === 'Admin') fetchAdminSummary();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Done': 'bg-green-100 text-green-800 border-green-200',
      'In Progress': 'bg-blue-100 text-blue-800 border-blue-200',
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome, {userInfo.name}</h1>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
          {userInfo.role}
        </span>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <BarChart2 size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalTasks || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Pending</p>
            <p className="text-2xl font-bold text-gray-800">{stats.pendingTasks || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-orange-50 rounded-lg text-orange-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">In Progress</p>
            <p className="text-2xl font-bold text-gray-800">{stats.inProgressTasks || 0}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-lg text-green-600">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Completed</p>
            <p className="text-2xl font-bold text-gray-800">{stats.completedTasks || 0}</p>
          </div>
        </div>
      </div>

      {/* Admin Analytics Section */}
      {(userInfo.role === 'admin' || userInfo.role === 'Admin') && adminSummary.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-800">Team Performance Analytics</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">Member</th>
                  <th className="px-6 py-4">Assigned By</th>
                  <th className="px-6 py-4 text-center">Total</th>
                  <th className="px-6 py-4 text-center text-green-600">Done</th>
                  <th className="px-6 py-4 text-center text-blue-600">Progress</th>
                  <th className="px-6 py-4 text-center text-yellow-600">Pending</th>
                  <th className="px-6 py-4 text-center font-bold">Remaining</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {adminSummary.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-700">{item.memberName}</td>
                    <td className="px-6 py-4 text-gray-500">{item.assignedBy}</td>
                    <td className="px-6 py-4 text-center">{item.totalTasks}</td>
                    <td className="px-6 py-4 text-center">{item.completed}</td>
                    <td className="px-6 py-4 text-center">{item.inProgress}</td>
                    <td className="px-6 py-4 text-center">{item.pending}</td>
                    <td className="px-6 py-4 text-center font-bold text-indigo-600">{item.remaining}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* My Assigned Tasks Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800">My Assigned Tasks</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Task</th>
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Assigned By</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No tasks assigned yet.</td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-700">{task.title}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{task.project?.name}</td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          {(task.assignedTo?.name || "U").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {task.assignedTo?.name || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          {(task.assignedBy?.name || "Admin").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {task.assignedBy?.name || "Admin"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(task.status)}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={task.status} 
                        onChange={(e) => handleStatusChange(task._id, e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 transition-all"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

