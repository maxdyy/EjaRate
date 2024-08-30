import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb";
import { DashboardSummary } from "@/components/ui/DashboardSummary";

export default function DashboardPage() {
  return (
    <div className="flex justify-center items-center flex-col">
      <Breadcrumb className="container max-w-screen-2xl pt-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DashboardSummary />
    </div>
  );
}
