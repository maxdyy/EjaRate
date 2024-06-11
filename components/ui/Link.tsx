import Link from "next/link";

interface NextLinkProps extends React.ComponentProps<typeof Link> {
  ariaLabel?: string;
  children?: React.ReactNode;
  className?: string;
  newTab?: boolean;
  rel?: "noreferrer";
  text?: string;
  title?: string;
}

const NextLink = ({
  ariaLabel,
  children,
  className = "",
  newTab,
  text,
  ...props
}: NextLinkProps) => {
  return (
    <Link
      {...props}
      className={`cursor-pointer ${className}`}
      {...(ariaLabel && { "aria-label": ariaLabel })}
      {...(newTab && { target: "_blank" })}
    >
      {children || text}
    </Link>
  );
};

export default NextLink;
