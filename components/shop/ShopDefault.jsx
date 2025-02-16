"use client";
import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import { useEffect, useState, useCallback } from "react";
import Pagination from "../common/Pagination";
import ShopFilter from "./ShopFilter";
import Sorting from "./Sorting";

export default function ShopDefault({ collectionId }) {
  const [gridItems, setGridItems] = useState(4);
  const [products, setProducts] = useState([]); // Stores fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // Stores filtered products
  const [finalSorted, setFinalSorted] = useState([]); // Stores sorted products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    if (!collectionId) {
      setError("Collection ID is missing");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/collections/${collectionId}?page=${currentPage}`
      );
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      console.log(`Fetched products for collection "${collectionId}", Page ${currentPage}:`, data);

      setProducts(data.products || []);
      setFilteredProducts(data.products || []); // Initialize filteredProducts with fetched products
      setFinalSorted(data.products || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionId, currentPage]);

  // ✅ Fetch when `collectionId` or `currentPage` changes
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          {/* Shop Controls */}
          <div className="tf-shop-control grid-3 align-items-center">
            {/* Filter Button */}
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter" />
                <span className="text">Filter</span>
              </a>
            </div>

            {/* Grid Layout Toggle */}
            <ul className="tf-control-layout d-flex justify-content-center">
              {layouts.map((layout, index) => (
                <li
                  key={index}
                  className={`tf-view-layout-switch ${layout.className} ${
                    gridItems === layout.dataValueGrid ? "active" : ""
                  }`}
                  onClick={() => setGridItems(layout.dataValueGrid)}
                >
                  <div className="item">
                    <span className={`icon ${layout.iconClass}`} />
                  </div>
                </li>
              ))}
            </ul>

            {/* Sorting Dropdown */}
            <div className="tf-control-sorting d-flex justify-content-end">
              <div className="tf-dropdown-sort" data-bs-toggle="dropdown" style={{display: 'none'}}>
                <Sorting setFinalSorted={setFinalSorted} products={filteredProducts} />
              </div>
            </div> 
          </div> 

          {/* Products Display */}
          <div className="wrapper-control-shop">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : finalSorted.length > 0 ? (
              <>
                <ProductGrid allproducts={finalSorted} gridItems={gridItems} />
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
              </>
            ) : (
              <p>No products found in this collection.</p>
            )}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <ShopFilter
        setFilteredProducts={setFilteredProducts}
        products={products}
      />
    </>
  );
}