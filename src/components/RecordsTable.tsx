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
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {type ReactNode, useMemo, useState} from "react";
import {useDateRangeContext} from "../contexts/UIStateContext";
import {isDateInRange, parseDate} from "../utils";
import {DateRangePicker} from "./DateRangePicker";
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
    type?: "dropdown" | "dateRange";
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
    onResetDateRange: () => void;
};

function CustomFilterBar({filterValues, onFilterChange, onResetFilters, batchNumbers, onResetDateRange}: CustomFilterBarProps) {
    const filters = [
        {
            field: "dateRange",
            label: "Date Range",
            type: "dateRange" as const,
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
        if (filter.type === "dateRange") {
            return (
                <div key={filter.field}>
                    <DateRangePicker triggerStyle="light" dropdownPosition="left" />
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
                <div className="reset-button">
                    <UpMaterialButton
                        variant="text"
                        size="small"
                        onClick={() => {
                            onResetFilters();
                            onResetDateRange();
                        }}
                        startIcon={<ClearIcon />}
                    >
                        Reset Filter
                    </UpMaterialButton>
                </div>
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

    const {dateRangeState, setDateRange} = useDateRangeContext();
    const [filterValues, setFilterValues] = useState<Record<string, string>>({
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
            batchNo: "All",
            status: "All",
        });
        setDateRange([null, null]);
        onResetFilters?.();
    }

    const gridColumns: GridColDef[] = columns.map((col) => {
        const isDateColumn = col.field.toLowerCase() === "date" || col.field.toLowerCase() === "lastmodified";

        return {
            field: col.field,
            headerName: col.headerName,
            sortable: col.sortable !== false,
            flex: col.flex,
            renderCell: col.renderCell,
            sortComparator: isDateColumn
                ? (v1: any, v2: any) => {
                      const date1 = parseDate(v1);
                      const date2 = parseDate(v2);

                      if (!date1 || !date1.isValid()) return -1;
                      if (!date2 || !date2.isValid()) return 1;

                      return date1.isBefore(date2) ? -1 : date1.isAfter(date2) ? 1 : 0;
                  }
                : undefined,
        };
    });

    const filteredData = data.filter((record) => {
        const [startDate, endDate] = dateRangeState.dateRange;
        const batchFilter = filterValues.batchNo;
        const statusFilter = filterValues.status;

        if (startDate || endDate) {
            if (!isDateInRange(record.date, startDate, endDate)) {
                return false;
            }
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
                        onResetDateRange={() => setDateRange([null, null])}
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
