import {Clear, KeyboardArrowDown} from "@mui/icons-material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, {type Dayjs} from "dayjs";
import {useEffect, useRef, useState} from "react";
import type {DateRange} from "../contexts/UIStateContext";
import {useDateRangeContext} from "../contexts/UIStateContext";
import {UpMaterialButton, UpMaterialThemeProvider} from "./UpMaterialComponents";

const shortcuts = [
    {label: "This Week", getValue: (): DateRange<Dayjs> => [dayjs().startOf("week"), dayjs().endOf("week")]},
    {label: "Last Week", getValue: (): DateRange<Dayjs> => [dayjs().subtract(7, "day").startOf("week"), dayjs().subtract(7, "day").endOf("week")]},
    {label: "Last 7 Days", getValue: (): DateRange<Dayjs> => [dayjs().subtract(7, "day"), dayjs()]},
    {label: "Current Month", getValue: (): DateRange<Dayjs> => [dayjs().startOf("month"), dayjs().endOf("month")]},
    {label: "Reset", getValue: (): DateRange<Dayjs> => [null, null]},
];

export function DateRangePicker() {
    const {dateRangeState, setDateRange} = useDateRangeContext();
    const [startDate, endDate] = dateRangeState.dateRange;
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    function handleStartDateChange(date: Dayjs | null) {
        setDateRange([date, endDate]);
    }

    function handleEndDateChange(date: Dayjs | null) {
        setDateRange([startDate, date]);
    }

    function handleShortcutClick(getValue: () => DateRange<Dayjs>) {
        setDateRange(getValue());
    }

    function getCurrentSelectionLabel(): string {
        if (!startDate && !endDate) {
            return "Select Date Range";
        }

        for (const shortcut of shortcuts) {
            if (shortcut.label === "Reset") continue;

            const shortcutRange = shortcut.getValue();
            const [shortcutStart, shortcutEnd] = shortcutRange;

            if (startDate && endDate && shortcutStart && shortcutEnd) {
                if (startDate.isSame(shortcutStart, "day") && endDate.isSame(shortcutEnd, "day")) {
                    return shortcut.label;
                }
            }
        }

        if (startDate && endDate) {
            const startFormatted = startDate.format("MMM DD");
            const endFormatted = endDate.format("MMM DD");

            if (startDate.isSame(endDate, "day")) {
                return startFormatted;
            }

            if (startDate.isSame(endDate, "year")) {
                return `${startFormatted} - ${endFormatted}`;
            }

            return `${startFormatted} - ${endDate.format("MMM DD, YYYY")}`;
        }

        if (startDate) {
            return `From ${startDate.format("MMM DD")}`;
        }

        if (endDate) {
            return `Until ${endDate.format("MMM DD")}`;
        }

        return "Select Date Range";
    }

    function handleTriggerClick() {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <UpMaterialThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="date-range-picker-container" ref={containerRef} style={{position: "relative"}}>
                    <UpMaterialButton
                        variant="contained"
                        onClick={handleTriggerClick}
                        endIcon={<KeyboardArrowDown />}
                        sx={{
                            minWidth: "200px",
                            justifyContent: "space-between",
                        }}
                    >
                        {getCurrentSelectionLabel()}
                    </UpMaterialButton>

                    {isOpen && (
                        <div className="date-range-picker-dropdown">
                            <h3 className="title">Select Date Range</h3>
                            <div className="labels">
                                <span className="label">{startDate ? startDate.format("MMM DD, YYYY") : "Start"}</span>
                                <span className="separator"> — </span>
                                <span className="label">{endDate ? endDate.format("MMM DD, YYYY") : "End"}</span>
                            </div>

                            <div className="inputs">
                                <div className="input-group">
                                    <DatePicker
                                        value={startDate}
                                        onChange={handleStartDateChange}
                                        slotProps={{
                                            textField: {
                                                id: "start-date",
                                                size: "small",
                                                fullWidth: true,
                                                placeholder: "Start date",
                                                label: "",
                                            },
                                        }}
                                    />
                                </div>

                                <span className="separator"> — </span>

                                <div className="input-group">
                                    <DatePicker
                                        value={endDate}
                                        onChange={handleEndDateChange}
                                        slotProps={{
                                            textField: {
                                                id: "end-date",
                                                size: "small",
                                                fullWidth: true,
                                                placeholder: "End date",
                                                label: "",
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="shortcuts">
                                {shortcuts.map((shortcut) => (
                                    <UpMaterialButton
                                        key={shortcut.label}
                                        variant="outlined"
                                        size="small"
                                        sx={{borderRadius: "12px"}}
                                        onClick={() => handleShortcutClick(shortcut.getValue)}
                                        startIcon={shortcut.label === "Reset" ? <Clear /> : undefined}
                                    >
                                        {shortcut.label}
                                    </UpMaterialButton>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </LocalizationProvider>
        </UpMaterialThemeProvider>
    );
}
