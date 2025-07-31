import {useMemo, useState} from "react";
import {DateRangePicker} from "../../components/DateRangePicker";
import {RecordsTable} from "../../components/dashboard/RecordsTable";
import {usePlaygroundContext} from "../../contexts/UIStateContext";
import {useMockRecords} from "../../hooks/useMockData";
import type {RecordData} from "../../types";

function getColumnRenderer(fieldName: string) {
    switch (fieldName.toLowerCase()) {
        case "status":
            return (params: any) => <span className={`status-badge status-${params.value}`}>{params.value}</span>;
        default:
            return undefined;
    }
}

function generateBatchOptions(data: RecordData[]) {
    if (!data.length) return [{value: "All", label: "All"}];

    const uniqueBatches = [...new Set(data.map((item) => item.batchNo).filter(Boolean))];
    return [{value: "All", label: "All"}, ...uniqueBatches.map((batch) => ({value: batch.toString(), label: batch.toString()}))];
}

export function AllRecordsPage() {
    const {playgroundState} = usePlaygroundContext();
    const {data: records, isLoading, error} = useMockRecords({playgroundName: playgroundState.currentPlayground ?? undefined});
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});

    const columns = useMemo(() => {
        if (!records || records.length === 0) return [];

        const firstRecord = records[0];
        const dataFields = Object.keys(firstRecord);

        return dataFields.map((fieldName) => ({
            field: fieldName,
            headerName: fieldName.charAt(0).toUpperCase() + fieldName.slice(1).replace(/([A-Z])/g, " $1"),
            sortable: true,
            flex: 1,
            renderCell: getColumnRenderer(fieldName),
        }));
    }, [records]);

    const filters = useMemo(() => {
        if (!records || records.length === 0) return [];

        return [
            {
                field: "date",
                label: "Date",
                type: "date" as const,
                defaultValue: "",
            },
            {
                field: "batchNo",
                label: "Batch Number",
                type: "dropdown" as const,
                options: generateBatchOptions(records),
                defaultValue: "All",
            },
            {
                field: "status",
                label: "Status",
                type: "dropdown" as const,
                options: [
                    {value: "All", label: "All"},
                    {value: "active", label: "Active"},
                    {value: "failed", label: "Failed"},
                    {value: "finished", label: "Finished"},
                ],
                defaultValue: "All",
            },
        ];
    }, [records]);

    const filteredData = useMemo(() => {
        if (!records) return [];

        let filtered = [...records];

        if (filterValues.date && filterValues.date.trim() !== "") {
            filtered = filtered.filter((item) => {
                return item.date?.includes(filterValues.date);
            });
        }

        if (filterValues.batchNo && filterValues.batchNo !== "All") {
            filtered = filtered.filter((item) => {
                return item.batchNo === filterValues.batchNo;
            });
        }

        if (filterValues.status && filterValues.status !== "All") {
            filtered = filtered.filter((item) => {
                return item.status === filterValues.status;
            });
        }

        return filtered;
    }, [records, filterValues]);

    function onFilterChange(filters: Record<string, string>) {
        setFilterValues(filters);
    }

    function onResetFilters() {
        setFilterValues({});
    }

    return (
        <div className="page">
            <div className="page-subheader">
                <h1>All Records / {playgroundState.currentPlayground}</h1>
                <div className="date-range-section">
                    <DateRangePicker />
                </div>
            </div>

            <div className="page-content">
                {error && <div className="error-message">Failed to load records: {error.message}</div>}
                <RecordsTable
                    data={filteredData}
                    columns={columns}
                    filters={filters}
                    loading={isLoading}
                    onFilterChange={onFilterChange}
                    onResetFilters={onResetFilters}
                />
            </div>
        </div>
    );
}
