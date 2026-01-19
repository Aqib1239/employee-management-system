// Mock data for the Employee Management System

// Mock Users
export const mockUsers = [
    {
        id: "1",
        name: "John Admin",
        email: "admin@company.com",
        role: "admin",
        department: "Management",
        status: "active",
        joinDate: "2020-01-15",
    },
    {
        id: "2",
        name: "Sarah Lead",
        email: "lead@company.com",
        role: "team-lead",
        department: "Engineering",
        status: "active",
        joinDate: "2021-03-20",
    },
    {
        id: "3",
        name: "Mike Employee",
        email: "employee@company.com",
        role: "employee",
        department: "Engineering",
        status: "active",
        joinDate: "2022-06-10",
    },
]

// Mock Employees
export const mockEmployees = [
    {
        id: "1",
        name: "John Admin",
        email: "admin@company.com",
        role: "admin",
        department: "Management",
        status: "active",
        joinDate: "2020-01-15",
        salary: 120000,
        position: "CEO",
    },
    {
        id: "2",
        name: "Sarah Lead",
        email: "lead@company.com",
        role: "team-lead",
        department: "Engineering",
        status: "active",
        joinDate: "2021-03-20",
        salary: 95000,
        position: "Tech Lead",
        managerId: "1",
    },
    {
        id: "3",
        name: "Mike Employee",
        email: "employee@company.com",
        role: "employee",
        department: "Engineering",
        status: "active",
        joinDate: "2022-06-10",
        salary: 75000,
        position: "Software Engineer",
        managerId: "2",
    },
    {
        id: "4",
        name: "Emma Wilson",
        email: "emma@company.com",
        role: "employee",
        department: "Engineering",
        status: "active",
        joinDate: "2022-08-15",
        salary: 72000,
        position: "Frontend Developer",
        managerId: "2",
    },
    {
        id: "5",
        name: "James Brown",
        email: "james@company.com",
        role: "employee",
        department: "Engineering",
        status: "active",
        joinDate: "2023-01-05",
        salary: 70000,
        position: "Backend Developer",
        managerId: "2",
    },
    {
        id: "6",
        name: "Lisa Chen",
        email: "lisa@company.com",
        role: "team-lead",
        department: "Design",
        status: "active",
        joinDate: "2021-05-12",
        salary: 90000,
        position: "Design Lead",
        managerId: "1",
    },
    {
        id: "7",
        name: "David Kim",
        email: "david@company.com",
        role: "employee",
        department: "Design",
        status: "active",
        joinDate: "2022-09-20",
        salary: 68000,
        position: "UI Designer",
        managerId: "6",
    },
    {
        id: "8",
        name: "Anna Martinez",
        email: "anna@company.com",
        role: "employee",
        department: "HR",
        status: "active",
        joinDate: "2021-11-30",
        salary: 65000,
        position: "HR Specialist",
        managerId: "1",
    },
    {
        id: "9",
        name: "Tom Harris",
        email: "tom@company.com",
        role: "employee",
        department: "Engineering",
        status: "inactive",
        joinDate: "2020-07-18",
        salary: 78000,
        position: "DevOps Engineer",
        managerId: "2",
    },
    {
        id: "10",
        name: "Rachel Green",
        email: "rachel@company.com",
        role: "employee",
        department: "Marketing",
        status: "active",
        joinDate: "2023-02-28",
        salary: 62000,
        position: "Marketing Coordinator",
        managerId: "1",
    },
]

// Mock Attendance Records
export const mockAttendance = [
    {
        id: "1",
        employeeId: "3",
        employeeName: "Mike Employee",
        date: "2026-01-17", // Friday
        punchIn: "09:00",
        punchOut: "18:00",
        status: "present",
        workHours: 9,
    },
    {
        id: "2",
        employeeId: "3",
        employeeName: "Mike Employee",
        date: "2026-01-16", // Thursday
        punchIn: "09:15",
        punchOut: "18:00",
        status: "late",
        workHours: 8.75,
    },
    {
        id: "3",
        employeeId: "3",
        employeeName: "Mike Employee",
        date: "2026-01-14", // Wednesday
        punchIn: "09:00",
        punchOut: "13:00",
        status: "half-day",
        workHours: 4,
    },
    {
        id: "4",
        employeeId: "3",
        employeeName: "Mike Employee",
        date: "2026-01-13", // Tuesday
        punchIn: null,
        punchOut: null,
        status: "absent",
        workHours: 0,
    },
    {
        id: "5",
        employeeId: "3",
        employeeName: "Mike Employee",
        date: "2026-01-12", // Monday
        punchIn: "08:55",
        punchOut: "18:10",
        status: "present",
        workHours: 9.25,
    },
    {
        id: "6",
        employeeId: "4",
        employeeName: "Emma Wilson",
        date: "2026-01-09", // Friday
        punchIn: "09:00",
        punchOut: "18:00",
        status: "present",
        workHours: 9,
    },
    {
        id: "7",
        employeeId: "5",
        employeeName: "James Brown",
        date: "2026-01-08", // Thursday
        punchIn: "09:30",
        punchOut: "18:30",
        status: "late",
        workHours: 9,
    },
    {
        id: "8",
        employeeId: "7",
        employeeName: "David Kim",
        date: "2026-01-07", // Wednesday
        punchIn: "09:00",
        punchOut: null,
        status: "present",
        workHours: 4.5,
    },
];


