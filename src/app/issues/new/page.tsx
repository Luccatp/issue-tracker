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
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    fetch("/api/issues", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <MaxWidthWrapper>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titulo</FormLabel>
                <FormControl>
                  <Input placeholder="Problema no login" {...field} />
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default Page;
