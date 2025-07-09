import { Accordion, AccordionItem } from "@heroui/react";
import { Skeleton } from "@heroui/react";
import { IProduct } from "@/types/products.types";

interface ProductFAQProps {
  product: IProduct;
  isLoading: boolean;
}

const ProductFAQ = ({ product, isLoading }: ProductFAQProps) => {
  if (!product) return null;

  return (
    <div className="">
      <>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded" />
            ))}
          </div>
        ) : (
          <Accordion>
            {product.faq?.map((faq, index) => (
              <AccordionItem
                key={index}
                aria-label={`faq-${index}`}
                title={faq.question}
              >
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </>
    </div>
  );
};

export default ProductFAQ;
