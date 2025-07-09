/* eslint-disable no-unused-vars */
import AppForm from "@/components/form/AppForm";
import AppTextArea from "@/components/form/AppTextArea";
import { toast } from "sonner";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/react";
import { useState } from "react";
import { useAddReplyMutation } from "@/redux/features/products/review.api";
import ErrorMessage from "@/components/common/ErrorMessage";
import SuccessMessage from "@/components/common/SuccessMessage";

const replySchema = zod.object({
  comment: zod.string().min(1, "Please enter your reply content"),
});

interface ReplyFormProps {
  reviewId: string;
  userId: string;
  refetchReviews: () => void;
  setIsReplyOpen?: (value: boolean) => void;
}

const ReplyForm = ({
  reviewId,
  userId,
  refetchReviews,
  setIsReplyOpen,
}: ReplyFormProps) => {
  const [addReply, { isLoading, isError, isSuccess }] = useAddReplyMutation();
  const [newReply, setNewReply] = useState({
    comment: "",
    user: userId,
  });

  const onReplySubmit = async (data: any) => {
    const toastId = toast.loading("Submitting reply...");
    try {
      await addReply({
        id: reviewId,
        data: {
          ...data,
          user: newReply.user,
        },
      }).unwrap();
      toast.success("Reply submitted successfully", {
        id: toastId,
        duration: 2000,
      });
      setIsReplyOpen && setIsReplyOpen(false);
      setNewReply({ ...newReply, comment: "" });
      refetchReviews();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit reply", {
        id: toastId,
        duration: 2000,
      });
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="my-5">
      {isError && <ErrorMessage errorMessage="Failed to submit reply" />}

      {isSuccess && (
        <SuccessMessage successMessage="Reply submitted successfully" />
      )}
      <AppForm onSubmit={onReplySubmit}>
        <AppTextArea
          name="comment"
          label="Reply"
          placeholder="Write your reply here..."
          required
        />
        <Button
          type="submit"
          size="sm"
          className="btn"
          disabled={isLoading}
          isLoading={isLoading}
        >
          Submit Reply
        </Button>
      </AppForm>
    </div>
  );
};

export default ReplyForm;
