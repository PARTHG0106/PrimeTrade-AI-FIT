import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import api from '../utils/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: ''
  });

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;

      const response = await api.get('/tasks', { params });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      setTasks(prev => [response.data.task, ...prev]);
      setShowForm(false);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const response = await api.put(`/tasks/${editingTask._id}`, taskData);
      setTasks(prev => prev.map(task => 
        task._id === editingTask._id ? response.data.task : task
      ));
      setEditingTask(null);
      setShowForm(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="btn btn-primary"
            >
              {showForm ? 'Cancel' : '+ New Task'}
            </button>
          </div>

          {showForm && (
            <div className="mb-6">
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={handleCancelForm}
              />
            </div>
          )}

          <div className="card mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search tasks..."
                  className="input"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="input"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={filters.priority}
                  onChange={handleFilterChange}
                  className="input"
                >
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
