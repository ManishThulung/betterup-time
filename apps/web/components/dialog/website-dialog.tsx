"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/web/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/web/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/web/components/ui/form";
import { Input } from "@repo/web/components/ui/input";
import { api } from "@repo/web/config/http-request";
import { Globe, Loader2, Plus, Type } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  url: z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL")
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      "URL must start with http:// or https://"
    ),
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
});

type FormData = z.infer<typeof formSchema>;

interface CreateWebsiteDialogProps {
  token: string;
  onWebsiteCreated?: () => void;
}

export function WebsiteDialog({
  onWebsiteCreated,
  token,
}: CreateWebsiteDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      title: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await api.post("/website", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "response");
      if (response.status !== 201) {
        throw new Error("Failed to create website");
      }

      form.reset();
      setOpen(false);
      onWebsiteCreated?.();
    } catch (error) {
      console.log(error, "error on adding website");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="hero"
          className="shadow-glow hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          Add Website
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gradient-card border-primary/20 shadow-card">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            Add New Website
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-base">
            Add a website to start monitoring its uptime and performance across
            multiple regions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-6"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    Website URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      className="h-11 bg-background/50 border-primary/20 focus:border-primary transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    Enter the full URL including http:// or https://
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Type className="h-4 w-4 text-primary" />
                    Display Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Awesome Website"
                      className="h-11 bg-background/50 border-primary/20 focus:border-primary transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs text-muted-foreground">
                    A friendly name to identify your website in the dashboard
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="hero"
                disabled={isLoading}
                className="min-w-[120px]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Website
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
