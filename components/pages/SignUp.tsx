import { useState } from "react";
import { IonContent, IonPage, useIonLoading } from "@ionic/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, authSchemaInitialValues } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";

export default function Signup() {
  const [showLoading, hideLoading] = useIonLoading();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: authSchemaInitialValues,
  });

  const onSubmit = async (values: z.infer<typeof authSchema>) => {
    await showLoading();

    const { data, error } = await supabase.auth.signUp({ email: values.email, password: values.password });
    console.log({ error, data });
    if (error) {
      setError(error.message);
    }

    await hideLoading();
  };

  return (
    <IonPage>
      <IonContent>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex w-full flex-1 flex-col justify-center gap-4 px-8 sm:max-w-md">
            <h2 className="text-3xl font-medium tracking-wider mb-2">Create Account</h2>
            {error && (
              <div className="mt-4 text-center text-sm text-red-500">
                <p>{error}</p>
              </div>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel htmlFor="email">Email</FormLabel>
                          <FormControl>
                            <Input
                              id="email"
                              type="email"
                              {...field}
                              className={cn({
                                "outline outline-red-600": fieldState.invalid,
                              })}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              {...field}
                              className={cn({
                                "outline outline-red-600": fieldState.invalid,
                              })}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign up
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/" className="underline">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
