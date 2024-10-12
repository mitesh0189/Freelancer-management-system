import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto'; 
import ProjectCard from './components/ProjectCard';
import ProjectForm from './components/ProjectForm';
import PaymentsSection from './components/PaymentsSection';

function App() {
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    setProjects([
      { id: 1, name: 'Website Redesign', dueDate: '2023-06-30', status: 'active' },
      { id: 2, name: 'Mobile App Development', dueDate: '2023-07-15', status: 'active' },
      { id: 3, name: 'Logo Design', dueDate: '2023-06-10', status: 'completed' },
    ]);

    setPayments([
      { id: 1, projectName: 'Website Redesign', amount: 1500, status: 'paid' },
      { id: 2, projectName: 'Mobile App Development', amount: 2000, status: 'unpaid' },
      { id: 3, projectName: 'Logo Design', amount: 800, status: 'paid' },
    ]);

    updateTotalEarnings();
  }, []);

  useEffect(() => {
    updateTotalEarnings();
    updateChart();
  }, [payments]);

  const updateTotalEarnings = () => {
    const total = payments.reduce((sum, payment) => 
      payment.status === 'paid' ? sum + payment.amount : sum, 0
    );
    setTotalEarnings(total);
  };

  const updateChart = () => {
    const ctx = document.getElementById('earningsChart').getContext('2d');
    const monthlyEarnings = getMonthlyEarnings();

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(monthlyEarnings),
        datasets: [
          {
            label: 'Earnings',
            data: Object.values(monthlyEarnings),
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  const getMonthlyEarnings = () => {
    const monthlyEarnings = {};
    payments.forEach((payment) => {
      if (payment.status === 'paid') {
        const date = new Date(payment.paidDate || Date.now());
        const monthYear = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        monthlyEarnings[monthYear] = (monthlyEarnings[monthYear] || 0) + payment.amount;
      }
    });
    return monthlyEarnings;
  };

  const addProject = (project) => {
    setProjects([...projects, { ...project, id: Date.now() }]);
  };

  const updateProject = (id, updatedProject) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
    setPayments(
      payments.filter(
        (payment) => payment.projectName !== projects.find((p) => p.id === id).name
      )
    );
  };

  const addPayment = (payment) => {
    setPayments([...payments, { ...payment, id: Date.now(), paidDate: Date.now() }]);
  };

  const markPaymentAsPaid = (id) => {
    setPayments(
      payments.map((payment) =>
        payment.id === id ? { ...payment, status: 'paid', paidDate: Date.now() } : payment
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-6 rounded-lg shadow-lg mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-wide">
          Freelancer Project Management
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onUpdate={updateProject}
                onDelete={deleteProject}
              />
            ))}
          </div>
          <ProjectForm onSubmit={addProject} />
        </div>

        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Earnings Overview</h2>
            <p className="text-xl font-medium mb-4">
              Total Earnings: ${totalEarnings}
            </p>
            <div className="h-64">
              <canvas id="earningsChart" />
            </div>
          </div>

          <PaymentsSection
            payments={payments}
            onMarkAsPaid={markPaymentAsPaid}
            onAddPayment={addPayment}
            projects={projects}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
