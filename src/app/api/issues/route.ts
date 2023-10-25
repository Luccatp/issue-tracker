import { db } from "@/lib/db";
// import { formatIssueDates } from "@/lib/utils";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(1000),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const issue = validation.data;

  const issueRecord = await db.issue.create({
    data: { ...issue },
  });

  return NextResponse.json(issueRecord, { status: 201 });
}

export async function GET() {
  const issues = await db.issue.findMany({});
  const sortedIssues = issues.sort((a, b) => {
    if (a.status === "OPEN" && b.status !== "OPEN") {
      return -1;
    }
    if (a.status !== "OPEN" && b.status === "OPEN") {
      return 1;
    }
    return 0;
  });
  const correctIssues = sortedIssues.map((issue) => {
    // const formatedDateIssue = formatIssueDates(issue);
    if (issue.status === "OPEN") {
      return { ...issue, status: "Aberto" };
    }
    if (issue.status === "CLOSED") {
      return { ...issue, status: "Fechado" };
    }
    if (issue.status === "IN_PROGRESS") {
      return { ...issue, status: "Em andamento" };
    }
  });

  return NextResponse.json(correctIssues, { status: 200 });
}
