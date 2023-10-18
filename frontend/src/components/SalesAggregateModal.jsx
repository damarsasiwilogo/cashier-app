import React from "react";
import { Bar } from 'react-chartjs-2';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody
} from "@chakra-ui/react";
import { BarElement, LinearScale, CategoryScale, Chart } from "chart.js";  // Import BarElement, LinearScale, CategoryScale, and Chart

Chart.register(BarElement, LinearScale, CategoryScale);  // Register BarElement, LinearScale, and CategoryScale

function SalesAggregateModal({ isOpen, onClose, salesData }) {
  // Prepare data for the Bar chart
  const chartData = {
    labels: salesData.map(sale => sale.date),
    datasets: [{
      label: 'Sales Amount',
      data: salesData.map(sale => sale.aggregate),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sales Aggregate Per Day</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Bar 
        data={chartData} 
        options={{
            scales: {
            y: {
                type: 'linear',  // Explicitly set the type as 'linear'
                beginAtZero: true
            },
            x: {
                type: 'category',  // Explicitly set the type as 'category'
            }
            }
        }}
        />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SalesAggregateModal;