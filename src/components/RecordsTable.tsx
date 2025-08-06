import {FilterAlt} from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import {
    ColumnsPanelTrigger,
    DataGrid,
    ExportCsv,
    type GridColDef,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    QuickFilterTrigger,
    Toolbar,
    ToolbarButton,
} from "@mui/x-data-grid";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, {type Dayjs} from "dayjs";
import {type ReactNode, useMemo, useState} from "react";
import {
    UpMaterialButton,
    UpMaterialFormControl,
    UpMaterialInputAdornment,
    UpMaterialInputLabel,
    UpMaterialMenuItem,
    UpMaterialSelect,
    UpMaterialTextField,
    UpMaterialThemeProvider,
    UpMaterialTooltip,
} from "./UpMaterialComponents";

type ColumnConfig = {
    field: string;
    headerName: string;
    sortable?: boolean;
    flex?: number;
    renderCell?: (params: any) => ReactNode;
};

type FilterConfig = {
    field: string;
    label: string;
    type?: "dropdown" | "date";
    options?: Array<{value: string; label: string}>;
    defaultValue?: string;
};

type RecordsTableProps = {
    data: Record<string, any>[];
    columns: ColumnConfig[];
    loading?: boolean;
    onFilterChange?: (filters: Record<string, string>) => void;
    onResetFilters?: () => void;
    pageSize?: number;
    pageSizeOptions?: number[];
};

function CustomToolbar() {
    return (
        <Toolbar>
            <UpMaterialTooltip title="Columns">
                <ColumnsPanelTrigger render={<ToolbarButton />}>
                    <ViewColumnIcon fontSize="small" />
                </ColumnsPanelTrigger>
            </UpMaterialTooltip>

            <UpMaterialTooltip title="Export">
                <ExportCsv render={<ToolbarButton />}>
                    <DownloadIcon fontSize="small" />
                </ExportCsv>
            </UpMaterialTooltip>

            <QuickFilter>
                <QuickFilterTrigger
                    render={(triggerProps, state) => (
                        <UpMaterialTooltip title="Search" enterDelay={0}>
                            <ToolbarButton {...triggerProps} color="default" style={{display: state.expanded ? "none" : "inline-flex"}}>
                                <SearchIcon fontSize="small" />
                            </ToolbarButton>
                        </UpMaterialTooltip>
                    )}
                />
                <QuickFilterControl
                    render={({ref, ...controlProps}, state) => (
                        <UpMaterialTextField
                            {...controlProps}
                            inputRef={ref}
                            aria-label="Search"
                            placeholder="Search..."
                            size="small"
                            style={{minWidth: 200, display: state.expanded ? "block" : "none"}}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <UpMaterialInputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </UpMaterialInputAdornment>
                                    ),
                                    endAdornment: state.value ? (
                                        <UpMaterialInputAdornment position="end">
                                            <QuickFilterClear edge="end" size="small" aria-label="Clear search">
                                                <CancelIcon fontSize="small" />
                                            </QuickFilterClear>
                                        </UpMaterialInputAdornment>
                                    ) : null,
                                    ...controlProps.slotProps?.input,
                                },
                                ...controlProps.slotProps,
                            }}
                        />
                    )}
                />
            </QuickFilter>
        </Toolbar>
    );
}

type CustomFilterBarProps = {
    filterValues: Record<string, string>;
    onFilterChange: (field: string, value: string) => void;
    onResetFilters: () => void;
    batchNumbers: string[];
};

