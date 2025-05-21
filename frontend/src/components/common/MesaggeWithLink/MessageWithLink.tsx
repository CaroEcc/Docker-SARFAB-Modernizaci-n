import { Link } from "react-router-dom";

export function MessageWithLink({
  message,
  linkText,
  linkUrl,
  LinkComponent = Link,
}: MessageWithLinkProps): JSX.Element {
  return (
    <div className="h-fit">
      <p className="text-center py-20">
        {message} {" "}
        <LinkComponent to={linkUrl} className="text-primary font-bold">
          {linkText}
        </LinkComponent>
      </p>
    </div>
  );
}
