"use client";

import Button from "@/components/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import SuccessMessage from "@/components/common/SuccessMessage";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppPhoneInput from "@/components/form/AppPhoneInput";
import AppSelect from "@/components/form/AppSelect";
import { removeAllFromCart } from "@/redux/features/cart";
import { useCreateOrderMutation } from "@/redux/features/orders/order.api";
import {
  clearOrderData,
  selectCoupon,
  selectIsCouponApplied,
  selectOrderSummary,
  setOrderSummary,
} from "@/redux/features/orders/orderSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import formatPrice from "@/utils/formatPrice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as zod from "zod";

interface Division {
  id: number;
  name: string;
  bn_name: string;
  districts?: District[];
}

interface District {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat?: string;
  lon?: string;
  url?: string;
  upazilas?: Upazila[];
}

interface Upazila {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url?: string;
  unions?: Union[];
}

interface Union {
  id: string;
  upazilla_id: string;
  name: string;
  bn_name: string;
  url?: string;
}

interface LocationData {
  divisions: Division[];
  districts: District[];
  upazilas: Upazila[];
  unions: Union[];
}

const checkoutSchema = zod.object({
  name: zod.string().min(1, "Name is required").max(100, "Name is too long"),
  email: zod
    .string()
    .email("Invalid email address")
    .optional()
    .or(zod.literal("")),
  phone: zod
    .string()
    .min(8, "Phone number must be at least 8 digits")
    .max(15, "Phone number is too long")
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid international phone number (e.g., +8801842236261)",
    ),
  shippingAddress: zod.object({
    line1: zod
      .string()
      .min(1, "Address line 1 is required")
      .max(100, "Address line 1 is too long"),
    line2: zod.string().max(100, "Address line 2 is too long").optional(),
    division: zod.string().min(1, "Division is required").optional(),
    district: zod.string().min(1, "District is required").optional(),
    upazila: zod.string().min(1, "Upazila is required").optional(),
    country: zod
      .string()
      .min(1, "Country is required")
      .max(50, "Country name is too long"),
    phone: zod
      .string()
      .min(8, "Phone number must be at least 8 digits")
      .max(15, "Phone number is too long")
      .regex(
        /^\+?[1-9]\d{1,14}$/,
        "Please enter a valid international phone number (e.g., +8801842236261)",
      )
      .optional(),
  }),
});

