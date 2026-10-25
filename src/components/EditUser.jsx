"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export function EditUser({ user }) {
  const router = useRouter();
  const { _id } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = Object.fromEntries(formData.entries());

    const res = await fetch(`http://localhost:5000/users/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });

    const data = await res.json();
    console.log("Updated user response from server", data);

    if (data.modifiedCount > 0) {
      router.refresh();
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" className="cursor-pointer">
            Edit
          </Button>
        }
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue={user.name} />
            </Field>
            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input id="email" name="email" defaultValue={user.email} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose className='cursor-pointer' render={<Button variant="outline">Cancel</Button>} />
            <DialogClose className='cursor-pointer' render={<Button type="submit">Save changes</Button>} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
