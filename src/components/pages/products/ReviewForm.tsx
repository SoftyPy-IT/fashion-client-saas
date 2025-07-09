import AppForm from "@/components/form/AppForm";
import AppTextArea from "@/components/form/AppTextArea";
import { toast } from "sonner";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import Rating from "react-rating";
import { StarIcon } from "@heroicons/react/20/solid";
import { useCreateReviewMutation } from "@/redux/features/products/review.api";
import ErrorMessage from "@/components/common/ErrorMessage";
import SuccessMessage from "@/components/common/SuccessMessage";
import Button from "@/components/buttons/Button";

const reviewSchema = zod.object({
  comment: zod
    .string({
      required_error: "Please enter your review content",
    })
    .min(1, "Please enter your review content"),
});

const ReviewForm = ({
  productId,
  userId,
  refetchReviews,
}: {
  productId: string;
  userId: string;
  refetchReviews: () => void;
}) => {
  const [createReview, { isLoading, isError, isSuccess }] =
    useCreateReviewMutation();
  const [newReview, setNewReview] = useState({
    comment: "",
    rating: 4.5,
    product: productId,
    user: userId,
  });

  const onReviewSubmit = async (data: any) => {
    const toastId = toast.loading("Submitting review...");
    try {
      await createReview({
        ...data,
        rating: newReview.rating,
        product: newReview.product,
        user: newReview.user,
      }).unwrap();
      toast.success("Review submitted successfully", {
        id: toastId,
        duration: 2000,
      });

      refetchReviews();
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      {isError && <ErrorMessage errorMessage="Failed to submit review" />}

      {isSuccess && (
        <SuccessMessage successMessage="Review submitted successfully" />
      )}
      <AppForm onSubmit={onReviewSubmit} resolver={zodResolver(reviewSchema)}>
        <AppTextArea
          name="comment"
          label="Review"
          placeholder="Write your review here..."
          required
        />

        <div className="my-5">
          {/* @ts-ignore */}
          <Rating
            initialRating={newReview.rating}
            onChange={(value) => setNewReview({ ...newReview, rating: value })}
            emptySymbol={<StarIcon className="h-8 w-8 text-gray300" />}
            fullSymbol={<StarIcon className="h-8 w-8 text-yellow" />}
            fractions={2}
          />
        </div>

        <Button
          value={isLoading ? "Submitting..." : "Submit Review"}
          extraClass=""
          type="submit"
          disabled={isLoading}
          size="sm"
        />
      </AppForm>
    </>
  );
};

export default ReviewForm;
