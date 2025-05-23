import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import ShopCollections from "@/components/shop/ShopCollections";
import ShopDefault from "@/components/shop/ShopDefault";
import React from "react";

export default async function Page({ params }) {
  const { id } =  await params || {};

  if (!id) {
    console.error("Error: Collection ID is missing in params.");
    return <div>Invalid collection ID</div>;
  }

  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">{id} Collection</div>
          <p className="text-center text-2 text_black-2 mt_5">
            Browse our latest collection of {id}.
          </p>
        </div>
      </div>

      <ShopCollections collectionId={id} />

      <Footer1 />
    </>
  );
}
