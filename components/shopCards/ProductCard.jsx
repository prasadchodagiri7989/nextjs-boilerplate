"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({ product, br = "0px" }) => {
  const productId = product._id;
  const productName = product.name;
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://placehold.co/720x1005";
  const productPrice = product.price || 0;
  const productCategory = product.category || "Unknown";

  const [currentImage, setCurrentImage] = useState(productImage);

  useEffect(() => {
    setCurrentImage(productImage);
  }, [productImage]);

  return (
    <div
      className="card-product fl-item"
      key={productId}
      style={{
        border: "1px solid var(--line)",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${productId}`} className="product-img">
          <Image
            style={{ borderRadius: "10px" }}
            className="lazyload img-product"
            src={currentImage}
            alt={productName || "Product Image"}
            width={720}
            height={1005}
            priority
          />
          <Image
            className="lazyload img-hover"
            src={productImage}
            alt={productName || "Product Image"}
            width={720}
            height={1005}
          />
        </Link>

        {product.stock === 0 && (
          <div className="sold-out">
            <span>Sold out</span>
          </div>
        )}
      </div>

      <div
        className="card-product-info"
        style={{ borderTop: `${br} solid var(--line)` }}
      >
        <Link href={`/product-detail/${productId}`} className="title link">
          {productName}
        </Link>
        <span className="price">Rs.{productPrice.toFixed(2)}</span>
        <span className="product-category">{productCategory}</span>
      </div>
    </div>
  );
};