// Mock Leave Requests
export const mockLeaveRequests = [
    {
        id: "1",
        employeeId: "3",
        employeeName: "Mike Employee",
        type: "sick",
        startDate: "2025-01-20",
        endDate: "2025-01-21",
        reason: "Feeling unwell",
        status: "pending",
        appliedOn: "2025-01-16",
    },
    {
        id: "2",
        employeeId: "4",
        employeeName: "Emma Wilson",
        type: "annual",
        startDate: "2025-02-01",
        endDate: "2025-02-05",
        reason: "Family vacation",
        status: "pending",
        appliedOn: "2025-01-15",
    },
    {
        id: "3",
        employeeId: "5",
        employeeName: "James Brown",
        type: "casual",
        startDate: "2025-01-25",
        endDate: "2025-01-25",
        reason: "Personal work",
        status: "approved",
        appliedOn: "2025-01-10",
    },
    {
        id: "4",
        employeeId: "7",
        employeeName: "David Kim",
        type: "sick",
        startDate: "2025-01-10",
        endDate: "2025-01-11",
        reason: "Doctor appointment",
        status: "rejected",
        appliedOn: "2025-01-08",
    },
    {
        id: "5",
        employeeId: "3",
        employeeName: "Mike Employee",
        type: "annual",
        startDate: "2024-12-25",
        endDate: "2024-12-27",
        reason: "Christmas holiday",
        status: "approved",
        appliedOn: "2024-12-15",
    },
    {
        id: "6",
        employeeId: "8",
        employeeName: "Anna Martinez",
        type: "emergency",
        startDate: "2025-01-18",
        endDate: "2025-01-18",
        reason: "Family emergency",
        status: "pending",
        appliedOn: "2025-01-17",
    },
]

// Mock Holidays
export const mockHolidays = [
    { id: "1", name: "New Year's Day", date: "2025-01-01", type: "public" },
    { id: "2", name: "Martin Luther King Jr. Day", date: "2025-01-20", type: "public" },
    { id: "3", name: "Presidents' Day", date: "2025-02-17", type: "public" },
    { id: "4", name: "Good Friday", date: "2025-04-18", type: "restricted" },
    { id: "5", name: "Memorial Day", date: "2025-05-26", type: "public" },
    { id: "6", name: "Independence Day", date: "2025-07-04", type: "public" },
    { id: "7", name: "Labor Day", date: "2025-09-01", type: "public" },
    { id: "8", name: "Columbus Day", date: "2025-10-13", type: "restricted" },
    { id: "9", name: "Veterans Day", date: "2025-11-11", type: "public" },
    { id: "10", name: "Thanksgiving Day", date: "2025-11-27", type: "public" },
    { id: "11", name: "Christmas Day", date: "2025-12-25", type: "public" },
]

// Mock Salary Records
export const mockSalaryRecords = [
    {
        id: "1",
        employeeId: "3",
        employeeName: "Mike Employee",
        month: "2025-01",
        basicSalary: 6250,
        allowances: 500,
        deductions: 450,
        netSalary: 6300,
        status: "pending",
    },
    {
        id: "2",
        employeeId: "3",
        employeeName: "Mike Employee",
        month: "2024-12",
        basicSalary: 6250,
        allowances: 500,
        deductions: 350,
        netSalary: 6400,
        status: "paid",
    },
    {
        id: "3",
        employeeId: "3",
        employeeName: "Mike Employee",
        month: "2024-11",
        basicSalary: 6250,
        allowances: 500,
        deductions: 400,
        netSalary: 6350,
        status: "paid",
    },
    {
        id: "4",
        employeeId: "4",
        employeeName: "Emma Wilson",
        month: "2025-01",
        basicSalary: 6000,
        allowances: 450,
        deductions: 400,
        netSalary: 6050,
        status: "pending",
    },
    {
        id: "5",
        employeeId: "5",
        employeeName: "James Brown",
        month: "2025-01",
        basicSalary: 5833,
        allowances: 400,
        deductions: 380,
        netSalary: 5853,
        status: "pending",
    },
    {
        id: "6",
        employeeId: "7",
        employeeName: "David Kim",
        month: "2025-01",
        basicSalary: 5666,
        allowances: 350,
        deductions: 350,
        netSalary: 5666,
        status: "pending",
    },
]

// Helper functions
export function getEmployeeById(id) {
    return mockEmployees.find((e) => e.id === id)
}

export function getEmployeesByManager(managerId) {
    return mockEmployees.filter((e) => e.managerId === managerId)
}

export function getAttendanceByEmployee(employeeId) {
    return mockAttendance.filter((a) => a.employeeId === employeeId)
}

export function getLeavesByEmployee(employeeId) {
    return mockLeaveRequests.filter((l) => l.employeeId === employeeId)
}

export function getSalaryByEmployee(employeeId) {
    return mockSalaryRecords.filter((s) => s.employeeId === employeeId)
}

export function getPendingLeaveRequests() {
    return mockLeaveRequests.filter((l) => l.status === "pending")
}

export function getTeamLeaveRequests(managerId) {
    const teamMembers = getEmployeesByManager(managerId)
    const teamIds = teamMembers.map((m) => m.id)
    return mockLeaveRequests.filter((l) => teamIds.includes(l.employeeId))
}

export function getTeamAttendance(managerId) {
    const teamMembers = getEmployeesByManager(managerId)
    const teamIds = teamMembers.map((m) => m.id)
    return mockAttendance.filter((a) => teamIds.includes(a.employeeId))
}

// Stats helpers
export function getAttendanceStats() {
    const total = mockAttendance.length
    const present = mockAttendance.filter((a) => a.status === "present").length
    return Math.round((present / total) * 100)
}

export function getTotalPayroll() {
    return mockSalaryRecords.filter((s) => s.month === "2025-01").reduce((sum, s) => sum + s.netSalary, 0)
}