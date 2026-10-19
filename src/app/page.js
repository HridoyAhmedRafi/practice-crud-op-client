import Link from "next/link";
import { Plus as PlusIcon } from "lucide-react";

import UserCard from "@/components/UserCard";
import { buttonVariants } from "@/components/ui/button";

const HomePage = async () => {
  let users = [];
  let failed = false;

  try {
    const res = await fetch("http://localhost:5000/users", {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      users = Array.isArray(data) ? data : [];
    } else {
      failed = true;
    }
  } catch {
    failed = true;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Home Page</h1>
          <p className="text-sm text-muted-foreground">
            {users.length} {users.length === 1 ? "user" : "users"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/add-user" className={buttonVariants()}>
            <PlusIcon aria-hidden="true" />
            Add User
          </Link>
        </div>
      </div>

      {failed && (
        <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          Could not load users. Is the API at localhost:5000 running?
        </p>
      )}

      {users.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No users yet. Use the Add User button to create one.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
