import { useState } from "react";
import {
  useDeleteReviewMutation,
  useHideReviewMutation,
  useDeleteReplyMutation,
} from "@/redux/features/products/review.api";
import { StarIcon } from "@heroicons/react/20/solid";
import Rating from "react-rating";
import ReplyForm from "./ReplyForm";
import { Avatar } from "@heroui/react";

interface ReviewItemProps {
  review: any;
  user: any;
  refetchReviews: () => void;
}

const ReviewItem = ({ review, user, refetchReviews }: ReviewItemProps) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [deleteReview] = useDeleteReviewMutation();
  const [hideReview] = useHideReviewMutation();
  const [deleteReply] = useDeleteReplyMutation();

  const isAdmin = user?.role === "admin";
  const isReviewOwner = user?.userId === review?.user?._id;
  const isAuthenticated = user && user.userId;

  const handleDeleteReview = async () => {
    try {
      await deleteReview(review?._id).unwrap();
      refetchReviews();
    } catch (error) {
      console.error("Failed to delete review", error);
    }
  };

  const handleHideReview = async () => {
    try {
      await hideReview({
        id: review._id,
        data: { isHidden: !review.isHidden },
      }).unwrap();
      refetchReviews();
    } catch (error) {
      console.error("Failed to hide review", error);
    }
  };

  const handleDeleteReply = async (replyId: string) => {
    try {
      await deleteReply({ reviewId: review._id, replyId }).unwrap();
      refetchReviews();
    } catch (error) {
      console.error("Failed to delete reply", error);
    }
  };

  return (
    <div
      className={`flex space-x-4 text-sm text-gray-500 ${
        review.isHidden ? "opacity-50" : ""
      }
        ${
          !(user?.role === "admin" || review?.user?._id === user?.userId) &&
          review.isHidden
            ? "hidden"
            : ""
        }
        `}
    >
      <div className="flex-none py-10">
        <Avatar
          className="h-10 w-10 rounded-full"
          src={review?.user?.avatar?.url || "/avatar.png"}
          alt="avatar"
        />
      </div>
      <div className="flex-1 py-10">
        <h3 className="font-medium text-gray-900">
          {review?.user
            ? review?.user?.firstName + " " + review?.user?.lastName
            : "Anonymous"}
        </h3>
        <p>
          <time dateTime={review.datetime}>{review.date}</time>
        </p>
        <div className="mt-2">
          {/* @ts-ignore */}
          <Rating
            initialRating={review?.rating}
            readonly
            emptySymbol={<StarIcon className="h-4 w-4 text-gray300" />}
            fullSymbol={<StarIcon className="h-4 w-4 text-yellow" />}
            fractions={2}
          />
        </div>
        <div className="prose prose-sm mt-4 max-w-none text-gray-500">
          {review?.comment}
        </div>
        {isAuthenticated && (
          <div className="mt-4 flex space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => setReplyOpen((prev) => !prev)}
            >
              Reply
            </button>
            {(isAdmin || isReviewOwner) && (
              <>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={handleDeleteReview}
                >
                  Delete
                </button>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleHideReview}
                >
                  {review.isHidden ? "Unhide" : "Hide"}
                </button>
              </>
            )}
          </div>
        )}
        {replyOpen && (
          <ReplyForm
            reviewId={review._id}
            userId={user.userId}
            refetchReviews={refetchReviews}
            setIsReplyOpen={setReplyOpen}
          />
        )}
        {review?.replies?.length > 0 && (
          <div className="mt-4 space-y-4 border-l-2 border-gray200 pl-4">
            {review.replies.map((reply: any) => {
              const isReplyOwner = user?.userId === reply?.user?._id;

              return (
                <div
                  key={reply._id}
                  className={`
                        
                    flex flex-col space-y-2 relative ml-4 bg-gray100/30 p-4 rounded-md shadow-sm ${
                      reply.isHidden ? "opacity-50" : ""
                    }`}
                >
                  <div className="flex space-x-4">
                    <div className="flex-none">
                      <Avatar
                        className="h-8 w-8 rounded-full"
                        src={reply?.user?.avatar?.url || "/avatar.png"}
                        alt="avatar"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {reply?.user
                          ? reply.user?.firstName + " " + reply?.user?.lastName
                          : "Anonymous"}
                      </h4>
                      <p className="text-gray-500">{reply.comment}</p>
                    </div>
                  </div>
                  {isAuthenticated && (isAdmin || isReplyOwner) && (
                    <button
                      className="self-end text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteReply(reply._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewItem;
