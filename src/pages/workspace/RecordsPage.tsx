import {useCallback, useMemo, useState} from "react";
import ReactJson from "react-json-view";
import {RecordsTable} from "../../components/RecordsTable";
import {UpModal} from "../../components/UpComponents";
import {usePlaygroundContext} from "../../contexts/UIStateContext";
import {useMockRecords} from "../../hooks/useMockData";
import {formatDate} from "../../utils";

function getColumnRenderer(fieldName: string, openJsonModal: (data: any) => void) {
    switch (fieldName.toLowerCase()) {
        case "status":
            return (params: any) => <span className={`status-badge status-${params.value}`}>{params.value}</span>;
        case "date":
            return (params: any) => <span>{formatDate(params.value)}</span>;
        case "json":
            return (params: any) => {
                if (!params.value || params.value === "" || params.value === null || params.value === undefined) {
                    return <span>-</span>;
                }

                const handleClick = () => {
                    try {
                        const parsedJson = typeof params.value === "string" ? JSON.parse(params.value) : params.value;
                        openJsonModal(parsedJson);
                    } catch (error) {
                        console.error("Failed to parse JSON:", error);
                        openJsonModal({error: "Invalid JSON", raw: params.value});
                    }
                };
                return (
                    <button type="button" onClick={handleClick} className="view-json-button">
                        View JSON
                    </button>
                );
            };
        default:
            return undefined;
    }
}

export function RecordsPage() {
    const {playgroundState} = usePlaygroundContext();
    const {data: records, isLoading, error} = useMockRecords({playgroundName: playgroundState.currentPlayground ?? undefined});
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});
    const [jsonModalOpen, setJsonModalOpen] = useState(false);
    const [jsonData, setJsonData] = useState<any>(null);

    const openJsonModal = useCallback((data: any) => {
        setJsonData(data);
        setJsonModalOpen(true);
    }, []);

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
            renderCell: getColumnRenderer(fieldName, openJsonModal),
        }));
    }, [records, openJsonModal]);

    const filteredData = useMemo(() => {
        if (!records) return [];

        let filtered = [...records];

        if (filterValues.date && filterValues.date.trim() !== "") {
            filtered = filtered.filter((item) => {
                const formattedDate = formatDate(item.date);
                return formattedDate.toLowerCase().includes(filterValues.date.toLowerCase());
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
                <h1> Records / {playgroundState.currentPlayground}</h1>
            </div>

            <div className="page-content">
                {error && <div className="error-message">Failed to load records: {error.message}</div>}
                <RecordsTable data={filteredData} columns={columns} loading={isLoading} onFilterChange={onFilterChange} onResetFilters={onResetFilters} />
            </div>

            <UpModal open={jsonModalOpen} onClose={() => setJsonModalOpen(false)} title="JSON Data">
                <ReactJson src={jsonData} enableClipboard={true} displayDataTypes={false} displayObjectSize={true} name={null} />
            </UpModal>
        </div>
    );
}
