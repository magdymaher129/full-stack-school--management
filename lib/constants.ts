import { ClassType, FeeStatus, Gender, Section } from "./types";

export const CLASS_TYPES: ClassType[] = [
  ClassType.NURSERY, ClassType.LKG, ClassType.UKG,
  ClassType.FIRST, ClassType.SECOND, ClassType.THIRD, ClassType.FOURTH, ClassType.FIFTH,
  ClassType.SIXTH, ClassType.SEVENTH, ClassType.EIGHTH,
  ClassType.NINTH, ClassType.TENTH, ClassType.ELEVENTH, ClassType.TWELFTH,
];

export const SECTIONS: Section[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("") as Section[];

export const GENDERS: Gender[] = [Gender.MALE, Gender.FEMALE, Gender.OTHER];

export const FEE_STATUSES: FeeStatus[] = [
  FeeStatus.PENDING, FeeStatus.PAID, FeeStatus.WAIVED,
  FeeStatus.PARTIALLY_PAID, FeeStatus.OVERDUE,
  FeeStatus.TRANSFERRED, FeeStatus.CANCELLED,
];

export const SUBJECTS = [
  "MATHEMATICS", "PHYSICS", "CHEMISTRY", "BIOLOGY", "SCIENCE",
  "ENGLISH", "ARABIC", "COMPUTER_SCIENCE", "SOCIAL_SCIENCE", "HISTORY", "GEOGRAPHY",
] as const;

export const CT_MAP: Record<ClassType, string> = {
  [ClassType.NURSERY]: "Nursery",
  [ClassType.LKG]: "LKG",
  [ClassType.UKG]: "UKG",
  [ClassType.FIRST]: "1st",
  [ClassType.SECOND]: "2nd",
  [ClassType.THIRD]: "3rd",
  [ClassType.FOURTH]: "4th",
  [ClassType.FIFTH]: "5th",
  [ClassType.SIXTH]: "6th",
  [ClassType.SEVENTH]: "7th",
  [ClassType.EIGHTH]: "8th",
  [ClassType.NINTH]: "9th",
  [ClassType.TENTH]: "10th",
  [ClassType.ELEVENTH]: "11th",
  [ClassType.TWELFTH]: "12th",
};

export const STATUS_CLASSES: Record<string, string> = {
  PAID: "bg-emerald-100 text-emerald-700",
  PENDING: "bg-amber-100 text-amber-700",
  OVERDUE: "bg-red-100 text-red-700",
  PARTIALLY_PAID: "bg-orange-100 text-orange-700",
  WAIVED: "bg-gray-200 text-gray-600",
  TRANSFERRED: "bg-sky-100 text-sky-700",
  CANCELLED: "bg-red-50 text-red-300 line-through",
};