"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface PageProps {}

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "O titulo deve ter pelo menos 2 caracteres.",
    })
    .max(100, {
      message: "O titulo deve ter no maximo 100 caracteres.",
    }),
  description: z.string().min(10, {
    message: "Descreva o problema com no minimo 10 caracteres.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Page: FC<PageProps> = ({}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true);
    fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        toast({
          title: "Chamado criado com sucesso!",
          description: "Obrigado por nos ajudar a melhorar!",
          variant: "default",
        });
      })
      .catch(() => {
        toast({
          title: "Erro ao criar chamado!",
          description:
            "Ocorreu um erro ao criar o chamado, tente novamente mais tarde!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-32">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input
                      data-cy="add-issue-title-input"
                      placeholder="Problema no login"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Esse vai ser o titulo do seu chamado
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      data-cy="add-issue-description-input"
                      placeholder="Nos conta mais sobre o seu problema..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Tente deixar sua descrição mais detalhada possivel
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              data-cy="add-issue-submit-button"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
