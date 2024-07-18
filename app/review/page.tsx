import { ReviewForm } from "@/components/ReviewForm";
import { submitReviewAction } from "@/app/review/actions";

export default function ReviewPage() {
  return <ReviewForm action={submitReviewAction} />;
}
