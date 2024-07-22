import { ReviewForm } from "@/components/ReviewForm";
import { submitReviewAction } from "@/app/submit-review/actions";

export default function ReviewPage() {
  return <ReviewForm action={submitReviewAction} />;
}
