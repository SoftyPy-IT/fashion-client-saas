"use client";

import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Checkbox, Slider, SliderValue } from "@heroui/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setToggleMobileFilter } from "@/redux/features/global";
import { debounce } from "lodash";

interface VariantOption {
  name: string;
  value: string;
  _id: string;
}

interface FilterOptions {
  priceRange?: {
    min: number;
    max: number;
  };
  variants?: {
    [key: string]: string[];
  };
}

interface Props {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const ProductFilterMobile = ({ filters, onFilterChange }: Props) => {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.global.toggleMobileFilter);
  const setOpen = (open: boolean) => {
    dispatch(setToggleMobileFilter(open));
  };

  const safeMin = filters?.priceRange?.min ?? 0;
  const safeMax = filters?.priceRange?.max ?? 1000000;

  const [priceRange, setPriceRange] = useState<number[]>([
    Math.max(safeMin, 0),
    Math.min(safeMax, 1000000000),
  ]);

  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({});

  const debouncedFilterChange = useCallback(
    debounce((newFilters: FilterOptions) => {
      onFilterChange(newFilters);
    }, 300),
    [onFilterChange],
  );

  useEffect(() => {
    const newFilters: FilterOptions = {
      priceRange: {
        min: priceRange[0],
        max: priceRange[1],
      },
      variants: selectedFilters,
    };
    debouncedFilterChange(newFilters);
  }, [selectedFilters, priceRange]);

  const handleCheckboxChange = (
    sectionId: string,
    optionValue: string,
    checked: boolean,
  ) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[sectionId]) {
        updatedFilters[sectionId] = [];
      }

      if (checked) {
        updatedFilters[sectionId] = [...updatedFilters[sectionId], optionValue];
      } else {
        updatedFilters[sectionId] = updatedFilters[sectionId].filter(
          (val) => val !== optionValue,
        );
      }

      return updatedFilters;
    });
  };

  const filterVariants = filters?.variants || {};
  const filterSections = Object.keys(filterVariants).map((key) => ({
    id: key,
    name: key,
    options: filterVariants[key].map((option: any) => ({
      value: option.value,
      label: option.name,
    })),
  }));

  const formatBDT = (value: number) => `৳${value.toLocaleString("en-BD")}`;

  const handleApplyFilters = () => {
    const newFilters: FilterOptions = {
      priceRange: {
        min: priceRange[0],
        max: priceRange[1],
      },
      variants: selectedFilters,
    };
    onFilterChange(newFilters);
    setOpen(false);
  };

  const handleClearAll = () => {
    setSelectedFilters({});
    setPriceRange([safeMin, safeMax]);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <form className="mt-4 border-t border-gray200 flex flex-col h-full justify-between">
                <div>
                  <ul role="list" className="font-medium text-gray-900">
                    <div className="flex bg-white px-2 py-3 flex-col gap-2 w-full max-w-md items-start justify-center">
                      <Slider
                        label="Price Range"
                        step={10}
                        maxValue={safeMax}
                        minValue={safeMin}
                        value={priceRange}
                        onChange={(value: SliderValue) => {
                          if (Array.isArray(value) && value.length === 2) {
                            const [start, end] = value;
                            if (!isNaN(start) && !isNaN(end)) {
                              setPriceRange([start, end]);
                            }
                          }
                        }}
                        className="w-full"
                        color="foreground"
                      />
                      <p className="text-default-500 font-medium text-small">
                        Selected budget:{" "}
                        {priceRange.map((b) => formatBDT(b)).join(" – ")}
                      </p>
                    </div>
                  </ul>

                  {filterSections.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      defaultOpen={true}
                      className="border-t border-gray200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-2">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <Checkbox
                                    id={`filter-${section.id}-${optionIdx}`}
                                    color="default"
                                    isSelected={
                                      selectedFilters[section.id]?.includes(
                                        option.value,
                                      ) || false
                                    }
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        section.id,
                                        option.value,
                                        e.target.checked,
                                      )
                                    }
                                  >
                                    {section.id === "Color" ? (
                                      <div className="flex items-center space-x-2">
                                        <div
                                          className="w-4 h-4 rounded-full mr-2"
                                          style={{
                                            backgroundColor: option.value,
                                          }}
                                        />
                                        {option.label}
                                      </div>
                                    ) : (
                                      option.label
                                    )}
                                  </Checkbox>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </div>

                <div className="px-4 py-4 border-t border-gray-200 flex justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-sm font-medium text-gray-600 underline"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyFilters}
                    className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-md"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ProductFilterMobile;
