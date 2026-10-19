import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, MailIcon, User as UserIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

const USERS_URL = "http://localhost:5000/users";

async function getUser(userId) {
  try {
    const res = await fetch(`${USERS_URL}/${userId}`);

    if (res.ok) {
      const data = await res.json();
      if (data && !Array.isArray(data)) return { user: data, failed: false };
    }
  } catch {
    // Endpoint missing or API down — try the collection below.
  }

  try {
    const res = await fetch(USERS_URL);
    if (!res.ok) return { user: null, failed: true };

    const data = await res.json();
    const users = Array.isArray(data) ? data : [];

    return {
      user: users.find((candidate) => candidate._id === userId) ?? null,
      failed: false,
    };
  } catch {
    return { user: null, failed: true };
  }
}

const UserDetailsPage = async ({ params }) => {
  // In Next.js 16 `params` is a Promise and must be awaited.
  const { userId } = await params;

  const { user, failed } = await getUser(userId);

  // Real 404 only when the API answered but knew nothing about this id.
  if (!user && !failed) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        <ArrowLeftIcon aria-hidden="true" />
        Back to home
      </Link>

      {failed ? (
        <p className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Could not load this user. Is the API at localhost:5000 running?
        </p>
      ) : (
        <section className="mt-6 rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm">
          <div className="flex items-start gap-4">
            <div
              aria-hidden="true"
              className="flex size-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-muted to-muted-foreground/20 text-muted-foreground ring-2 ring-background"
            >
              <UserIcon className="size-8" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-semibold tracking-tight">
                {user.name || "Unnamed user"}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MailIcon className="size-4 shrink-0" aria-hidden="true" />
                {user.email ? (
                  <a
                    href={`mailto:${user.email}`}
                    className="truncate underline-offset-4 hover:text-foreground hover:underline"
                  >
                    {user.email}
                  </a>
                ) : (
                  <span>No email</span>
                )}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserDetailsPage;
