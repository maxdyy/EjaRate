// Modified version of https://www.npmjs.com/package/next-nprogress-bar

"use client";
import { AppProgressBar } from "next-nprogress-bar";

const ProgressBarWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <AppProgressBar
        color="#172554"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export { ProgressBarWrapper };
