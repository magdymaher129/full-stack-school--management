"use client";

import { cn } from "@/lib/utils";
import { forwardRef, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, ButtonHTMLAttributes } from "react";

/* ---------- Button ---------- */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg font-semibold border-none cursor-pointer transition-all duration-200",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2.5 text-[13px]",
        variant === "primary" && "bg-primary text-white hover:bg-primary-dark hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(13,148,136,0.25)]",
        variant === "secondary" && "bg-[#F5F5F0] text-[#1A1A1A] border border-[#E5E5E0] hover:bg-[#EEE]",
        variant === "danger" && "bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

/* ---------- Input ---------- */

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border-[1.5px] border-[#E5E5E0] rounded-lg font-outfit text-sm bg-[#FAFAF8] outline-none transition-all duration-200",
        "focus:border-primary focus:shadow-[0_0_0_3px_rgba(13,148,136,0.1)] focus:bg-white",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

/* ---------- Textarea ---------- */

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border-[1.5px] border-[#E5E5E0] rounded-lg font-outfit text-sm bg-[#FAFAF8] outline-none transition-all duration-200 resize-none",
        "focus:border-primary focus:shadow-[0_0_0_3px_rgba(13,148,136,0.1)] focus:bg-white",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

/* ---------- Select ---------- */

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "w-full px-3 py-2 border-[1.5px] border-[#E5E5E0] rounded-lg font-outfit text-sm bg-[#FAFAF8] outline-none transition-all duration-200 appearance-none",
        "focus:border-primary focus:shadow-[0_0_0_3px_rgba(13,148,136,0.1)] focus:bg-white",
        "bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23737373%22%20d%3D%22M6%208L1%203h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_12px_center] pr-8",
        className
      )}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
);
Select.displayName = "Select";

/* ---------- Badge ---------- */

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide whitespace-nowrap", className)}>
      {children}
    </span>
  );
}

/* ---------- Icon Button ---------- */

export function IconButton({
  variant = "edit",
  onClick,
  title,
}: {
  variant?: "edit" | "delete" | "view";
  onClick: () => void;
  title?: string;
}) {
  const cls = {
    edit: "text-primary hover:bg-primary-50",
    delete: "text-[#DC2626] hover:bg-[#FEF2F2]",
    view: "text-[#6366F1] hover:bg-[#EEF2FF]",
  }[variant];

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-8 h-8 rounded-md border-none cursor-pointer inline-flex items-center justify-center transition-all duration-150 text-[13px] bg-transparent ${cls}`}
    >
      <i className={`fas ${variant === "edit" ? "fa-pen" : variant === "delete" ? "fa-trash" : "fa-eye"}`} />
    </button>
  );
}