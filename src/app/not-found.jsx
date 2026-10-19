import { FileQuestionIcon } from "lucide-react";

import NotFoundPanel from "@/components/NotFoundPanel";

export const metadata = {
  title: "Page not found",
};

/**
 * Root 404 boundary. Next.js uses this for any URL that matches no route
 * (e.g. `/user` or `/user/a/b`) and for `notFound()` calls without a closer
 * boundary.
 */
const NotFound = () => {
  return (
    <NotFoundPanel
      icon={<FileQuestionIcon className="size-8" />}
      title="Page not found"
      description="The page you're looking for doesn't exist or has moved. Check the URL, or head back home."
    />
  );
};

export default NotFound;
