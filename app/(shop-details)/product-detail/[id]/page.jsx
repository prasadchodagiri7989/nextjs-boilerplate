import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import Products from "@/components/shopDetails/Products";
import RecentProducts from "@/components/shopDetails/RecentProducts";
import ShopDetailsTab from "@/components/shopDetails/ShopDetailsTab";
import React from "react";
import Link from "next/link";
import DetailsOuterZoom from "@/components/shopDetails/DetailsOuterZoom";
import ProductSinglePrevNext from "@/components/common/ProductSinglePrevNext";

export const metadata = {
  title: "Shop Details || BikersHub",
  description: "Ecomus",
};

// Fetch product data from the API
async function fetchProduct(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/products/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function Page({ params }) {
  const { id } = await params;

  const product = await fetchProduct(id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Header2 />
      <div className="tf-breadcrumb">
        <div className="container">
          <div className="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <div className="tf-breadcrumb-list">
              <Link href={`/`} className="text">
                Home
              </Link>
              <i className="icon icon-arrow-right" />
              <span className="text">
                {product.title ? product.title : "Cotton jersey top"}
              </span>
            </div>
            <ProductSinglePrevNext currentId={product.id} />
          </div>
        </div>
      </div>
      <DetailsOuterZoom product={product} />
      <ShopDetailsTab />
      <Products />
      <RecentProducts />
      <Footer1 />
    </>
  );
}