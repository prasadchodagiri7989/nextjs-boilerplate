"use client";
import React, { useState, useEffect } from "react";
import { ProductCard } from "../../shopCards/ProductCard";

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/best-sellers`);
      const data = await response.json();
      setProducts(data); // Update products
      setLoaded(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on mount
  }, []);

  return (
    <section className="flat-spacing-5 pt_0 flat-seller">
      <div className="container">
        <div className="flat-title">
          <span className="title wow fadeInUp" data-wow-delay="0s">
            Best Seller
          </span>
          <p className="sub-title wow fadeInUp" data-wow-delay="0s">
            Shop the Latest Styles: Stay ahead of the curve with our newest arrivals
          </p>
        </div>
        <div className="grid-layout wow fadeInUp" data-wow-delay="0s" data-grid="grid-4">
          {products.length > 0 ? (
            products.map((product) => <ProductCard product={product} key={product._id} />)
          ) : (
            <p>No products available</p>
          )}
        </div>
        {!loaded && (
          <div className="tf-pagination-wrap view-more-button text-center">
            <button
              className={`tf-btn-loading tf-loading-default style-2 btn-loadmore ${loading ? "loading" : ""}`}
              onClick={fetchProducts}
              disabled={loading}
            >
              <span className="text">{loading ? "Loading..." : "Load more"}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
