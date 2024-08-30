"use client";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/lib/hooks";

interface ApproveToggleButtonProps {
  reviewId: string;
  isApproved: boolean | null;
}

const ApproveToggleButton = ({
  reviewId,
  isApproved,
}: ApproveToggleButtonProps) => {
  const { toast } = useToast();

  const handleApproveReview = async () => {
    const { error } = await supabase
      .from("reviews")
      .update({ is_approved: !isApproved })
      .eq("id", reviewId);

    if (error) {
      console.error("Error updating review:", error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Review updated successfully",
      });
      // Reload the page to reflect the changes
      window.location.reload();
    }
  };

  return (
    <div className="pt-6 text-center mt-auto">
      <Button size="sm" className="w-full" onClick={handleApproveReview}>
        {!isApproved ? "Approve Review" : "Reject Review"}
      </Button>
    </div>
  );
};

export { ApproveToggleButton };
