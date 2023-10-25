import { Issue as PrismaIssue, Status as DatabaseStatus } from "@prisma/client";

export type IssueTableType = Issue[] | null;

export enum Status {
  OPEN = "Aberto",
  CLOSED = "Fechado",
  IN_PROGRESS = "Em andamento",
}

export interface ReturnIssueTable {
  data: IssueTableType;
}

export interface Issue {
  id: number;
  status: Status;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type DatabaseIssue = PrismaIssue | null;

export type StatusKeys = (typeof DatabaseStatus)[keyof typeof DatabaseStatus];
