import { Issue, columns } from "./columns";
import { DataTable } from "./DataTable";

async function getData(): Promise<Issue[]> {
  const issues = await fetch("http://localhost:3000/api/issues", {
    cache: "no-store",
  }).then((res) => res.json());

  return issues;
}

export default async function IssuesTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
