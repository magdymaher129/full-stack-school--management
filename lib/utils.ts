import { ClassType } from "./types";
import { CT_MAP } from "../lib/constants";

export const fmtCT = (ct: ClassType): string => CT_MAP[ct] ?? ct;

export const fmtStatus = (s: string): string => s.replace(/_/g, " ");

export const fmtDate = (d: string): string => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

export const fmtCurrency = (n: number): string =>
    "₹" + Number(n).toLocaleString("en-IN");

export const nextId = (arr: { id: number }[]): number =>
    arr.length > 0 ? Math.max(...arr.map((i) => i.id)) + 1 : 1;

export const fmtGender = (g: string): string =>
    g.charAt(0) + g.slice(1).toLowerCase();

export const fmtSubject = (s: string): string => s.replace(/_/g, " ");

export const cn = (...classes: (string | false | undefined | null)[]): string =>
    classes.filter(Boolean).join(" ");