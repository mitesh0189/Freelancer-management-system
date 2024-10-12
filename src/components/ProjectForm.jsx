import React, { useState } from 'react';
import PropTypes from 'prop-types'; 

function ProjectForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, dueDate, status });
    setName('');
    setDueDate('');
    setStatus('active');
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg shadow-lg mt-6 transform transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Add New Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-semibold mb-2"
            htmlFor="name"
          >
            Project Name:
          </label>
          <input
            className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter project name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-semibold mb-2"
            htmlFor="dueDate"
          >
            Due Date:
          </label>
          <input
            className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-semibold mb-2"
            htmlFor="status"
          >
            Status:
          </label>
          <select
            className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300 ease-in-out"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transform transition duration-300 ease-in-out hover:scale-105"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}

ProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ProjectForm;
