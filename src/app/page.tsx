import IssuesTable from "@/components/IssuesTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";

export default function Home() {
  return (
    <MaxWidthWrapper className="h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <IssuesTable />
    </MaxWidthWrapper>
  );
}
