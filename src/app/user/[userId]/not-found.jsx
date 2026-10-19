import { UserXIcon } from "lucide-react";

import NotFoundPanel from "@/components/NotFoundPanel";

/**
 * Handles `notFound()` thrown by `user/[userId]/page.jsx`, i.e. an id that is
 * well-formed but does not match any user (deleted, typo, stale link).
 */
const UserNotFound = () => {
  return (
    <NotFoundPanel
      icon={<UserXIcon className="size-8" />}
      title="User not found"
      description="We couldn't find a user with this id. It may have been deleted, or the link may be incorrect."
    />
  );
};

export default UserNotFound;
