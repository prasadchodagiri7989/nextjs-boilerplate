"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContextElement } from "@/context/Context";
import CountdownComponent from "../common/Countdown";

export const ProductCard = ({ product, br='0px' }) => {
  const productId = product._id; 
  const productName = product.name; 
  const productImage = product.images && product.images.length > 0 ? product.images[0] : "https://placehold.co/720x1005"; // Default image if not available
  const productPrice = product.price || 0; 
  const productCategory = product.category || "Unknown"; 

  const [currentImage, setCurrentImage] = useState(productImage);
  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(productImage);
  }, [productImage]);

  return (
    <div className="card-product fl-item" key={productId} style={{border: `${br} solid var(--line)`, borderRadius: "10px", padding : "20px"}}>
      <div className="card-product-wrapper" style={{padding: "20px"}}>
        <Link href={`/product-detail/${productId}`} className="product-img">
        <Image
          style={{borderRadius: "10px"}}
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
        {product.stock === 0 ? (
          <div className="sold-out">
            <span>Sold out</span>
          </div>
        ) : (
          <>
            <div className="list-product-btn">
              <a
                href="#quick_add"
                onClick={() => setQuickAddItem(productId)}
                data-bs-toggle="modal"
                className="box-icon bg_white quick-add tf-btn-loading"
              >
                <span className="icon icon-bag" />
                <span className="tooltip">Quick Add</span>
              </a>
              <a
                onClick={() => addToWishlist(productId)}
                className="box-icon bg_white wishlist btn-icon-action"
              >
                <span
                  className={`icon icon-heart ${isAddedtoWishlist(productId) ? "added" : ""}`}
                />
                <span className="tooltip">
                  {isAddedtoWishlist(productId) ? "Already Wishlisted" : "Add to Wishlist"}
                </span>
              </a>
              <a
                href="#compare"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                onClick={() => addToCompareItem(productId)}
                className="box-icon bg_white compare btn-icon-action"
              >
                <span
                  className={`icon icon-compare ${isAddedtoCompareItem(productId) ? "added" : ""}`}
                />
                <span className="tooltip">
                  {isAddedtoCompareItem(productId) ? "Already Compared" : "Add to Compare"}
                </span>
              </a>
              <a
                href="#quick_view"
                onClick={() => setQuickViewItem(product)}
                data-bs-toggle="modal"
                className="box-icon bg_white quickview tf-btn-loading"
              >
                <span className="icon icon-view" />
                <span className="tooltip">Quick View</span>
              </a>
            </div>
            {product.countdown && (
              <div className="countdown-box">
                <div className="js-countdown">
                  <CountdownComponent />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="card-product-info" style={{borderTop: `${br} solid var(--line)`}}>
        <Link href={`/product-detail/${productId}`} className="title link">
          {productName}
        </Link>
        <span className="price">Rs.{productPrice.toFixed(2)}</span>
        <span className="product-category">{productCategory}</span>
      </div>
    </div>
  );
};
