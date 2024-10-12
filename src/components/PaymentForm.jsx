import React, { useState } from 'react';
import PropTypes from 'prop-types';

function PaymentForm({ onSubmit, projects, setShowForm }) {
  const [projectName, setProjectName] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('unpaid');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ projectName, amount: parseFloat(amount), status });
    setProjectName('');
    setAmount('');
    setStatus('unpaid');
    setShowForm(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md transition-all duration-500 transform hover:scale-105"
      >
        <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
          Add Payment
        </h2>
        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="projectName"
          >
            Project:
          </label>
          <select
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="amount"
          >
            Amount:
          </label>
          <input
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="status"
          >
            Status:
          </label>
          <select
            className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          Add Payment
        </button>
      </form>
    </div>
  );
}

PaymentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setShowForm: PropTypes.func.isRequired,
};

export default PaymentForm;
