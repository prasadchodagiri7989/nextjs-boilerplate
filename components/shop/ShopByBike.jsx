"use client";
import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import ShopFilter from "./ShopFilter";
import Sorting from "./Sorting";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";

export default function ShopByBike({ params }) {
    const { bike, model } = useParams();

  const [gridItems, setGridItems] = useState(4);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [finalSorted, setFinalSorted] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 20;

  const fetchBikeProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/by-bike?bike=${bike}&model=${model}`
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
      setFinalSorted(data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bike && model) {
      fetchBikeProducts();
    }
  }, [bike, model]);


  useEffect(() => {
    setTotalPages(Math.ceil(finalSorted.length / productsPerPage));
  }, [finalSorted]);


  return (
    <>
      <section className="flat-spacing-2">
        <div className="container">
          {/* Shop Controls */}
          <div className="tf-shop-control grid-3 align-items-center">
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

            <div className="tf-control-sorting d-flex justify-content-end">
              <div
                className="tf-dropdown-sort"
                data-bs-toggle="dropdown"
                style={{ display: "none" }}
              >
                <Sorting
                  setFinalSorted={setFinalSorted}
                  products={filteredProducts}
                />
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
                <ProductGrid
                  allproducts={finalSorted.slice(
                    (currentPage - 1) * productsPerPage,
                    currentPage * productsPerPage
                  )}
                  gridItems={gridItems}
                />
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <p>No products found for the selected bike and model.</p>
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
