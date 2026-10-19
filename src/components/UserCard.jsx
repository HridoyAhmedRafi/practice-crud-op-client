"use client";

import Link from "next/link";
import { Mail, User as UserIcon } from "lucide-react";
import { cn } from "cn";
import { EditUser } from "./EditUser";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";

/**
 * Card showing a single user's basic info.
 * A user only has a name and an email, so there is no profile picture to
 * render — we fall back to a dummy, social-media style rounded avatar.
 */
const UserCard = ({ user, className }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/users/${user._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.deletedCount > 0) {
      router.refresh();
    }
  };

  if (!user) return null;

  const { name, email } = user;

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm",
        // Hover animation: lift the card, deepen the shadow and highlight the border.
        "transition-all duration-300 ease-out will-change-transform hover:-translate-y-1 hover:border-ring/60 hover:bg-muted/40 hover:shadow-lg hover:shadow-foreground/5",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {/* Dummy default avatar: no profile picture exists on a user. */}
      <div
        aria-hidden="true"
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-muted to-muted-foreground/20 text-muted-foreground ring-2 ring-background transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      >
        <UserIcon className="size-6" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{name || "Unnamed user"}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Mail className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{email || "No email"}</span>
        </p>
        <div className="mt-2 flex gap-2">
          <EditUser user={user} />
          <Link href={`/user/${user._id}`} className={buttonVariants()}>
            Details
          </Link>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
