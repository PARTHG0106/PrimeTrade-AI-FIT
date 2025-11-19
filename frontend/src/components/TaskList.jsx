const TaskList = ({ tasks, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 text-lg">No tasks found</p>
        <p className="text-gray-400 mt-2">Create your first task to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task._id} className="card hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {task.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              
              {task.description && (
                <p className="text-gray-600 mb-3">{task.description}</p>
              )}
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Due: {formatDate(task.dueDate)}</span>
                <span>Created: {formatDate(task.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEdit(task)}
                className="px-3 py-1 text-sm text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task._id)}
                className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
