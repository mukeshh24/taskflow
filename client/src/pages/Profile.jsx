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
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { EyeOff } from "lucide-react";
import { toast } from "sonner";
import AppBradcrumb from "@/components/common/AppBradcrumb";
import { Lock } from "lucide-react";
import { TriangleAlert } from "lucide-react";
import { User } from "lucide-react";
import { errorHandler } from "@/lib/errorHandlre";
import {
  userDelete,
  userLogout,
  userProfileUpdate,
} from "@/services/authServices";
import { useDispatch } from "react-redux";
import { removeAuth, setAuth } from "@/store/auth/authSlice";
import profileSchema from "@/schema/profileSchema";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signupFormId = useId();

  const [showPassword, setShowPassword] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const payload = {
        name: data.name,
        password: data.password,
      };

      const response = await userProfileUpdate(payload);

      if (response.success) {
        dispatch(setAuth(response.user));
        toast.success(response?.message);
        navigate("/profile");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.log(errorHandler(error));
    }
  }

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (response.success) {
        dispatch(removeAuth());
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.log(errorHandler(error));
    }
  };

  const handleDelete = async () => {
    try {
      const response = await userDelete();
      if (response.success) {
        dispatch(removeAuth());
        toast.success(response.message);
        navigate("/login");
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.log(errorHandler(error));
    }
  };

  useEffect(() => {
    form.reset({
      name: auth?.user?.name || "",
      email: auth?.user?.email || "",
      password: "",
    });
  }, [auth, form]);

  return (
    <section className="w-full">
      <AppBradcrumb currentPage="Profile" />
      <div className="flex flex-col gap-5">
        <div className="flex items-start flex-col gap-0">
          <p className="text-black font-semibold text-lg capitalize">
            Profile
          </p>
          <span className="text-black/50 text-sm">
            Manage your personal information and account settings.
          </span>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row items-start gap-5 mt-5">
        <Card className="w-full xl:max-w-md bg-zinc-50">
          <CardHeader className="flex flex-col items-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <User className="w-5 h-5 text-black" />
              <span className="text-lg font-semibold text-black">
                Account Information
              </span>
            </CardTitle>
            <CardDescription>
              <p className="text-black font-semibold text-sm">
                View and update your personal account information.
              </p>
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
                        Name
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
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        id={`${signupFormId}-email`}
                        aria-invalid={fieldState.invalid}
                        placeholder="john.doe@example.com"
                        autoComplete="email"
                        className="py-5 rounded focus-visible:ring-0"
                        readOnly
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
                        Password
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
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full py-5.5 cursor-pointer bg-black/80 hover:bg-black"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : (
                  "Edit Profile"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-5 w-full xl:max-w-85">
          <Card className="bg-zinc-50">
            <CardHeader className="flex flex-col items-center justify-center gap-2 mb-2">
              <CardTitle className="flex items-center justify-center gap-2">
                <Lock className="w-5 h-5 text-black" />
                <span className="text-lg font-semibold text-black">
                  Account Actions
                </span>
              </CardTitle>
              <CardDescription>
                <p className="text-black font-semibold text-sm">
                  Logout from your current session.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                onClick={handleLogout}
                className="w-full py-5.5 cursor-pointer bg-black/80 hover:bg-black"
              >
                Logout
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-zinc-50">
            <CardHeader className="flex flex-col items-center justify-center gap-2 mb-2">
              <CardTitle className="flex items-center justify-center gap-2">
                <TriangleAlert className="w-5 h-5 text-black" />
                <span className="text-lg font-semibold text-black">
                  Danger Zone
                </span>
              </CardTitle>
              <CardDescription>
                <p className="text-black font-semibold text-sm text-center">
                  Delete your account permanently.
                </p>
                <p className="text-black font-semibold text-sm mt-1">
                  Once deleted,
                </p>
                <ul>
                  <li>All your tasks will be permanently removed.</li>
                  <li>Your profile and account data will be deleted.</li>
                  <li>This action cannot be undone.</li>
                </ul>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                type="button"
                onClick={handleDelete}
                className="w-full py-5.5 cursor-pointer bg-red-500 hover:bg-red-700"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Profile;