const CheckoutForm = ({ user }: { user: any }) => {
  const dispatch = useDispatch();
  const orderSummary = useSelector(selectOrderSummary);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderMutation();
  const hasCoupon = useAppSelector(selectIsCouponApplied);
  const coupon = useAppSelector(selectCoupon);
  const [error, setError] = React.useState<any>(null);
  const router = useRouter();

  // Location state
  const [selectedDivision, setSelectedDivision] = React.useState("");
  const [selectedDistrict, setSelectedDistrict] = React.useState("");
  const [selectedUpazila, setSelectedUpazila] = React.useState("");
  const [locationData, setLocationData] = React.useState<LocationData>({
    divisions: [],
    districts: [],
    upazilas: [],
    unions: [],
  });
  const [filteredDistricts, setFilteredDistricts] = React.useState<District[]>(
    [],
  );
  const [filteredUpazilas, setFilteredUpazilas] = React.useState<Upazila[]>([]);
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(true);

  // Fetch all location data - handles both nested and separate file structures
  React.useEffect(() => {
    const fetchLocationData = async () => {
      setIsLoadingLocation(true);
      try {
        // Try to fetch from a single nested file first
        try {
          const response = await fetch("/data/bd-locations.json");
          if (response.ok) {
            const data = await response.json();

            // Handle nested structure
            if (data.divisions && Array.isArray(data.divisions)) {
              // Extract all data from nested structure
              const allDistricts: District[] = [];
              const allUpazilas: Upazila[] = [];
              const allUnions: Union[] = [];

              data.divisions.forEach((division: Division) => {
                if (division.districts) {
                  allDistricts.push(...division.districts);
                  division.districts.forEach((district: District) => {
                    if (district.upazilas) {
                      allUpazilas.push(...district.upazilas);
                      district.upazilas.forEach((upazila: Upazila) => {
                        if (upazila.unions) {
                          allUnions.push(...upazila.unions);
                        }
                      });
                    }
                  });
                }
              });

              setLocationData({
                divisions: data.divisions,
                districts: allDistricts,
                upazilas: allUpazilas,
                unions: allUnions,
              });
              setIsLoadingLocation(false);
              return;
            }
          }
        } catch (nestedError) {
          console.log("Nested structure not found, trying separate files...");
        }

        // Fallback to separate files
        const [divisionsRes, districtsRes, upazilasRes, unionsRes] =
          await Promise.all([
            fetch("/data/bd-divisions.json").catch(() => null),
            fetch("/data/bd-districts.json").catch(() => null),
            fetch("/data/bd-upazilas.json").catch(() => null),
            fetch("/data/bd-unions.json").catch(() => null),
          ]);

        const responses = await Promise.all([
          divisionsRes?.ok ? divisionsRes.json() : { divisions: [] },
          districtsRes?.ok ? districtsRes.json() : { districts: [] },
          upazilasRes?.ok ? upazilasRes.json() : { upazilas: [] },
          unionsRes?.ok ? unionsRes.json() : { unions: [] },
        ]);

        const [divisionsData, districtsData, upazilasData, unionsData] =
          responses;

        setLocationData({
          divisions: divisionsData.divisions || [],
          districts: districtsData.districts || [],
          upazilas: upazilasData.upazilas || [],
          unions: unionsData.unions || [],
        });
      } catch (error) {
        console.error("Error fetching location data:", error);
        toast.error("Failed to load location data. Please refresh the page.");
        // Set empty arrays to prevent crashes
        setLocationData({
          divisions: [],
          districts: [],
          upazilas: [],
          unions: [],
        });
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchLocationData();
  }, []);

  // Handle division change
  const handleDivisionChange = (divisionId: string) => {
    setSelectedDivision(divisionId);
    setSelectedDistrict("");
    setSelectedUpazila("");

    const filtered = locationData.districts.filter(
      (district) => district.division_id === divisionId,
    );
    setFilteredDistricts(filtered);
    setFilteredUpazilas([]);
  };

  // Handle district change
  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrict(districtId);
    setSelectedUpazila("");

    const filtered = locationData.upazilas.filter(
      (upazila) => upazila.district_id === districtId,
    );
    setFilteredUpazilas(filtered);
  };

  // Handle upazila change
  const handleUpazilaChange = (upazilaId: string) => {
    setSelectedUpazila(upazilaId);
  };

  // Calculate shipping charge based on division
  const calculateShippingCharge = (divisionId: string) => {
    const division = locationData.divisions.find(
      (d) => d.id === Number(divisionId),
    );
    const divisionName = division?.name?.toLowerCase() || "";
    return divisionName === "dhaka" ? 80 : 150;
  };

  // Update order summary when shipping address changes
  const handleShippingAddressChange = (divisionId: string) => {
    if (!divisionId) return;

    const shippingCharge = calculateShippingCharge(divisionId);
    const subTotal = cartItems?.reduce(
      (acc: number, item) => acc + item.price * item.quantity,
      0,
    );
    const discount = coupon
      ? coupon.discountType === "percentage"
        ? (subTotal * coupon.discount) / 100
        : coupon.discount
      : 0;
    const total = subTotal - discount + shippingCharge;

    dispatch(
      setOrderSummary({
        subTotal,
        discount,
        shippingCharge,
        total,
      }),
    );
  };

  // Update shipping when division changes
  React.useEffect(() => {
    if (selectedDivision) {
      handleShippingAddressChange(selectedDivision);
    }
  }, [selectedDivision, cartItems, coupon]);

  // Validate cart items before submission
  const validateCart = () => {
    if (!cartItems || cartItems.length === 0) {
      throw new Error("Your cart is empty");
    }
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Submitting order...");
    try {
      validateCart();

      const selectedDivisionData = locationData.divisions.find(
        (d) => d.id === parseInt(data.shippingAddress.division),
      );
      const selectedDistrictData = locationData.districts.find(
        (d) => d.id === data.shippingAddress.district,
      );
      const selectedUpazilaData = locationData.upazilas.find(
        (u) => u.id === data.shippingAddress.upazila,
      );

      // Ensure we have valid location data
      if (
        !selectedDivisionData ||
        !selectedDistrictData ||
        !selectedUpazilaData
      ) {
        throw new Error("Invalid location data selected. Please try again.");
      }

      const orderData = {
        orderItems: cartItems,
        orderTotal: orderSummary.total,
        ...orderSummary,
        name: data.name,
        email: data.email,
        phone: data.phone,
        shippingAddress: {
          line1: data.shippingAddress.line1,
          line2: data.shippingAddress.line2 || "",
          country: data.shippingAddress.country,
          phone: data.shippingAddress.phone || data.phone,
          division: selectedDivisionData.name,
          district: selectedDistrictData.name,
          upazila: selectedUpazilaData.name,
        },
        shippingCharge: orderSummary.shippingCharge,
        paymentMethod: "Cash On Delivery",
        hasCoupon: hasCoupon,
        couponCode: coupon?.code,
        isGuestCheckout: !user,
      };

      const res = await createOrder(orderData).unwrap();

      if (res.success) {
        toast.success("Order submitted successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push(`/checkout/success/${res.data._id}`);
        dispatch(removeAllFromCart());
        dispatch(clearOrderData());
      }
    } catch (error: any) {
      const errorMessage =
        error.data?.message || error.message || "Failed to submit order";
      toast.error(errorMessage, {
        id: toastId,
        duration: 2000,
      });
      setError(errorMessage);
    } finally {
      toast.dismiss(toastId);
    }
  };

  if (isLoadingLocation) {
    return (
      <div className="p-3 sm:p-6 rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600">Loading location data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-6 rounded-xl border border-gray-200 bg-white">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800">
          Checkout
        </h1>
        <p className="text-gray-500 mt-2 text-xs sm:text-sm">
          Complete your purchase by filling out the information below
        </p>
        {isError && <ErrorMessage errorMessage={error} />}
        {isSuccess && (
          <SuccessMessage successMessage="Order submitted successfully" />
        )}
      </div>

      <AppForm
        onSubmit={onSubmit}
        resolver={zodResolver(checkoutSchema)}
        defaultValues={{
          "shippingAddress.country": "Bangladesh",
        }}
      >
        <div className="space-y-12">
          {/* Personal Information Section */}
          <section
            aria-labelledby="personal-info-heading"
            className="bg-white rounded-xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold text-lg">1</span>
              </div>
              <h3
                id="personal-info-heading"
                className="text-xl font-semibold text-gray-800"
              >
                Personal Information
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <AppInput
                    type="text"
                    name="name"
                    label="Full Name"
                    placeholder="Hues of Blues"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="space-y-2">
                  <AppInput
                    type="email"
                    name="email"
                    label="Email Address"
                    placeholder="blues@example.com"
                    required={false}
                    variant="bordered"
                  />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <AppPhoneInput
                    name="phone"
                    label="Phone Number"
                    placeholder="+880 1712345678"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Address Section */}
          <section
            aria-labelledby="shipping-address-heading"
            className="bg-white rounded-xl"
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <span className="text-indigo-600 font-semibold text-lg">2</span>
              </div>
              <h3
                id="shipping-address-heading"
                className="text-xl font-semibold text-gray-800"
              >
                Shipping Address
              </h3>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <AppInput
                    type="text"
                    name="shippingAddress.line1"
                    label="Address Line 1"
                    placeholder="House-19 (3rd floor), Road-08"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <AppInput
                    type="text"
                    name="shippingAddress.line2"
                    label="Address Line 2 (Optional)"
                    placeholder="Rafiq Housing, Shekhertek, Adabor"
                    required={false}
                  />
                </div>

                {/* Country Input */}
                <div className="space-y-2">
                  <AppInput
                    name="shippingAddress.country"
                    label="Country"
                    placeholder="Bangladesh"
                    type="text"
                    required
                    aria-required="true"
                    defaultValue="Bangladesh"
                  />
                </div>

                {/* Division Selector */}
                <div className="space-y-2">
                  <AppSelect
                    name="shippingAddress.division"
                    label="Division"
                    placeholder="Select Division"
                    options={locationData.divisions.map((division) => ({
                      value: String(division.id),
                      label: `${division.name} (${division.bn_name})`,
                    }))}
                    required
                    onChange={handleDivisionChange}
                  />
                </div>

                {/* District Selector */}
                <div className="space-y-2">
                  <AppSelect
                    name="shippingAddress.district"
                    label="District"
                    placeholder={
                      selectedDivision
                        ? "Select District"
                        : "Select Division First"
                    }
                    options={filteredDistricts.map((district) => ({
                      value: district.id,
                      label: `${district.name} (${district.bn_name})`,
                    }))}
                    required
                    disabled={!selectedDivision}
                    onChange={handleDistrictChange}
                  />
                </div>

                {/* Upazila Selector */}
                <div className="space-y-2">
                  <AppSelect
                    name="shippingAddress.upazila"
                    label="Upazila / Thana"
                    placeholder={
                      selectedDistrict
                        ? "Select Upazila"
                        : "Select District First"
                    }
                    options={filteredUpazilas.map((upazila) => ({
                      value: upazila.id,
                      label: `${upazila.name} (${upazila.bn_name})`,
                    }))}
                    required
                    disabled={!selectedDistrict}
                    onChange={handleUpazilaChange}
                  />
                </div>

                <div className="space-y-2">
                  <AppPhoneInput
                    name="shippingAddress.phone"
                    label="Delivery Phone"
                    placeholder="+880 1712345678"
                    required
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12">
          <Button
            type="submit"
            value={isLoading ? "Processing..." : "Place Order"}
            disabled={isLoading || isLoadingLocation}
            extraClass="w-full"
          />
        </div>
      </AppForm>
    </div>
  );
};

export default CheckoutForm;
