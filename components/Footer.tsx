import { LinkButton } from "@/components/ui/LinkButton";

const Footer = () => {
  return (
    <footer className="border-t border-border/40">
      <div className="container py-4">
        <p className="text-sm text-slate-700">
          Developed by
          <LinkButton
            className="pl-1 underline hover:text-slate-900"
            href="https://maxdyy.com"
            target="_blank"
            rel="noreferrer"
          >
            Maksym Dmukhovskyy
          </LinkButton>
          . The source code is available on
          <LinkButton
            className="pl-1 underline hover:text-slate-900"
            href="https://github.com/maxdyy/EjaRate"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </LinkButton>
          .
        </p>
      </div>
    </footer>
  );
};

export { Footer };
