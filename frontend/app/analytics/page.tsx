"use client";
import React, { useState, useEffect, useRef } from 'react';
import Modal from '../Modal/Modal';
import {
    Card,
    CardHeader,
    CardBody,
    Tooltip,
    Divider,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Select,
    SelectItem,
} from '@nextui-org/react';
import {
    Bar,
    Line,
    Pie,
    Doughnut,
    Scatter,
    Radar,
    PolarArea,
    Bubble,
    Chart
} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    RadialLinearScale
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    ChartTooltip,
    Legend,
    RadialLinearScale
);

interface DataRow {
    [key: string]: any;
}

interface Data {
    top_rows: DataRow[];
}

const Analytics: React.FC = () => {
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
    const [plotData, setPlotData] = useState<any>(null);

    const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';

    // Ref for chart instance
    const chartRef = useRef<ChartJS | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsModalOpen(true);

                const response = await fetch(`${API_BASE_URL}/analytics/`);
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

    const toggleColumnSelection = (column: string) => {
        if (selectedColumns.includes(column)) return;
        setSelectedColumns([...selectedColumns, column]);
    };

    const deleteSelectedColumn = (column: string) => {
        const currentSelectedItems = selectedColumns.filter((col) => col !== column);
        setSelectedColumns(currentSelectedItems);
        if (currentSelectedItems.length === 0) {
            setSelectedPlot(null);
        }
    };

    const handlePlotSelection = (keys: Set<string>) => {
        const selected = Array.from(keys).pop();
        setSelectedPlot(selected || null);
    };

    const handleSubmit = async () => {
        if (selectedPlot && selectedColumns.length > 0) {
            try {
                const response = await fetch(`${API_BASE_URL}/plot/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        columns: selectedColumns,
                        plot: selectedPlot,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to submit data');
                }

                const result = await response.json();
                console.log('Plot created:', result);

                // Set the plot data to be used in the chart
                setPlotData(result);
            } catch (error) {
                console.error('Error during submission:', error);
            }
        }
    };

    const handleDownload = () => {
        if (chartRef.current) {
            const link = document.createElement('a');
            link.href = chartRef.current.toBase64Image();  // Correctly access the current chart instance
            link.download = `${selectedPlot}-chart.png`;
            link.click();
        }
    };

    const renderTopRowsTable = () => {
        if (!data || !data.top_rows) return null;

        const columns = Object.keys(data.top_rows[0]).map((key) => ({
            key: key,
            label: key.replace(/_/g, ' '),
        }));

        const rows = data.top_rows.map((row, index) => ({
            key: index.toString(),
            ...row,
        }));

        return (
            <Card className="plot w-full md:w-1/2" isHoverable>
                <CardHeader>
                    <p className="font-bold">Dataset</p>
                </CardHeader>
                <CardBody>
                    <Table aria-label="Dataset Table">
                        <TableHeader>
                            {columns.map((column) => (
                                <TableColumn key={column.key}>
                                    <Button
                                        color='primary'
                                        onClick={() => toggleColumnSelection(column.key)}
                                    >
                                        {column.label}
                                    </Button>
                                </TableColumn>
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

    const renderSelectedColumns = () => {
        const plotOptions = [
            { label: 'Bar Chart', key: 'bar' },
            { label: 'Line Chart', key: 'line' },
            { label: 'Pie Chart', key: 'pie' },
            { label: 'Doughnut Chart', key: 'doughnut' },
            { label: 'Scatter Plot', key: 'scatter' },
            { label: 'Radar Chart', key: 'radar' },
            { label: 'Polar Area Chart', key: 'polarArea' },
            { label: 'Bubble Chart', key: 'bubble' },
            { label: 'Horizontal Bar Chart', key: 'horizontalBar' }
        ];

        const renderChart = () => {
            if (!plotData || !selectedPlot || selectedColumns.length < 2) return null;

            const labels = plotData.data.map((item: any) => item[selectedColumns[0]]);
            const values = plotData.data.map((item: any) => item[selectedColumns[1]]);
            console.log(plotData);

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: selectedColumns[1].replace(/_/g, ' '),
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            };

            const chartOptions = {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: `${selectedColumns[0].replace(/_/g, ' ')} vs ${selectedColumns[1].replace(/_/g, ' ')}`,
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: selectedColumns[0].replace(/_/g, ' '),
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: selectedColumns[1].replace(/_/g, ' '),
                        },
                    },
                },
            };

            switch (selectedPlot) {
                case 'bar':
                    return <Bar ref={chartRef} data={chartData} options={chartOptions} />;
                case 'line':
                    return <Line ref={chartRef} data={chartData} options={chartOptions} />;
                case 'pie':
                    return <Pie ref={chartRef} data={chartData} options={chartOptions} />;
                case 'doughnut':
                    return <Doughnut ref={chartRef} data={chartData} options={chartOptions} />;
                case 'scatter':
                    return <Scatter ref={chartRef} data={chartData} options={chartOptions} />;
                case 'radar':
                    return <Radar ref={chartRef} data={chartData} options={chartOptions} />;
                case 'polarArea':
                    return <PolarArea ref={chartRef} data={chartData} options={chartOptions} />;
                case 'bubble':
                    return <Bubble ref={chartRef} data={chartData} options={chartOptions} />;
                case 'horizontalBar':
                    return <Bar ref={chartRef} data={chartData} options={{ ...chartOptions, indexAxis: 'y' }} />;
                default:
                    return null;
            }
        };

        return (
            <Card className="mt-4">
                <CardHeader>
                    <p className="font-bold">Selected Columns</p>
                </CardHeader>
                <CardBody className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-2 border p-2 rounded bg-gray-100">
                        {selectedColumns.length === 0 ? (
                            <div className="text-gray-500">No columns selected. Please select columns from the table above.</div>
                        ) : (
                            selectedColumns.map((column) => (
                                <Tooltip key={column} content="Click to delete" placement="top">
                                    <Button
                                        color='success'
                                        onClick={() => deleteSelectedColumn(column)}
                                    >
                                        {column.replace(/_/g, ' ')}
                                    </Button>
                                </Tooltip>
                            ))
                        )}
                        <Select
                            placeholder="Select Plot Type"
                            selectedKeys={selectedPlot ? new Set([selectedPlot]) : new Set()}
                            onSelectionChange={(keys) => handlePlotSelection(keys)}
                            className="max-w-xs"
                        >
                            {plotOptions.map((option) => (
                                <SelectItem key={option.key}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                        {selectedPlot && selectedColumns.length > 0 && (
                            <Button
                                className="mt-2"
                                color="secondary"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                    {renderChart()}
                    {plotData && selectedColumns.length > 1 && selectedPlot && (
                        <Button
                            className="mt-4"
                            color="warning"
                            onClick={handleDownload}
                        >
                            Download as PNG
                        </Button>
                    )}
                </CardBody>
            </Card>
        );
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

    return (
        <div className="analytics">
            <div className="data-plots grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTopRowsTable()}
            </div>
            <div className="data-plots grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderSelectedColumns()}
            </div>
        </div>
    );
};

export default Analytics;
