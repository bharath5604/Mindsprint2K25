
// 'use client';

// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Chart.js requires you to register the components you are using
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export default function AnalyticsChart({ chartData }) {
//   // Process the data from the API into the format Chart.js needs
//   const labels = chartData.map(item => item._id);
//   const dataPoints = chartData.map(item => item.count);

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Number of Teams Registered',
//         data: dataPoints,
//         backgroundColor: [
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//           'rgba(255, 159, 64, 0.6)',
//           'rgba(201, 203, 207, 0.6)'
//         ],
//         borderColor: [
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 99, 132, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//           'rgba(201, 203, 207, 1)'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//             color: '#e2e8f0' // Light text for legend
//         }
//       },
//       title: {
//         display: true,
//         text: 'Registrations per Track',
//         color: '#e2e8f0', // Light text for title
//         font: {
//             size: 18
//         }
//       },
//     },
//     scales: {
//         y: {
//             beginAtZero: true,
//             ticks: {
//                 color: '#94a3b8', // Light text for y-axis labels
//                 stepSize: 1 // Ensure y-axis shows whole numbers for team counts
//             },
//             grid: {
//                 color: 'rgba(255, 255, 255, 0.1)' // Lighter grid lines
//             }
//         },
//         x: {
//             ticks: {
//                 color: '#94a3b8' // Light text for x-axis labels
//             },
//             grid: {
//                 display: false // Hide vertical grid lines
//             }
//         }
//     }
//   };

//   return <Bar options={options} data={data} />;
// }