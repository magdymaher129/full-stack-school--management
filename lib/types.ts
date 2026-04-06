export enum FeeStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  WAIVED = "WAIVED",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  OVERDUE = "OVERDUE",
  TRANSFERRED = "TRANSFERRED",
  CANCELLED = "CANCELLED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum Role {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export enum ClassType {
  NURSERY = "NURSERY",
  LKG = "LKG",
  UKG = "UKG",
  FIRST = "FIRST",
  SECOND = "SECOND",
  THIRD = "THIRD",
  FOURTH = "FOURTH",
  FIFTH = "FIFTH",
  SIXTH = "SIXTH",
  SEVENTH = "SEVENTH",
  EIGHTH = "EIGHTH",
  NINTH = "NINTH",
  TENTH = "TENTH",
  ELEVENTH = "ELEVENTH",
  TWELFTH = "TWELFTH",
}

export type Section =
  | "A"|"B"|"C"|"D"|"E"|"F"|"G"|"H"|"I"|"J"|"K"|"L"|"M"|"N"|"O"|"P"|"Q"|"R"|"S"|"T"|"U"|"V"|"W"|"X"|"Y"|"Z";

export interface User {
  id: number;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  classId: number | null;
  role: Role;
  gender: Gender;
  dateOfBirth: string;
  admissionNumber: string;
  rollNumber: string;
  address: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  admissionDate: string;
  status: FeeStatus;
  section: Section;
  classType: ClassType;
  createdAt: string;
  updatedAt: string;
}

export interface Fee {
  id: number;
  name: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface StudentFee {
  id: number;
  studentId: number;
  feeId: number;
  status: FeeStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: Role;
  gender: Gender;
  dateOfBirth: string;
  address: string;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentWithRelations extends Student {
  fees?: (StudentFee & { fee?: Fee })[];
  class?: Class | null;
}

export type CreateStudentInput = Omit<Student, "id" | "createdAt" | "updatedAt">;
export type UpdateStudentInput = Partial<CreateStudentInput>;
export type CreateTeacherInput = Omit<Teacher, "id" | "createdAt" | "updatedAt">;
export type CreateFeeInput = Omit<Fee, "id" | "createdAt" | "updatedAt">;
export type CreateClassInput = Omit<Class, "id" | "createdAt" | "updatedAt">;
export type CreateStudentFeeInput = Omit<StudentFee, "id" | "createdAt" | "updatedAt">;

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}