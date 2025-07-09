/* eslint-disable no-unused-vars */

import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  InstapaperIcon,
  InstapaperShareButton,
} from "react-share";
import Image from "next/image";

interface ProductShareModalProps {
  product: any;
}

const ProductShareModal = ({ product }: ProductShareModalProps) => {
  const shareUrl = window.location.href;
  const title = product?.name;
  const description = product?.short_description;

  return (
    <>
      <div className="p-2 text-center">
        <p className="mb-2 text-lg font-semibold">Share Via</p>
        <div className="flex justify-center space-x-4">
          <FacebookShareButton url={shareUrl} title={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton
            url={shareUrl}
            title={title}
            summary={description}
            source={shareUrl}
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <InstapaperShareButton url={shareUrl} title={title}>
            <InstapaperIcon size={32} round />
          </InstapaperShareButton>
        </div>
      </div>
    </>
  );
};

export default ProductShareModal;
