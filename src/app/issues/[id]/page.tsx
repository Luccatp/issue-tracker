import IssueCard from "@/components/IssueCard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col mt-10 gap-6">
        <h1 className="text-3xl font-semibold">Issue</h1>
        <IssueCard />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
