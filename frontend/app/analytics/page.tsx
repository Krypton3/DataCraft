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

const Analytics: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
    const [selectedPlot, setSelectedPlot] = useState<string | null>(null);

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

    const toggleColumnSelection = (column: string) => {
        setSelectedColumns((prevSelected) =>
            prevSelected.includes(column)
                ? prevSelected.filter((col) => col !== column)
                : [...prevSelected, column]
        );
    };

    const deleteSelectedColumn = (column: string) => {
        setSelectedColumns((prevSelected) => prevSelected.filter((col) => col !== column));
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

    // Function to render the top rows as a table
    const renderTopRowsTable = () => {
        if (!data || !data.top_rows) return null;

        // Extracting columns from the first row
        const columns = Object.keys(data.top_rows[0]).map((key) => ({
            key: key,
            label: key.replace(/_/g, ' '),
        }));

        // Rows are already in the appropriate format
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

    
    const handlePlotSelection = (plot: string) => {
        setSelectedPlot(plot);
    };

    const handleSubmit = async () => {
        if (selectedPlot && selectedColumns.length > 0) {
            try {
                const response = await fetch('http://localhost:8000/plot', {
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
            } catch (error) {
                console.error('Error during submission:', error);
            }
        }
    };
    
    const renderSelectedColumns = () => {
        if (selectedColumns.length === 0) return null;

        const plotOptions = [
            { label: 'Bar Chart', value: 'bar'},
            { label: 'Line Chart', value: 'line'},
            { label: 'Pie Chart', value: 'pie'},
            { label: 'Doughnut Chart', value: 'doughnut'}
        ];

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
                                <Tooltip content="Click to delete" placement="top">
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
                            onChange={(value) => handlePlotSelection(value)}
                            className="max-w-xs"
                        >
                            {plotOptions.map((option) => (
                            <SelectItem key={option.value}>
                                {option.label}
                            </SelectItem>
                            ))}
                        </Select>
                        {selectedPlot && (
                        <Button
                            className="mt-2"
                            color="secondary"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    )}
                    </div>
                </CardBody>
            </Card>
        );
    };

    return (
        <div className="analytics">
            <div className="data-plots grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderTopRowsTable()}
            </div>
            {renderSelectedColumns()}
        </div>
    );
};

export default Analytics;
