import type {DashboardData, FolderData, PlaygroundData, RecordData} from "../types";
import {formatNumber} from "../utils";

export const mockRecords: RecordData[] = [
    {
        referenceNo: "5769586jg",
        batchNo: "123-456",
        date: "05.04.2025", // String format
        customer: "Robert Johnson",
        comment: "Lorem ipsum dolor sit amet woould have beeen nice, but the user decided to put the entire fucking works of shakespeare in here",
        status: "finished",
        result: "$2,455.00",
        json: '{"transaction_id":"TXN-2025-001-5769586jg","customer_info":{"id":"CUST-789456","name":"Robert Johnson","email":"robert.johnson@example.com","phone":"+1-555-0123","address":{"street":"123 Main Street","city":"Springfield","state":"IL","zip":"62701","country":"USA"},"preferences":{"newsletter":true,"marketing_emails":false,"sms_notifications":true}},"transaction_details":{"amount":2455.00,"currency":"USD","type":"payment","method":"credit_card","card_last4":"1234","card_type":"Visa","processing_fee":12.75,"tax_amount":245.50,"discount_applied":0.00},"items":[{"id":"ITEM-001","name":"Premium Widget Pro","quantity":2,"unit_price":899.99,"total_price":1799.98,"category":"electronics","tags":["premium","featured","bestseller"]},{"id":"ITEM-002","name":"Extended Warranty","quantity":1,"unit_price":199.99,"total_price":199.99,"category":"services","tags":["warranty","protection"]},{"id":"ITEM-003","name":"Express Shipping","quantity":1,"unit_price":29.99,"total_price":29.99,"category":"shipping","tags":["express","overnight"]}],"timestamps":{"created":"2025-04-05T10:30:00Z","processed":"2025-04-05T10:32:15Z","completed":"2025-04-05T10:35:22Z"},"status":{"code":"COMPLETED","message":"Transaction processed successfully","flags":["verified","fraud_check_passed","risk_assessment_low"]},"metadata":{"source":"web","user_agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36","ip_address":"192.168.1.100","session_id":"sess_abc123def456","referrer":"https://example.com/products","campaign":"spring_sale_2025","utm_source":"google","utm_medium":"cpc","utm_campaign":"widget_promotion"},"risk_assessment":{"score":0.15,"level":"low","factors":["verified_customer","consistent_location","normal_amount"],"recommendations":["proceed","monitor"]},"fraud_indicators":{"suspicious_activity":false,"velocity_alerts":[],"device_fingerprint":"df_xyz789","location_consistency":true,"behavior_score":0.92},"compliance":{"kyc_verified":true,"aml_check":"passed","sanctions_check":"clear","regulatory_requirements":["GDPR","CCPA","PCI-DSS"]},"analytics":{"conversion_funnel":"checkout_complete","ab_test_group":"variant_b","heatmap_data":{"clicks":45,"scroll_depth":87,"time_on_page":180},"performance_metrics":{"page_load_time":1.2,"api_response_time":0.8,"error_rate":0.001}}}',
    },
    {
        referenceNo: "5769587jg",
        batchNo: "123-456",
        date: 1743897600, // Unix timestamp (seconds) - 2025-04-05
        customer: "Sarah Wilson",
        comment: "Lorem ipsum dolor sit amet",
        status: "failed",
        result: "$1,200.00",
        json: '{"name": "Sarah Wilson", "age": 32, "email": "sarah.wilson@example.com"}',
    },
    {
        referenceNo: "5769588jg",
        batchNo: "123-456",
        date: new Date("2025-04-05"), // Date object
        customer: "Michael Brown",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$3,100.00",
    },
    {
        referenceNo: "5769589jg",
        batchNo: "124-457",
        date: "2025-04-05", // ISO date string
        customer: "Emily Davis",
        comment: "Lorem ipsum dolor sit amet",
        status: "finished",
        result: "$800.00",
    },
    {
        referenceNo: "5769590jg",
        batchNo: "124-457",
        date: 1743897600000, // Unix timestamp (milliseconds) - 2025-04-05
        customer: "David Miller",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$1,750.00",
    },
    {
        referenceNo: "5769591jg",
        batchNo: "125-458",
        date: "05.04.2025", // String format
        customer: "Lisa Anderson",
        comment: "Lorem ipsum dolor sit amet",
        status: "finished",
        result: "$2,900.00",
    },
    {
        referenceNo: "5769592jg",
        batchNo: "125-458",
        date: 1743984000, // Unix timestamp (seconds) - 2025-04-06
        customer: "James Taylor",
        comment: "Lorem ipsum dolor sit amet",
        status: "failed",
        result: "$500.00",
    },
    {
        referenceNo: "5769593jg",
        batchNo: "125-458",
        date: "2025-04-08T10:30:00Z", // ISO string with time
        customer: "Jennifer White",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$4,200.00",
    },
    {
        referenceNo: "5769594jg",
        batchNo: "125-458",
        date: new Date("2025-04-06"), // Date object
        customer: "Jennifer White",
        comment: "Lorem ipsum dolor sit amet",
        status: "active",
        result: "$4,200.00",
    },
    {
        referenceNo: "5769595jg",
        batchNo: "125-458",
        date: 1744156800, // Unix timestamp (seconds) - 2025-04-07
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
        name: "This is a long name that will break all designs",
        lastModified: "2025-01-20T14:22:00Z", // ISO string
        testValue: "381e",
        prodValue: "381e",
        successRate: "100",
        failureRate: "0",
    },
    {
        name: "30Day",
        lastModified: 1737456900, // Unix timestamp (seconds) - 2025-01-20T11:15:00Z
        testValue: "6ebd",
        prodValue: "6ebd",
        successRate: "100",
        failureRate: "0",
        folder: "Old",
    },
    {
        name: "Hardship",
        lastModified: new Date("2025-01-15T09:30:00Z"), // Date object
        testValue: "4de3",
        prodValue: null,
        successRate: "0",
        failureRate: "0",
        folder: "Old",
    },
    {
        name: "New Project",
        lastModified: 1737885600, // Unix timestamp (seconds) - 2025-01-25T10:00:00Z
        testValue: "abc1",
        prodValue: "abc1",
        successRate: "95",
        failureRate: "5",
        folder: "Active",
    },
    {
        name: "Beta Test",
        lastModified: "2025-01-24T16:30:00Z", // ISO string
        testValue: "def2",
        prodValue: null,
        successRate: "80",
        failureRate: "20",
        folder: "Active",
    },
    {
        name: "Legacy System",
        lastModified: 1736508300, // Unix timestamp (seconds) - 2025-01-10T08:45:00Z
        testValue: "ghi3",
        prodValue: "ghi3",
        successRate: "60",
        failureRate: "40",
        folder: "Old",
    },
];

export const mockFolders: FolderData[] = [
    {
        name: "Old",
        playgrounds: mockPlaygrounds.filter((p) => p.folder === "Old"),
    },
    {
        name: "Active",
        playgrounds: mockPlaygrounds.filter((p) => p.folder === "Active"),
    },
];

// Simulate API delay for realistic behavior
export const mockDelay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));
