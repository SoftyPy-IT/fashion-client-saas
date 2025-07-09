import React, { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplyCouponMutation } from "@/redux/features/orders/order.api";
import {
  applyCouponState,
  removeCouponState,
  selectIsCouponApplied,
  selectCoupon,
} from "@/redux/features/orders/orderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import { toast } from "sonner";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "../buttons/Button";
import GhostButton from "../buttons/GhostButton";

const couponSchema = z.object({
  code: z
    .string({
      required_error: "Coupon code is required",
    })
    .min(1, "Coupon code is required"),
});

const CouponForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCouponApplied = useAppSelector(selectIsCouponApplied);
  const appliedCoupon = useAppSelector(selectCoupon);
  const [applyCoupon, { isLoading, isError, error }] =
    useApplyCouponMutation() as any;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isCouponApplied) {
      timeoutId = setTimeout(() => {
        dispatch(removeCouponState());
        toast.success("Coupon removed", { duration: 2000 });
      }, 3600000); // 1 hour
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isCouponApplied, dispatch]);

  const applyCouponHandler = async (data: any) => {
    const toastId = toast.loading("Applying coupon");
    try {
      const res = await applyCoupon(data).unwrap();
      if (res?.success) {
        dispatch(applyCouponState(res?.data));
        toast.success(res?.message, { id: toastId, duration: 2000 });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  const removeCouponHandler = () => {
    dispatch(removeCouponState());
    toast.success("Coupon removed", { duration: 2000 });
  };

  return (
    <div className="my-10">
      <AppForm
        onSubmit={applyCouponHandler}
        resolver={zodResolver(couponSchema)}
      >
        <AppInput
          label="Coupon code"
          name="code"
          type="text"
          placeholder="Coupon code"
          required={true}
          size="md"
          variant="bordered"
          disabled={isCouponApplied}
          description="Applied coupon will be removed after 1 hour automatically."
        />

        <div className="flex items-center space-x-4 mt-4">
          {isCouponApplied ? (
            <GhostButton onClick={removeCouponHandler} extraClass="" size="sm">
              Remove Coupon
            </GhostButton>
          ) : (
            <Button
              value={isLoading ? "Applying..." : "Apply Coupon"}
              extraClass=""
              type="submit"
              disabled={isLoading}
              size="sm"
            />
          )}
        </div>
      </AppForm>

      {isCouponApplied && (
        <p className="text-green text-sm mt-2">
          Coupon {appliedCoupon?.code} is applied.
        </p>
      )}

      {isError && (
        <ErrorMessage
          errorMessage={error?.data?.message || "Failed to apply coupon"}
        />
      )}
    </div>
  );
};

export default CouponForm;
