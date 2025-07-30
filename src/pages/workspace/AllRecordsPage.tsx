import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DateRangePicker } from "../../components/DateRangePicker";
import { RecordsTable } from "../../components/dashboard/RecordsTable";

const getColumnRenderer = (fieldName: string) => {
    switch (fieldName.toLowerCase()) {
        case "status":
            return (params: any) => <span className={`status-badge status-${params.value}`}>{params.value}</span>;
        default:
            return undefined;
    }
};

// Generate batch number options from data
const generateBatchOptions = (data: Record<string, any>[]) => {
    const batchField = Object.keys(data[0] || {}).find((key) => key.toLowerCase().includes("batch") || key.toLowerCase().includes("batchno"));

    if (!batchField) return [{ value: "All", label: "All" }];

    const uniqueBatches = [...new Set(data.map((item) => item[batchField]).filter(Boolean))];
    return [{ value: "All", label: "All" }, ...uniqueBatches.map((batch) => ({ value: batch.toString(), label: batch.toString() }))];
};

export function AllRecordsPage() {
    const { playgroundName } = useParams<{ playgroundName: string }>();
    const [data, setData] = useState<Record<string, any>[]>([]);
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<any[]>([]);
    const [filters, setFilters] = useState<any[]>([]);

    // Mock data for demonstration - replace with actual API call
    const mockData: Record<string, any>[] = [
        {
            id: "1",
            referenceNo: "5769586jg",
            batchNo: "123-456",
            date: "05.04.2025",
            customer: "Robert Johnson",
            comment: "Lorem ipsum dolor sit amet",
            status: "finished",
            result: "$2,455.00",
        },
        {
            id: "2",
            referenceNo: "5769587jg",
            batchNo: "123-456",
            date: "05.04.2025",
            customer: "Sarah Wilson",
            comment: "Lorem ipsum dolor sit amet",
            status: "failed",
            result: "$1,200.00",
        },
        {
            id: "3",
            referenceNo: "5769588jg",
            batchNo: "123-456",
            date: "05.04.2025",
            customer: "Michael Brown",
            comment: "Lorem ipsum dolor sit amet",
            status: "active",
            result: "$3,100.00",
        },
        {
            id: "4",
            referenceNo: "5769589jg",
            batchNo: "124-457",
            date: "05.04.2025",
            customer: "Emily Davis",
            comment: "Lorem ipsum dolor sit amet",
            status: "finished",
            result: "$800.00",
        },
        {
            id: "5",
            referenceNo: "5769590jg",
            batchNo: "124-457",
            date: "05.04.2025",
            customer: "David Miller",
            comment: "Lorem ipsum dolor sit amet",
            status: "active",
            result: "$1,750.00",
        },
        {
            id: "6",
            referenceNo: "5769591jg",
            batchNo: "125-458",
            date: "05.04.2025",
            customer: "Lisa Anderson",
            comment: "Lorem ipsum dolor sit amet",
            status: "finished",
            result: "$2,900.00",
        },
        {
            id: "7",
            referenceNo: "5769592jg",
            batchNo: "125-458",
            date: "05.04.2025",
            customer: "James Taylor",
            comment: "Lorem ipsum dolor sit amet",
            status: "failed",
            result: "$500.00",
        },
        {
            id: "8",
            referenceNo: "5769593jg",
            batchNo: "125-458",
            date: "05.04.2025",
            customer: "Jennifer White",
            comment: "Lorem ipsum dolor sit amet",
            status: "active",
            result: "$4,200.00",
        },
        {
            id: "9",
            referenceNo: "5769594jg",
            batchNo: "125-458",
            date: "05.04.2025",
            customer: "Jennifer White",
            comment: "Lorem ipsum dolor sit amet",
            status: "active",
            result: "$4,200.00",
        },
        {
            id: "10",
            referenceNo: "5769595jg",
            batchNo: "125-458",
            date: "05.04.2025",
            customer: "Jennifer White",
            comment: "Lorem ipsum dolor sit amet",
            status: "active",
            result: "$4,200.00",
        },
    ];

    // Simulate API call and data processing
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            await new Promise((resolve) => setTimeout(resolve, 100));

            const apiData = mockData;

            if (apiData.length > 0) {
                const firstRecord = apiData[0];
                const dataFields = Object.keys(firstRecord).filter((key) => key !== "id");

                const dynamicColumns = dataFields.map((fieldName) => ({
                    field: fieldName,
                    headerName: fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, " $1"),
                    sortable: true,
                    flex: 1,
                    renderCell: getColumnRenderer(fieldName),
                }));

                const specificFilters = [
                    {
                        field: "date",
                        label: "Date",
                        type: "date",
                        defaultValue: "",
                    },
                    {
                        field: "batchNo",
                        label: "Batch Number",
                        type: "dropdown",
                        options: generateBatchOptions(apiData),
                        defaultValue: "All",
                    },
                    {
                        field: "status",
                        label: "Status",
                        type: "dropdown",
                        options: [
                            { value: "All", label: "All" },
                            { value: "active", label: "Active" },
                            { value: "failed", label: "Failed" },
                            { value: "finished", label: "Finished" },
                        ],
                        defaultValue: "All",
                    },
                ];

                setData(apiData);
                setColumns(dynamicColumns);
                setFilters(specificFilters);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    const handleFilterChange = (filters: Record<string, string>) => {
        console.log("Filter changes:", filters);
        // Implement filter logic here
    };

    const handleResetFilters = () => {
        console.log("Reset filters");
        // Implement reset logic here
    };

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>All Records / {playgroundName}</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                <RecordsTable
                    data={data}
                    columns={columns}
                    filters={filters}
                    loading={loading}
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                />
            </div>
        </div>
    );
}
