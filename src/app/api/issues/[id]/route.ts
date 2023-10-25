import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatIssueDates } from "@/lib/utils";
import { z } from "zod";

export async function GET(req: NextRequest, route: { params: { id: string } }) {
  try {
    const { params } = route;
    const issue = await db.issue.findFirst({
      where: {
        id: params.id,
      },
    });
    if (!issue)
      return NextResponse.json({ error: "Issue not found" }, { status: 404 });

    const formatedIssue = formatIssueDates(issue);

    return NextResponse.json(formatedIssue, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Algo deu errado, tente novamente mais tarde" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  route: { params: { id: string } }
) {
  try {
    const { params } = route;
    const deletedIssue = await db.issue.delete({
      where: {
        id: params.id,
      },
    });

    console.log({ deletedIssue });
    return NextResponse.json(deletedIssue, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Algo deu errado, tente novamente mais tarde" },
      { status: 500 }
    );
  }
}

const putIssueSchema = z.object({
  title: z.string().min(3).max(255).optional(),
  description: z.string().min(3).max(1000).optional(),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
});

export type PutIssue = z.infer<typeof putIssueSchema>;

export async function PUT(req: NextRequest, route: { params: { id: string } }) {
  try {
    const { params } = route;
    const body = await req.json();
    const validation = putIssueSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const issue = validation.data;
    const updatedIssue = await db.issue.update({
      where: {
        id: params.id,
      },
      data: {
        ...issue,
      },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Algo deu errado, tente novamente mais tarde" },
      { status: 500 }
    );
  }
}
