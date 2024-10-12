import React from 'react';
import PropTypes from 'prop-types'; 

function ProjectCard({ project, onUpdate, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:scale-105 transform fade-in max-w-sm mx-auto mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3">{project.name}</h3>
      <p className="text-sm text-gray-600 mb-2">
        <span className="font-semibold">Due Date: </span>{project.dueDate}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-semibold">Status: </span>
        <span
          className={`font-semibold ${
            project.status === 'active' ? 'text-green-500' : 'text-blue-500'
          }`}
        >
          {project.status}
        </span>
      </p>
      <div className="flex justify-between space-x-3">
        <button
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-600 hover:scale-105 transform transition-all duration-300 shadow-md"
          onClick={() =>
            onUpdate(project.id, {
              ...project,
              status: project.status === 'active' ? 'completed' : 'active',
            })
          }
        >
          Toggle Status
        </button>
        <button
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600 hover:scale-105 transform transition-all duration-300 shadow-md"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired, // Or PropTypes.instanceOf(Date) if you're using Date objects
    status: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectCard;
