import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

/**
 * Shared 404 surface used by both the root `not-found` boundary and the
 * `user/[userId]` one. Kept in `components` so the markup/design lives in a
 * single place.
 *
 * `icon` is passed as a rendered element (e.g. `<UserXIcon className="size-8" />`)
 * to keep this component free of any specific icon dependency.
 */
const NotFoundPanel = ({ title, description, icon, action }) => {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
      {icon ? (
        <div
          aria-hidden="true"
          className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground"
        >
          {icon}
        </div>
      ) : null}

      <p className="mt-6 text-sm font-medium tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      <Link
        href="/"
        className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
      >
        <ArrowLeftIcon aria-hidden="true" />
        {action || "Back to home"}
      </Link>
    </div>
  );
};

export default NotFoundPanel;
