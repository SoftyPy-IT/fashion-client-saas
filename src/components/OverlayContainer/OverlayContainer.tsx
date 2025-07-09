import Image from "next/image";
import { FC } from "react";
import styles from "./OverlayContainer.module.css";

type Props = {
  imgSrc: string;
  imgSrc2?: string;
  imgAlt?: string;
  children: React.ReactNode;
};

const OverlayContainer: FC<Props> = ({
  imgSrc,
  imgSrc2,
  imgAlt = "",
  children,
}) => {
  return (
    <div
      className={`${styles.imgContainer} w-full h-full relative overflow-hidden rounded`}
    >
      {imgSrc2 ? (
        <>
          {/* Desktop image */}
          <div className="hidden sm:block w-full h-full">
            <Image
              className={`${styles.img} w-full h-full object-contain`}
              src={imgSrc}
              alt={imgAlt}
              width={500}
              height={500}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
          {/* Mobile image */}
          <div className="block sm:hidden w-full h-full">
            <Image
              className={`${styles.img} w-full h-full object-contain`}
              src={imgSrc2}
              alt={imgAlt}
              width={400}
              height={400}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full aspect-square">
          <Image
            className={`${styles.img} rounded-md`}
            src={imgSrc}
            alt={imgAlt}
            width={500}
            height={500}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            priority
          />
        </div>
      )}

      {/* Content overlay */}
      {children}

      {/* Simple overlay for better visibility */}
      <div className={`${styles.imgOverlay}`}></div>

      {/* Border animations - simplified */}
      <div className={`${styles.overlayBorder}`}></div>
      <div className={`${styles.overlayBorder2}`}></div>
    </div>
  );
};

export default OverlayContainer;
