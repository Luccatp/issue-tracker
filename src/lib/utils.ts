import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DatabaseIssue, Issue } from "./types/Issue";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatIssueDates(issue: DatabaseIssue) {
  if (!issue) return null;
  const formatedCreatedAt = format(issue.createdAt, "dd/MM/yyyy");
  const formatedUpdatedAt = format(issue.updatedAt, "dd/MM/yyyy");
  return {
    ...issue,
    createdAt: formatedCreatedAt,
    updatedAt: formatedUpdatedAt,
  };
}
