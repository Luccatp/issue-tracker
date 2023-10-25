import IssuesTable from "@/components/IssuesTable";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <MaxWidthWrapper className="h-[calc(100vh-3.5rem)] flex">
      <div className="min-w-full mt-20">
        <IssuesTable />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
