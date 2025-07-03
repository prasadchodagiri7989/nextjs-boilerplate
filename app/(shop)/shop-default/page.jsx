import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import AllProduct from "@/components/shop/AllProducts";
import React from "react";
import { Suspense } from "react";

export const metadata = {
  title: "Product Default || BikersHub",
  description: "Ecomus",
};
export default function page() {
  return (
    <Suspense fallback={<div>Loading shop...</div>}>
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">New Arrival</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Shop through our latest selection of Fashion
          </p>
        </div>
      </div>
      <AllProduct />
      <Footer1 />
    </>
    </Suspense>
  );
}
