"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Issue, Status, StatusKeys } from "@/lib/types/Issue";
import { format } from "date-fns";
import { PutIssue } from "@/app/api/issues/[id]/route";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { is } from "date-fns/locale";

interface IssueCardProps {}

const IssueCard: FC<IssueCardProps> = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery<Issue>({
    queryKey: ["issue", id],
    queryFn: async () => {
      const response = await fetch(`/api/issues/${id}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return data;
    },
    retry: 2,
  });

  const mutation = useMutation<PutIssue, { status: number }, PutIssue>({
    mutationFn: async (data) => {
      const updatedIssue = await fetch(`/api/issues/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (updatedIssue.status === 404) {
        throw new Error("Chamado não encontrado");
      }
      if (!updatedIssue.ok) {
        throw new Error("Erro ao atualizar chamado");
      }
      return updatedIssue.json();
    },
  });

  if (error) return <p>Erro ao carregar</p>;

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-5">
      <Select
        disabled={mutation.isPending}
        defaultValue={data?.status}
        onValueChange={(value: StatusKeys) => {
          mutation.mutate({ status: value });
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder="Mude o status"
            defaultValue={data?.status}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OPEN">{Status["OPEN"]}</SelectItem>
          <SelectItem value="CLOSED">{Status["CLOSED"]}</SelectItem>
          <SelectItem value="IN_PROGRESS">{Status["IN_PROGRESS"]}</SelectItem>
        </SelectContent>
      </Select>
      <Card>
        <CardHeader>
          <CardTitle className="max-w-full break-all">{data?.title}</CardTitle>
          <CardDescription className="max-w-full break-all grid">
            <span>Data de criação: {data?.createdAt}</span>
            <span>Ultima alteração: {data?.updatedAt}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="break-all max-h-64 overflow-auto">
            {data?.description}
          </p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IssueCard;
