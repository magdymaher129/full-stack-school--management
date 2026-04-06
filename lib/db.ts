/* ================================================================
   In-memory data store mirroring the Prisma schema.
   Every function matches the shape of a Prisma Client call,
   so swapping to real Prisma later requires only changing
   the implementation bodies — not the calling code.
   ================================================================ */

import {
    Student, Teacher, Class, Fee, StudentFee,
    CreateStudentInput, CreateTeacherInput,
    CreateFeeInput, CreateClassInput, CreateStudentFeeInput,
    Gender, Role, ClassType, FeeStatus,
} from "./types";
import { nextId } from "./utils";

/* ---------- seed data ---------- */

const seedClasses: Class[] = [
    { id: 1, name: "Nursery - A", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 2, name: "LKG - A", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 3, name: "UKG - A", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 4, name: "1st Grade - A", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 5, name: "2nd Grade - B", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 6, name: "5th Grade - A", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 7, name: "8th Grade - B", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 8, name: "10th Grade - A", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 9, name: "12th Grade - A", createdAt: "2024-01-01", updatedAt: "2024-01-01" },
];

const seedStudents: Student[] = [
    { id: 1, name: "Aarav Sharma", email: "aarav.s@school.com", classId: 4, classType: ClassType.FIRST, section: "A", gender: Gender.MALE, dateOfBirth: "2017-03-15", admissionNumber: "ADM-2024-001", rollNumber: "R001", address: "12, MG Road, City", phone: "9876543210", parentName: "Vikram Sharma", parentPhone: "9876543211", parentEmail: "vikram.s@email.com", admissionDate: "2024-04-01", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2024-04-01", updatedAt: "2024-04-01" },
    { id: 2, name: "Priya Nair", email: "priya.n@school.com", classId: 4, classType: ClassType.FIRST, section: "A", gender: Gender.FEMALE, dateOfBirth: "2017-07-22", admissionNumber: "ADM-2024-002", rollNumber: "R002", address: "45, Lake View, Town", phone: "9876543212", parentName: "Sunil Nair", parentPhone: "9876543213", parentEmail: "sunil.n@email.com", admissionDate: "2024-04-01", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2024-04-01", updatedAt: "2024-04-01" },
    { id: 3, name: "Mohammed Fahad", email: "fahad.m@school.com", classId: 5, classType: ClassType.SECOND, section: "B", gender: Gender.MALE, dateOfBirth: "2016-11-08", admissionNumber: "ADM-2024-003", rollNumber: "R001", address: "78, Pearl Street, City", phone: "9876543214", parentName: "Abdul Fahad", parentPhone: "9876543215", parentEmail: "abdul.f@email.com", admissionDate: "2024-04-02", status: FeeStatus.PENDING, role: Role.STUDENT, createdAt: "2024-04-02", updatedAt: "2024-04-02" },
    { id: 4, name: "Sneha Reddy", email: "sneha.r@school.com", classId: 1, classType: ClassType.NURSERY, section: "A", gender: Gender.FEMALE, dateOfBirth: "2019-02-14", admissionNumber: "ADM-2024-004", rollNumber: "R001", address: "23, Hill Road, City", phone: "9876543216", parentName: "Ramesh Reddy", parentPhone: "9876543217", parentEmail: "ramesh.r@email.com", admissionDate: "2024-04-03", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2024-04-03", updatedAt: "2024-04-03" },
    { id: 5, name: "Rohan Patel", email: "rohan.p@school.com", classId: 6, classType: ClassType.FIFTH, section: "A", gender: Gender.MALE, dateOfBirth: "2013-09-30", admissionNumber: "ADM-2023-005", rollNumber: "R001", address: "56, Park Avenue, Town", phone: "9876543218", parentName: "Dinesh Patel", parentPhone: "9876543219", parentEmail: "dinesh.p@email.com", admissionDate: "2023-06-15", status: FeeStatus.PARTIALLY_PAID, role: Role.STUDENT, createdAt: "2023-06-15", updatedAt: "2023-06-15" },
    { id: 6, name: "Fatima Al-Rashid", email: "fatima.ar@school.com", classId: 7, classType: ClassType.EIGHTH, section: "B", gender: Gender.FEMALE, dateOfBirth: "2011-05-18", admissionNumber: "ADM-2023-006", rollNumber: "R001", address: "90, Oasis Blvd, City", phone: "9876543220", parentName: "Omar Al-Rashid", parentPhone: "9876543221", parentEmail: "omar.ar@email.com", admissionDate: "2023-06-15", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2023-06-15", updatedAt: "2023-06-15" },
    { id: 7, name: "Arjun Menon", email: "arjun.m@school.com", classId: 7, classType: ClassType.EIGHTH, section: "B", gender: Gender.MALE, dateOfBirth: "2011-12-03", admissionNumber: "ADM-2023-007", rollNumber: "R002", address: "34, River Lane, Town", phone: "9876543222", parentName: "Ravi Menon", parentPhone: "9876543223", parentEmail: "ravi.m@email.com", admissionDate: "2023-06-16", status: FeeStatus.OVERDUE, role: Role.STUDENT, createdAt: "2023-06-16", updatedAt: "2023-06-16" },
    { id: 8, name: "Kavya Iyer", email: "kavya.i@school.com", classId: 8, classType: ClassType.TENTH, section: "A", gender: Gender.FEMALE, dateOfBirth: "2009-08-25", admissionNumber: "ADM-2022-008", rollNumber: "R001", address: "67, Temple Street, City", phone: "9876543224", parentName: "Ramesh Iyer", parentPhone: "9876543225", parentEmail: "ramesh.i@email.com", admissionDate: "2022-06-10", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2022-06-10", updatedAt: "2022-06-10" },
    { id: 9, name: "Youssef Ibrahim", email: "youssef.i@school.com", classId: 8, classType: ClassType.TENTH, section: "A", gender: Gender.MALE, dateOfBirth: "2009-01-10", admissionNumber: "ADM-2022-009", rollNumber: "R002", address: "12, Corniche Road, City", phone: "9876543226", parentName: "Ibrahim Khalil", parentPhone: "9876543227", parentEmail: "ibrahim.k@email.com", admissionDate: "2022-06-10", status: FeeStatus.PENDING, role: Role.STUDENT, createdAt: "2022-06-10", updatedAt: "2022-06-10" },
    { id: 10, name: "Ananya Gupta", email: "ananya.g@school.com", classId: 2, classType: ClassType.LKG, section: "A", gender: Gender.FEMALE, dateOfBirth: "2018-06-05", admissionNumber: "ADM-2024-010", rollNumber: "R001", address: "89, Rose Garden, Town", phone: "9876543228", parentName: "Amit Gupta", parentPhone: "9876543229", parentEmail: "amit.g@email.com", admissionDate: "2024-04-05", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2024-04-05", updatedAt: "2024-04-05" },
    { id: 11, name: "Dev Krishnan", email: "dev.k@school.com", classId: 3, classType: ClassType.UKG, section: "A", gender: Gender.MALE, dateOfBirth: "2018-04-20", admissionNumber: "ADM-2024-011", rollNumber: "R001", address: "45, Beach Road, City", phone: "9876543230", parentName: "Krishnan Nair", parentPhone: "9876543231", parentEmail: "krishnan.n@email.com", admissionDate: "2024-04-05", status: FeeStatus.WAIVED, role: Role.STUDENT, createdAt: "2024-04-05", updatedAt: "2024-04-05" },
    { id: 12, name: "Meera Joshi", email: "meera.j@school.com", classId: 6, classType: ClassType.FIFTH, section: "A", gender: Gender.FEMALE, dateOfBirth: "2013-11-12", admissionNumber: "ADM-2023-012", rollNumber: "R002", address: "23, Gandhi Nagar, Town", phone: "9876543232", parentName: "Sanjay Joshi", parentPhone: "9876543233", parentEmail: "sanjay.j@email.com", admissionDate: "2023-06-17", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2023-06-17", updatedAt: "2023-06-17" },
    { id: 13, name: "Omar Hassan", email: "omar.h@school.com", classId: 9, classType: ClassType.TWELFTH, section: "A", gender: Gender.MALE, dateOfBirth: "2007-03-28", admissionNumber: "ADM-2021-013", rollNumber: "R001", address: "56, Palm Street, City", phone: "9876543234", parentName: "Hassan Ali", parentPhone: "9876543235", parentEmail: "hassan.a@email.com", admissionDate: "2021-06-01", status: FeeStatus.PARTIALLY_PAID, role: Role.STUDENT, createdAt: "2021-06-01", updatedAt: "2021-06-01" },
    { id: 14, name: "Ishita Singh", email: "ishita.s@school.com", classId: 6, classType: ClassType.FIFTH, section: "A", gender: Gender.FEMALE, dateOfBirth: "2013-07-15", admissionNumber: "ADM-2023-014", rollNumber: "R003", address: "78, Civil Lines, Town", phone: "9876543236", parentName: "Raj Singh", parentPhone: "9876543237", parentEmail: "raj.s@email.com", admissionDate: "2023-06-18", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2023-06-18", updatedAt: "2023-06-18" },
    { id: 15, name: "Ravi Kumar", email: "ravi.k@school.com", classId: 7, classType: ClassType.EIGHTH, section: "B", gender: Gender.MALE, dateOfBirth: "2011-09-08", admissionNumber: "ADM-2023-015", rollNumber: "R003", address: "34, Station Road, City", phone: "9876543238", parentName: "Suresh Kumar", parentPhone: "9876543239", parentEmail: "suresh.k@email.com", admissionDate: "2023-06-19", status: FeeStatus.OVERDUE, role: Role.STUDENT, createdAt: "2023-06-19", updatedAt: "2023-06-19" },
    { id: 16, name: "Zara Khan", email: "zara.k@school.com", classId: 4, classType: ClassType.FIRST, section: "A", gender: Gender.FEMALE, dateOfBirth: "2017-05-30", admissionNumber: "ADM-2024-016", rollNumber: "R003", address: "90, Market Road, Town", phone: "9876543240", parentName: "Imran Khan", parentPhone: "9876543241", parentEmail: "imran.k@email.com", admissionDate: "2024-04-06", status: FeeStatus.PENDING, role: Role.STUDENT, createdAt: "2024-04-06", updatedAt: "2024-04-06" },
    { id: 17, name: "Aditya Verma", email: "aditya.v@school.com", classId: 8, classType: ClassType.TENTH, section: "A", gender: Gender.MALE, dateOfBirth: "2009-10-17", admissionNumber: "ADM-2022-017", rollNumber: "R003", address: "12, Colony Road, City", phone: "9876543242", parentName: "Prakash Verma", parentPhone: "9876543243", parentEmail: "prakash.v@email.com", admissionDate: "2022-06-11", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2022-06-11", updatedAt: "2022-06-11" },
    { id: 18, name: "Nisha Pillai", email: "nisha.p@school.com", classId: 9, classType: ClassType.TWELFTH, section: "A", gender: Gender.FEMALE, dateOfBirth: "2007-08-02", admissionNumber: "ADM-2021-018", rollNumber: "R002", address: "67, Hill View, Town", phone: "9876543244", parentName: "Pillai Menon", parentPhone: "9876543245", parentEmail: "pillai.m@email.com", admissionDate: "2021-06-02", status: FeeStatus.PAID, role: Role.STUDENT, createdAt: "2021-06-02", updatedAt: "2021-06-02" },
];

const seedTeachers: Teacher[] = [
    { id: 1, name: "Dr. Rajesh Kumar", email: "rajesh.kumar@school.com", phone: "9988776601", gender: Gender.MALE, dateOfBirth: "1978-04-12", address: "10, Faculty Quarters", subject: "MATHEMATICS", role: Role.TEACHER, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    { id: 2, name: "Fatima Al-Sayed", email: "fatima.alsayed@school.com", phone: "9988776602", gender: Gender.FEMALE, dateOfBirth: "1985-09-25", address: "15, Faculty Quarters", subject: "ARABIC", role: Role.TEACHER, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    { id: 3, name: "Prof. Suresh Nair", email: "suresh.nair@school.com", phone: "9988776603", gender: Gender.MALE, dateOfBirth: "1980-01-18", address: "20, Faculty Quarters", subject: "PHYSICS", role: Role.TEACHER, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    { id: 4, name: "Sarah Johnson", email: "sarah.johnson@school.com", phone: "9988776604", gender: Gender.FEMALE, dateOfBirth: "1988-06-30", address: "25, Faculty Quarters", subject: "ENGLISH", role: Role.TEACHER, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    { id: 5, name: "Ahmed Hassan", email: "ahmed.hassan@school.com", phone: "9988776605", gender: Gender.MALE, dateOfBirth: "1982-12-05", address: "30, Faculty Quarters", subject: "COMPUTER_SCIENCE", role: Role.TEACHER, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    { id: 6, name: "Dr. Meena Sharma", email: "meena.sharma@school.com", phone: "9988776606", gender: Gender.FEMALE, dateOfBirth: "1979-03-22", address: "35, Faculty Quarters", subject: "BIOLOGY", role: Role.TEACHER, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    { id: 7, name: "Tariq Mahmoud", email: "tariq.mahmoud@school.com", phone: "9988776607", gender: Gender.MALE, dateOfBirth: "1983-07-14", address: "40, Faculty Quarters", subject: "SOCIAL_SCIENCE", role: Role.TEACHER, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
    { id: 8, name: "Lakshmi Devi", email: "lakshmi.devi@school.com", phone: "9988776608", gender: Gender.FEMALE, dateOfBirth: "1986-11-08", address: "45, Faculty Quarters", subject: "CHEMISTRY", role: Role.TEACHER, createdAt: "2023-01-01", updatedAt: "2023-01-01" },
];

const seedFees: Fee[] = [
    { id: 1, name: "Tuition Fee", description: "Monthly tuition fee for all classes", amount: 5000, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 2, name: "Lab Fee", description: "Laboratory usage fee per term", amount: 1500, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 3, name: "Transport Fee", description: "School bus transportation fee", amount: 2000, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 4, name: "Library Fee", description: "Annual library membership and resources", amount: 500, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 5, name: "Sports Fee", description: "Annual sports and physical education", amount: 1000, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
    { id: 6, name: "Exam Fee", description: "Examination and assessment fee per term", amount: 750, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
];

function generateStudentFees(): StudentFee[] {
    const statuses = [
        FeeStatus.PAID, FeeStatus.PAID, FeeStatus.PAID, FeeStatus.PENDING,
        FeeStatus.PENDING, FeeStatus.OVERDUE, FeeStatus.PARTIALLY_PAID, FeeStatus.WAIVED,
        FeeStatus.PAID, FeeStatus.PAID, FeeStatus.PAID, FeeStatus.PENDING,
        FeeStatus.OVERDUE, FeeStatus.PAID, FeeStatus.PAID, FeeStatus.PENDING,
        FeeStatus.PAID, FeeStatus.PAID,
    ];
    const months = ["2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06"];
    const result: StudentFee[] = [];
    let si = 0;
    seedStudents.forEach((s) => {
        const feeCount = 2 + Math.floor(Math.abs(Math.sin(s.id * 7)) * 3);
        for (let i = 0; i < feeCount && i < seedFees.length; i++) {
            const st = statuses[si % statuses.length];
            si++;
            result.push({
                id: nextId(result),
                studentId: s.id,
                feeId: seedFees[i].id,
                status: st,
                createdAt: `${months[Math.floor(Math.abs(Math.sin(s.id * 3 + i)) * 6)]}-${String(10 + (s.id % 20)).padStart(2, "0")}`,
                updatedAt: new Date().toISOString(),
            });
        }
    });
    return result;
}

/* ---------- singleton store ---------- */

interface Store {
    students: Student[];
    teachers: Teacher[];
    classes: Class[];
    fees: Fee[];
    studentFees: StudentFee[];
}

function makeStore(): Store {
    return {
        students: JSON.parse(JSON.stringify(seedStudents)),
        teachers: JSON.parse(JSON.stringify(seedTeachers)),
        classes: JSON.parse(JSON.stringify(seedClasses)),
        fees: JSON.parse(JSON.stringify(seedFees)),
        studentFees: generateStudentFees(),
    }
}

const globalForDb = globalThis as unknown as { __db?: Store };
if (!globalForDb.__db) globalForDb.__db = makeStore();
const db: Store = globalForDb.__db;

/* ====================== CRUD ====================== */

// --- Students ---

export const getStudents = (): Student[] => [...db.students];

export const getStudentById = (id: number): Student | undefined =>
    db.students.find((s) => s.id === id);

export const createStudent = (data: CreateStudentInput): Student => {
    const now = new Date().toISOString();
    const student: Student = { id: nextId(db.students), ...data, createdAt: now, updatedAt: now };
    db.students.push(student);
    return student;
};

export const updateStudent = (id: number, data: Partial<CreateStudentInput>): Student | undefined => {
    const idx = db.students.findIndex((s) => s.id === id);
    if (idx === -1) return undefined;
    db.students[idx] = { ...db.students[idx], ...data, updatedAt: new Date().toISOString() };
    return db.students[idx];
};

export const deleteStudent = (id: number): boolean => {
    const idx = db.students.findIndex((s) => s.id === id);
    if (idx === -1) return false;
    db.students.splice(idx, 1);
    db.studentFees = db.studentFees.filter((sf) => sf.studentId !== id);
    return true;
};

// --- Teachers ---

export const getTeachers = (): Teacher[] => [...db.teachers];

export const getTeacherById = (id: number): Teacher | undefined =>
    db.teachers.find((t) => t.id === id);

export const createTeacher = (data: CreateTeacherInput): Teacher => {
    const now = new Date().toISOString();
    const teacher: Teacher = { id: nextId(db.teachers), ...data, createdAt: now, updatedAt: now };
    db.teachers.push(teacher);
    return teacher;
};

export const updateTeacher = (id: number, data: Partial<CreateTeacherInput>): Teacher | undefined => {
    const idx = db.teachers.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    db.teachers[idx] = { ...db.teachers[idx], ...data, updatedAt: new Date().toISOString() };
    return db.teachers[idx];
};

export const deleteTeacher = (id: number): boolean => {
    const idx = db.teachers.findIndex((t) => t.id === id);
    if (idx === -1) return false;
    db.teachers.splice(idx, 1);
    return true;
};

// --- Classes ---

export const getClasses = (): Class[] => [...db.classes];

export const getClassById = (id: number): Class | undefined =>
    db.classes.find((c) => c.id === id);

export const createClass = (data: CreateClassInput): Class => {
    const now = new Date().toISOString();
    const cls: Class = { id: nextId(db.classes), ...data, createdAt: now, updatedAt: now };
    db.classes.push(cls);
    return cls;
};

export const updateClass = (id: number, data: Partial<CreateClassInput>): Class | undefined => {
    const idx = db.classes.findIndex((c) => c.id === id);
    if (idx === -1) return undefined;
    db.classes[idx] = { ...db.classes[idx], ...data, updatedAt: new Date().toISOString() };
    return db.classes[idx];
};

export const deleteClass = (id: number): boolean => {
    const idx = db.classes.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    db.classes.splice(idx, 1);
    db.students.forEach((s) => { if (s.classId === id) s.classId = null; });
    return true;
};

// --- Fees ---

export const getFees = (): Fee[] => [...db.fees];

export const getFeeById = (id: number): Fee | undefined =>
    db.fees.find((f) => f.id === id);

export const createFee = (data: CreateFeeInput): Fee => {
    const now = new Date().toISOString();
    const fee: Fee = { id: nextId(db.fees), ...data, createdAt: now, updatedAt: now };
    db.fees.push(fee);
    return fee;
};

export const updateFee = (id: number, data: Partial<CreateFeeInput>): Fee | undefined => {
    const idx = db.fees.findIndex((f) => f.id === id);
    if (idx === -1) return undefined;
    db.fees[idx] = { ...db.fees[idx], ...data, updatedAt: new Date().toISOString() };
    return db.fees[idx];
};

export const deleteFee = (id: number): boolean => {
    const idx = db.fees.findIndex((f) => f.id === id);
    if (idx === -1) return false;
    db.fees.splice(idx, 1);
    db.studentFees = db.studentFees.filter((sf) => sf.feeId !== id);
    return true;
};

// --- StudentFees ---

export const getStudentFees = (): StudentFee[] => [...db.studentFees];

export const createStudentFee = (data: CreateStudentFeeInput): StudentFee | undefined => {
    if (db.studentFees.some((sf) => sf.studentId === data.studentId && sf.feeId === data.feeId)) {
        return undefined; // unique constraint violation
    }
    const now = new Date().toISOString();
    const sf: StudentFee = { id: nextId(db.studentFees), ...data, createdAt: now, updatedAt: now };
    db.studentFees.push(sf);
    return sf;
};

export const updateStudentFee = (id: number, data: Partial<CreateStudentFeeInput>): StudentFee | undefined => {
    const idx = db.studentFees.findIndex((sf) => sf.id === id);
    if (idx === -1) return undefined;
    db.studentFees[idx] = { ...db.studentFees[idx], ...data, updatedAt: new Date().toISOString() };
    return db.studentFees[idx];
};

export const deleteStudentFee = (id: number): boolean => {
    const idx = db.studentFees.findIndex((sf) => sf.id === id);
    if (idx === -1) return false;
    db.studentFees.splice(idx, 1);
    return true;
};