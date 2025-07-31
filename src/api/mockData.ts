import type {DashboardData, PlaygroundData, RecordData} from "../types";
import {formatNumber} from "../utils";

export const mockRecords: RecordData[] = [
    {
        referenceNo: "5769586jg",
        batchNo: "123-456",
        date: "05.04.2025",
        customer: "Robert Johnson",
        comment: "Lorem ipsum dolor sit amet",
        status: "finished",
        result: "$2,455.00",
    },
    {
        referenceNo: "5769587jg",
        batchNo: "123-456",
        date: "05.04.2025",
        customer: "Sarah Wilson",
        comment: "Lorem ipsum dolor sit amet",
        status: "failed",
        result: "$1,200.00",
    },
    {
        referenceNo: "5769588jg",
        batchNo: "123-456",
        date: "05.04.2025",
        customer: "Michael Brown",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$3,100.00",
    },
    {
        referenceNo: "5769589jg",
        batchNo: "124-457",
        date: "05.04.2025",
        customer: "Emily Davis",
        comment: "Lorem ipsum dolor sit amet",
        status: "finished",
        result: "$800.00",
    },
    {
        referenceNo: "5769590jg",
        batchNo: "124-457",
        date: "05.04.2025",
        customer: "David Miller",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$1,750.00",
    },
    {
        referenceNo: "5769591jg",
        batchNo: "125-458",
        date: "05.04.2025",
        customer: "Lisa Anderson",
        comment: "Lorem ipsum dolor sit amet",
        status: "finished",
        result: "$2,900.00",
    },
    {
        referenceNo: "5769592jg",
        batchNo: "125-458",
        date: "06.04.2025",
        customer: "James Taylor",
        comment: "Lorem ipsum dolor sit amet",
        status: "failed",
        result: "$500.00",
    },
    {
        referenceNo: "5769593jg",
        batchNo: "125-458",
        date: "08.04.2025",
        customer: "Jennifer White",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$4,200.00",
    },
    {
        referenceNo: "5769594jg",
        batchNo: "125-458",
        date: "06.04.2025",
        customer: "Jennifer White",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$4,200.00",
    },
    {
        referenceNo: "5769595jg",
        batchNo: "125-458",
        date: "07.04.2025",
        customer: "Jennifer White",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$4,200.00",
    },
];

export const mockDashboardData: DashboardData = {
    started: 135600,
    finished: 24000,
    failed: 30009,
    stillRunning: 44500,
};

export const breakdownData = [
    {title: "Default Notice", count: formatNumber("123400")},
    {title: "DLR", count: formatNumber("89000")},
    {title: "Mail Handler", count: formatNumber("156000")},
    {title: "Mail", count: formatNumber("89000")},
    {title: "Broken", count: formatNumber("45000")},
    {title: "New", count: formatNumber("30000")},
];

export const mockPlaygrounds: PlaygroundData[] = [
    {
        id: "pg-1",
        name: "21D",
        lastModified: "2025-01-20T14:22:00Z",
    },
    {
        id: "pg-2",
        name: "30Day",
        lastModified: "2025-01-20T11:15:00Z",
    },
    {
        id: "pg-3",
        name: "Hardship",
        lastModified: "2025-01-15T09:30:00Z",
    },
];

// Simulate API delay for realistic behavior
export const mockDelay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));
