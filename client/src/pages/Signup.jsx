import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "@/schema/signupSchema";
import { useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { EyeOff } from "lucide-react";
import { toast } from "sonner";
import { errorHandler } from "@/lib/errorHandlre";
import { userRegister } from "@/services/authServices";

const Signup = () => {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupFormId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await userRegister(payload);

      if (response.success) {
        toast.success(response?.message);
        navigate("/login");
        form.reset();
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.log(errorHandler(error));
    }
  }

  return (
    <section className="bg-zinc-50 w-full min-h-screen flex items-center justify-center p-5">
      <Card className="w-full sm:max-w-md">
        <CardHeader className="flex flex-col items-center">
          <div className="flex items-center gap-0.5 mb-3">
            <ClipboardList className="w-6 h-6 text-black" />
            <span className="text-2xl font-bold text-black">TaskFlow</span>
          </div>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your details below to create a new account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="mb-3">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor={`${signupFormId}-name`}
                      className="text-[16px] flex items-center gap-0"
                    >
                      Name<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      type="text"
                      id={`${signupFormId}-name`}
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="name"
                      className="py-5 rounded focus-visible:ring-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="mb-3">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor={`${signupFormId}-email`}
                      className="text-[16px] flex items-center gap-0"
                    >
                      Email<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id={`${signupFormId}-email`}
                      aria-invalid={fieldState.invalid}
                      placeholder="john.doe@example.com"
                      autoComplete="email"
                      className="py-5 rounded focus-visible:ring-0"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="mb-3">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor={`${signupFormId}-password`}
                      className="text-[16px] flex items-center gap-0"
                    >
                      Password<span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={`${showPassword ? "text" : "password"}`}
                        id={`${signupFormId}-password`}
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        autoComplete="new-password"
                        className="py-5 rounded focus-visible:ring-0"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent cursor-pointer"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="mb-3">
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor={`${signupFormId}-confirmPassword`}
                      className="text-[16px] flex items-center gap-0"
                    >
                      Confirm Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={`${showConfirmPassword ? "text" : "password"}`}
                        id={`${signupFormId}-confirmPassword`}
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        autoComplete="new-password"
                        className="py-5 rounded focus-visible:ring-0"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full py-5.5 cursor-pointer bg-black/80 hover:bg-black"
            >
              {form.formState.isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            <p className="mt-5 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Log In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Signup;
