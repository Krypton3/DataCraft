"use client";
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal/Modal';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@nextui-org/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Refs for charts
  const combinedDistributionChartRef = useRef<any>(null);
  const correlationHeatmapChartRef = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsModalOpen(true);

        const response = await fetch('http://localhost:8000/dashboard/');
        const contentType = response.headers.get('content-type');

        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Expected JSON response, but received something else.');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching or parsing data:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
        setIsModalOpen(false);
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to download chart as PNG
  const downloadChartAsPng = (chartRef: any, chartName: string) => {
    const link = document.createElement('a');
    link.href = chartRef.current.toBase64Image();
    link.download = `${chartName}.png`;
    link.click();
  };

  // Show modal with loading message if loading
  if (loading) {
    return (
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3>Loading...</h3>
        <p>Data is being fetched, please wait...</p>
      </Modal>
    );
  }

  // Return error message if there is an error
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Function to render the summary cards
  const renderSummaryCards = () => {
    if (!data) return null;

    // Calculate total missing values
    const totalMissingValues = Object.values(data.initial_info.missing_values).reduce((a, b) => a + b, 0);

    return (
      <div className="flex w-full gap-2">
        <Card isHoverable className="flex-1">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="font-bold">Total Rows</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{data.final_info?.final_shape?.[0] || 'N/A'}</p>
          </CardBody>
        </Card>

        <Card isHoverable className="flex-1">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="font-bold">Total Columns</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{data.final_info?.final_shape?.[1] || 'N/A'}</p>
          </CardBody>
        </Card>

        <Card isHoverable className="flex-1">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="font-bold">Duplicate Rows</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{String(data.initial_info.duplicate_rows ?? 'N/A')}</p>
          </CardBody>
        </Card>

        <Card isHoverable className="flex-1">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="font-bold">Total Missing Values</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{String(totalMissingValues ?? 'N/A')}</p>
          </CardBody>
        </Card>

        <Card isHoverable className="flex-1">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="font-bold">Outliers Count</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{data.outliers_columns?.length || 'N/A'}</p>
          </CardBody>
        </Card>
      </div>
    );
  };

  // Function to render the correlation heatmap
  const renderCorrelationHeatmap = () => {
    if (!data || !data.correlation_matrix) return null;

    const heatmapData = {
      labels: Object.keys(data.correlation_matrix),
      datasets: Object.keys(data.correlation_matrix).map((key, idx) => ({
        label: key,
        data: Object.values(data.correlation_matrix[key]),
        backgroundColor: `rgba(75, 192, 192, ${0.2 + idx * 0.1})`,
        borderColor: `rgba(75, 192, 192, 1)`,
        borderWidth: 1,
      })),
    };

    return (
      <Card className="plot w-full md:w-1/2" isHoverable >
        <CardHeader>
          <p className="font-bold">Correlation Heatmap</p>
        </CardHeader>
        <CardBody>
          <Bar ref={correlationHeatmapChartRef} data={heatmapData} />
          <Button 
            size="sm"
            onClick={() => downloadChartAsPng(correlationHeatmapChartRef, 'Correlation_Heatmap')}
            style={{ marginTop: '1rem' }}>
            Download as PNG
          </Button>
        </CardBody>
      </Card>
    );
  };

  // Function to render the combined distribution plot
  const renderCombinedDistributionPlot = () => {
    if (!data || !data.distribution) return null;

    const distributionData = data.distribution;

    const combinedChartData = {
      labels: ['Min', '25%', '50%', '75%', 'Max'],
      datasets: Object.keys(distributionData).map((key, index) => ({
        label: key,
        data: [
          distributionData[key].min,
          distributionData[key]['25%'],
          distributionData[key]['50%'],
          distributionData[key]['75%'],
          distributionData[key].max,
        ],
        backgroundColor: `rgba(${index * 30}, 162, 235, 0.5)`,
        borderColor: `rgba(${index * 30}, 162, 235, 1)`,
        borderWidth: 1,
      })),
    };

    return (
      <Card isHoverable>
        <CardHeader>
          <p className="font-bold">Combined Distribution Plot</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <Bar ref={combinedDistributionChartRef} data={combinedChartData} options={{ responsive: true }} />
          <Button 
            size="sm"
            onClick={() => downloadChartAsPng(combinedDistributionChartRef, 'Combined_Distribution')}
            style={{ marginTop: '1rem' }}>
            Download as PNG
          </Button>
        </CardBody>
      </Card>
    );
  };

  // Function to render the top rows as a table
  const renderTopRowsTable = () => {
    if (!data || !data.top_rows) return null;

    // Extracting columns from the first row
    const columns = Object.keys(data.top_rows[0]).map((key) => ({
        key: key,
        label: key.replace(/_/g, " ")
    }));
    
    // Rows are already in the appropriate format
    const rows = data.top_rows.map((row, index) => ({
        key: index.toString(),
        ...row,
    }));

    return (
      <Card className="plot w-full md:w-1/2" isHoverable>
        <CardHeader>
          <p className="font-bold">Top Rows</p>
        </CardHeader>
        <CardBody>
          <Table aria-label="Top Rows Table">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.key}>
                {(columnKey) => <TableCell>{row[columnKey]}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

return (
  <div className="dashboard">
    <div className="plots grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderSummaryCards()}
      {renderCombinedDistributionPlot()}
      {renderCorrelationHeatmap()}
      {renderTopRowsTable()}
    </div>
  </div>
);
};

export default Dashboard;