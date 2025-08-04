import {useMemo, useState} from "react";
import {RecordsTable} from "../../components/dashboard/RecordsTable";
import {usePlaygroundContext} from "../../contexts/UIStateContext";
import {useMockRecords} from "../../hooks/useMockData";

function getColumnRenderer(fieldName: string) {
    switch (fieldName.toLowerCase()) {
        case "status":
            return (params: any) => <span className={`status-badge status-${params.value}`}>{params.value}</span>;
        default:
            return undefined;
    }
}

export function AllRecordsPage() {
    const {playgroundState} = usePlaygroundContext();
    const {data: records, isLoading, error} = useMockRecords({playgroundName: playgroundState.currentPlayground ?? undefined});
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});

    const columns = useMemo(() => {
        if (!records || records.length === 0) {
            return [
                {field: "referenceNo", headerName: "Reference No", sortable: true, flex: 1},
                {field: "date", headerName: "Date", sortable: true, flex: 1},
                {field: "batchNo", headerName: "Batch No", sortable: true, flex: 1},
                {field: "status", headerName: "Status", sortable: true, flex: 1},
                {field: "result", headerName: "Result", sortable: true, flex: 1},
            ];
        }

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
            </div>

            <div className="page-content">
                {error && <div className="error-message">Failed to load records: {error.message}</div>}
                <RecordsTable data={filteredData} columns={columns} loading={isLoading} onFilterChange={onFilterChange} onResetFilters={onResetFilters} />
            </div>
        </div>
    );
}
