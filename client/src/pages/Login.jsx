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
import loginSchema from "@/schema/loginSchema";
import { userLogin } from "@/services/authServices";
import { errorHandler } from "@/lib/errorHandlre";
import { useDispatch } from "react-redux";
import { setAuth } from "@/store/auth/authSlice";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginFormId = useId();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function onSubmit(data) {
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };

      const response = await userLogin(payload);

      if (response.success) {
        dispatch(setAuth(response?.user));
        toast.success(response?.message);
        navigate("/dashboard");
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
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>
            Sign in to continue managing your tasks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="mb-3">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor={`${loginFormId}-email`}
                      className="text-[16px] flex items-center gap-0"
                    >
                      Email<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      type="email"
                      id={`${loginFormId}-email`}
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
                      htmlFor={`${loginFormId}-password`}
                      className="text-[16px] flex items-center gap-0"
                    >
                      Password<span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={`${showPassword ? "text" : "password"}`}
                        id={`${loginFormId}-password`}
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        autoComplete="current-password"
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
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full py-5.5 cursor-pointer bg-black/80 hover:bg-black"
            >
              {form.formState.isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
            <p className="mt-5 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-primary hover:underline underline-offset-4"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default Login;
