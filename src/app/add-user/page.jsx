"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { redirect } from "next/navigation";

const AddUser = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.acknowledged) {
      redirect("/");
    }
  };

  return (
    <div className="max-w-7xl mx-auto min-h-screen py-2 justify-center items-center flex flex-col px-4">
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        <HomeIcon aria-hidden="true" />
        Home
      </Link>
      {/* Bordered card wrapping the form, matching the UserCard surface. */}
      <form
        onSubmit={handleSubmit}
        className="mt-5 w-full max-w-md rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
            <Input id="fieldgroup-name" name="name" placeholder="Jordan Lee" />
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
            <Input
              id="fieldgroup-email"
              name="email"
              type="email"
              placeholder="name@example.com"
            />
            <FieldDescription>
              We&apos;ll send updates to this address.
            </FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default AddUser;
