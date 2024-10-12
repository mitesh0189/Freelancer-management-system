import React, { useState } from 'react';
import PaymentForm from './PaymentForm';
import PropTypes from 'prop-types';

function PaymentsSection({ payments, onMarkAsPaid, onAddPayment, projects }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg fade-in transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payments</h2>
      <div className="space-y-4 mb-6">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div>
              <p className="font-medium text-lg text-gray-700">{payment.projectName}</p>
              <p className="text-sm text-gray-600">Amount: <span className="font-semibold">${payment.amount}</span></p>
            </div>
            <div className="flex items-center">
              <span
                className={`mr-4 text-sm font-semibold ${
                  payment.status === 'paid' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {payment.status === 'paid' ? 'Paid' : 'Unpaid'}
              </span>
              {payment.status === 'unpaid' && (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-600 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
                  onClick={() => onMarkAsPaid(payment.id)}
                >
                  Mark as Paid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancel' : 'Add Payment'}
      </button>

      {showForm && (
        <div className="mt-6">
          <PaymentForm
            onSubmit={onAddPayment}
            projects={projects}
            setShowForm={setShowForm}
          />
        </div>
      )}
    </div>
  );
}

PaymentsSection.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      projectName: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onMarkAsPaid: PropTypes.func.isRequired,
  onAddPayment: PropTypes.func.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PaymentsSection;