function CustomFilterBar({filterValues, onFilterChange, onResetFilters, batchNumbers}: CustomFilterBarProps) {
    const filters = [
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
            options: [
                {value: "All", label: "All"},
                ...batchNumbers.map((batch) => ({
                    value: batch,
                    label: batch,
                })),
            ],
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
    function renderFilter(filter: FilterConfig) {
        if (filter.type === "date") {
            return (
                <div key={filter.field} className="filter-dropdown">
                    <DatePicker
                        value={filterValues[filter.field] ? dayjs(filterValues[filter.field]) : null}
                        onChange={(date: Dayjs | null) => {
                            const dateString = date ? date.format("YYYY-MM-DD") : "";
                            onFilterChange(filter.field, dateString);
                        }}
                        slotProps={{
                            textField: {
                                size: "small",
                                fullWidth: true,
                                placeholder: filter.label,
                                label: "",
                            },
                        }}
                    />
                </div>
            );
        }

        return (
            <UpMaterialFormControl key={filter.field} className="filter-dropdown" size="small">
                <UpMaterialInputLabel id={`${filter.field}-label`}>{filter.label}</UpMaterialInputLabel>
                <UpMaterialSelect
                    labelId={`${filter.field}-label`}
                    value={filterValues[filter.field] || ""}
                    onChange={(e) => onFilterChange(filter.field, e.target.value as string)}
                    label={filter.label}
                >
                    {filter.options?.map((option) => (
                        <UpMaterialMenuItem key={option.value} value={option.value}>
                            {option.label}
                        </UpMaterialMenuItem>
                    ))}
                </UpMaterialSelect>
            </UpMaterialFormControl>
        );
    }

    return (
        <div className="records-table-filters">
            <div className="filters-header">
                <FilterAlt className="filter-icon" />
                Filter By
            </div>
            <div className="filters-content">
                {filters.map(renderFilter)}
                <UpMaterialButton variant="text" size="small" onClick={onResetFilters} startIcon={<ClearIcon />}>
                    Reset Filter
                </UpMaterialButton>
            </div>
        </div>
    );
}

export function RecordsTable({
    data,
    columns,
    loading = false,
    onFilterChange,
    onResetFilters,
    pageSize = 100,
    pageSizeOptions = [100, 200, 500],
}: RecordsTableProps) {
    const batchNumbers = useMemo(() => Array.from(new Set(data.map((item) => item.batchNo).filter(Boolean))).map((batch) => batch.toString()), [data]);

    const [filterValues, setFilterValues] = useState<Record<string, string>>({
        date: "",
        batchNo: "All",
        status: "All",
    });

    function handleFilterChange(field: string, value: string) {
        const newFilters = {
            ...filterValues,
            [field]: value,
        };
        setFilterValues(newFilters);
        onFilterChange?.(newFilters);
    }

    function resetFilters() {
        setFilterValues({
            date: "",
            batchNo: "All",
            status: "All",
        });
        onResetFilters?.();
    }

    const gridColumns: GridColDef[] = columns.map((col) => ({
        field: col.field,
        headerName: col.headerName,
        sortable: col.sortable !== false,
        flex: col.flex,
        renderCell: col.renderCell,
    }));

    const filteredData = data.filter((record) => {
        const dateFilter = filterValues.date;
        const batchFilter = filterValues.batchNo;
        const statusFilter = filterValues.status;

        if (dateFilter && dateFilter.trim() !== "" && !record.date?.includes(dateFilter)) {
            return false;
        }

        if (batchFilter && batchFilter !== "All" && record.batchNo !== batchFilter) {
            return false;
        }

        if (statusFilter && statusFilter !== "All" && record.status !== statusFilter) {
            return false;
        }

        return true;
    });

    return (
        <UpMaterialThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="records-table-container">
                    <CustomFilterBar
                        filterValues={filterValues}
                        onFilterChange={handleFilterChange}
                        onResetFilters={resetFilters}
                        batchNumbers={batchNumbers}
                    />

                    <div className="records-table-wrapper">
                        <DataGrid
                            rowHeight={40}
                            rows={filteredData}
                            columns={gridColumns}
                            loading={loading}
                            showToolbar
                            getRowId={(row) => row.referenceNo}
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            slotProps={{
                                loadingOverlay: {
                                    variant: "skeleton",
                                    noRowsVariant: "skeleton",
                                },
                            }}
                            initialState={{
                                pagination: {
                                    paginationModel: {page: 0, pageSize},
                                },
                            }}
                            pageSizeOptions={pageSizeOptions}
                        />
                    </div>
                </div>
            </LocalizationProvider>
        </UpMaterialThemeProvider>
    );
}
