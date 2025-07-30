import { FilterAlt, Refresh } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import { Button, createTheme, FormControl, InputAdornment, InputLabel, MenuItem, Select as MuiSelect, TextField, ThemeProvider, Tooltip } from "@mui/material";
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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";

// Material-UI theme specifically for DataGrid to avoid conflicts with Joy UI
const dataGridTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#4747b5",
        },
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
        text: {
            primary: "#515151",
            secondary: "#9b9b9b",
        },
        divider: "#f8f8f8",
    },
} as any);

// Material-UI theme for the main component to avoid conflicts with Joy UI
const materialTheme = createTheme({
    palette: {
        primary: {
            main: "#4747b5",
        },
    },
});

type ColumnConfig = {
    field: string;
    headerName: string;
    sortable?: boolean;
    flex?: number;
    renderCell?: (params: any) => React.ReactNode;
};

type FilterConfig = {
    field: string;
    label: string;
    type?: "dropdown" | "date";
    options?: Array<{ value: string; label: string }>;
    defaultValue?: string;
};

type RecordsTableProps = {
    data: Record<string, any>[];
    columns: ColumnConfig[];
    filters?: FilterConfig[];
    loading?: boolean;
    onFilterChange?: (filters: Record<string, string>) => void;
    onResetFilters?: () => void;
    pageSize?: number;
    pageSizeOptions?: number[];
};

function CustomToolbar() {
    return (
        <Toolbar>
            <Tooltip title="Columns">
                <ColumnsPanelTrigger render={<ToolbarButton />}>
                    <ViewColumnIcon fontSize="small" />
                </ColumnsPanelTrigger>
            </Tooltip>

            <Tooltip title="Export">
                <ExportCsv render={<ToolbarButton />}>
                    <DownloadIcon fontSize="small" />
                </ExportCsv>
            </Tooltip>

            <QuickFilter>
                <QuickFilterTrigger
                    render={(triggerProps, state) => (
                        <Tooltip title="Search" enterDelay={0}>
                            <ToolbarButton {...triggerProps} color="default" style={{ display: state.expanded ? "none" : "inline-flex" }}>
                                <SearchIcon fontSize="small" />
                            </ToolbarButton>
                        </Tooltip>
                    )}
                />
                <QuickFilterControl
                    render={({ ref, ...controlProps }, state) => (
                        <TextField
                            {...controlProps}
                            inputRef={ref}
                            aria-label="Search"
                            placeholder="Search..."
                            size="small"
                            style={{ minWidth: 200, display: state.expanded ? "block" : "none" }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: state.value ? (
                                        <InputAdornment position="end">
                                            <QuickFilterClear edge="end" size="small" aria-label="Clear search">
                                                <CancelIcon fontSize="small" />
                                            </QuickFilterClear>
                                        </InputAdornment>
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

export function RecordsTable({
    data,
    columns,
    filters = [],
    loading = false,
    onFilterChange,
    onResetFilters,
    pageSize = 10,
    pageSizeOptions = [10, 15, 30],
}: RecordsTableProps) {
    const [filterValues, setFilterValues] = useState<Record<string, string>>(() => {
        const initialFilters: Record<string, string> = {};
        filters.forEach((filter) => {
            initialFilters[filter.field] = filter.defaultValue || filter.options?.[0]?.value || "";
        });
        return initialFilters;
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
        const defaultFilters: Record<string, string> = {};
        filters.forEach((filter) => {
            defaultFilters[filter.field] = filter.defaultValue || filter.options?.[0]?.value || "";
        });
        setFilterValues(defaultFilters);
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
        const matchesFilters = filters.every((filter) => {
            const filterValue = filterValues[filter.field];
            const recordValue = record[filter.field];

            if (!filterValue || filterValue === "All" || filterValue === filter.options?.[0]?.value) {
                return true;
            }

            return recordValue === filterValue;
        });

        return matchesFilters;
    });

    function renderFilter(filter: FilterConfig) {
        if (filter.type === "date") {
            return (
                <div key={filter.field} className="filter-dropdown">
                    <DatePicker
                        value={filterValues[filter.field] ? dayjs(filterValues[filter.field]) : null}
                        onChange={(date: Dayjs | null) => {
                            const dateString = date ? date.format("YYYY-MM-DD") : "";
                            handleFilterChange(filter.field, dateString);
                        }}
                        slotProps={{
                            textField: {
                                size: "small",
                                fullWidth: true,

                                placeholder: filter.label,
                                label: "",
                                sx: {
                                    fontSize: "0.875rem",
                                    minWidth: "150px",
                                    "& .MuiInputBase-input": {
                                        fontSize: "0.875rem",
                                    },
                                    backgroundColor: "white",
                                },
                            },
                        }}
                    />
                </div>
            );
        }

        return (
            <FormControl key={filter.field} className="filter-dropdown" size="small">
                <InputLabel id={`${filter.field}-label`}>{filter.label}</InputLabel>
                <MuiSelect
                    labelId={`${filter.field}-label`}
                    value={filterValues[filter.field] || ""}
                    onChange={(e) => handleFilterChange(filter.field, e.target.value)}
                    label={filter.label}
                    sx={{
                        minWidth: "150px",
                        backgroundColor: "white",
                        fontSize: "0.875rem",
                    }}
                >
                    {filter.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </MuiSelect>
            </FormControl>
        );
    }

    return (
        <ThemeProvider theme={materialTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="records-table-container">
                    {filters.length > 0 && (
                        <div className="records-table-filters">
                            <div className="filters-header">
                                <FilterAlt className="filter-icon" />
                                Filter By
                            </div>
                            <div className="filters-content">
                                {filters.map(renderFilter)}
                                <Button variant="text" size="small" onClick={resetFilters} startIcon={<Refresh />}>
                                    Reset Filter
                                </Button>
                            </div>
                        </div>
                    )}

                    <div className="records-table-wrapper">
                        <ThemeProvider theme={dataGridTheme}>
                            <DataGrid
                                rowHeight={40}
                                rows={filteredData}
                                columns={gridColumns}
                                loading={loading}
                                showToolbar
                                slots={{
                                    toolbar: CustomToolbar,
                                }}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize },
                                    },
                                }}
                                pageSizeOptions={pageSizeOptions}
                            />
                        </ThemeProvider>
                    </div>
                </div>
            </LocalizationProvider>
        </ThemeProvider>
    );
}
