"use client";
import { useEffect, useState } from "react";
import Slider from "rc-slider";
import Link from "next/link";

const categories = [
  { id: 1, name: "Fashion", isActive: true, link: "/shop-default" },
  { id: 2, name: "Men", isActive: false, link: "/shop-men" },
  { id: 3, name: "Women", isActive: false, link: "/shop-women" },
  { id: 4, name: "Denim", isActive: false, link: "/shop-default" },
  { id: 5, name: "Dress", isActive: false, link: "/shop-default" },
];

const filterColors = [
  { name: "Orange", colorClass: "bg_orange-3" },
  { name: "Black", colorClass: "bg_dark" },
  { name: "White", colorClass: "bg_white" },
  { name: "Brown", colorClass: "bg_brown" },
  { name: "Light Purple", colorClass: "bg_purple" },
  { name: "Light Green", colorClass: "bg_light-green" },
  { name: "Pink", colorClass: "bg_purple" },
  { name: "Blue", colorClass: "bg_blue-2" },
  { name: "Dark Blue", colorClass: "bg_dark-blue" },
  { name: "Light Grey", colorClass: "bg_light-grey" },
  { name: "Beige", colorClass: "bg_beige" },
  { name: "Light Blue", colorClass: "bg_light-blue" },
  { name: "Grey", colorClass: "bg_grey" },
  { name: "Light Pink", colorClass: "bg_light-pink" },
];
const brands = ["Ecomus", "M&H"];
const availabilities = [
  { id: 1, isAvailable: true, text: "Available", count: 14 },
  { id: 2, isAvailable: false, text: "Out of Stock", count: 2 },
];
const sizes = ["S", "M", "L", "XL"];

export default function ShopFilter({ setFilteredProducts, products }) {
  const [price, setPrice] = useState([10, 200000]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handlePrice = (value) => {
    setPrice(value); // Update the price state
  };

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        product.price >= price[0] &&
        product.price <= price[1] &&
        (selectedColors.length === 0 ||
          selectedColors.some((color) =>
            product.colors?.map((c) => c.name).includes(color)
          )) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (selectedSizes.length === 0 || selectedSizes.some((size) => product.sizes?.includes(size))) &&
        (selectedAvailabilities.length === 0 ||
          selectedAvailabilities.some(
            (avail) => avail.isAvailable === product.isAvailable
          ))
    );

    setFilteredProducts(filtered);
  }, [
    price,
    selectedColors,
    selectedBrands,
    selectedAvailabilities,
    selectedSizes,
    products,
  ]);

  const clearFilter = () => {
    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedAvailabilities([]);
    setSelectedSizes([]);
    setPrice([1000, 200000]);
    setFilteredProducts(products);
  };

  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <div className="canvas-wrapper">
        <header className="canvas-header">
          <div className="filter-icon">
            <span className="icon icon-filter" />
            <span>Filter</span>
          </div>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </header>
        <div className="canvas-body">
          <div className="widget-facet wd-categories">
            <div
              className="facet-title"
              data-bs-target="#categories"
              data-bs-toggle="collapse"
              aria-expanded="true"
              aria-controls="categories"
            >
              <span>Product categories</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="categories" className="collapse show">
              <ul className="list-categoris current-scrollbar mb_36">
                {categories.map((category) => (
                  <li key={category.id} className={`cate-item`}>
                    {category.link ? (
                      <Link href={category.link}>
                        <span>{category.name}</span>
                      </Link>
                    ) : (
                      <a href="#">
                        <span>{category.name}</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            action="#"
            id="facet-filter-form"
            className="facet-filter-form"
          >
            <div className="widget-facet">
              <div
                className="facet-title"
                data-bs-target="#availability"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="availability"
              >
                <span>Availability</span>
                <span className="icon icon-arrow-up" />
              </div>
              <div id="availability" className="collapse show">
                <ul className="tf-filter-group current-scrollbar mb_36">
                  {availabilities.map((availability) => (
                    <li
                      key={availability.id}
                      className="list-item d-flex gap-12 align-items-center"
                      onClick={() => handleSelectAvailabilities(availability)}
                    >
                      <input
                        type="radio"
                        className="tf-check"
                        readOnly
                        checked={selectedAvailabilities.includes(availability)}
                      />
                      <label className="label">
                        <span>{availability.text}</span>&nbsp;
                        <span>
                          (
                          {
                            products.filter(
                              (elm) =>
                                elm.isAvailable == availability.isAvailable
                            ).length
                          }
                          )
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="widget-facet wrap-price">
              <div
                className="facet-title"
                data-bs-target="#price"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="price"
              >
                <span>Price</span>
                <span className="icon icon-arrow-up" />
              </div>
              <div id="price" className="collapse show">
                <div className="widget-price filter-price">
                  <Slider
                    formatLabel={() => ``}
                    range
                    max={200000}
                    min={100}
                    defaultValue={price}
                    onChange={(value) => handlePrice(value)}
                    id="slider"
                  />
                  <div className="box-title-price">
                    <span className="title-price">Price :</span>
                    <div className="caption-price">
                      <div>
                        <span>$</span>
                        <span className="min-price">{price[0]}</span>
                      </div>
                      <span>-</span>
                      <div>
                        <span>$</span>
                        <span className="max-price">{price[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget-facet">
              <div
                className="facet-title"
                data-bs-target="#brand"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="brand"
              >
                <span>Brand</span>
                <span className="icon icon-arrow-up" />
              </div>
              <div id="brand" className="collapse show">
                <ul className="tf-filter-group current-scrollbar mb_36">
                  {brands.map((brand) => (
                    <li
                      key={brand}
                      className="list-item d-flex gap-12 align-items-center"
                      onClick={() => handleSelectBrand(brand)}
                    >
                      <input
                        type="radio"
                        className="tf-check"
                        readOnly
                        checked={selectedBrands.includes(brand)}
                      />
                      <label className="label">
                        <span>{brand}</span>&nbsp;
                        <span>
                          ({products.filter((elm) => elm.brand == brand).length}
                          )
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="widget-facet">
              <div
                className="facet-title"
                data-bs-target="#color"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="color"
              >
                <span>Color</span>
                <span className="icon icon-arrow-up" />
              </div>
              <div id="color" className="collapse show">
                <ul className="tf-filter-group filter-color current-scrollbar mb_36">
                  {filterColors.map((elm, i) => (
                    <li
                      key={i}
                      className="list-item d-flex gap-12 align-items-center"
                      onClick={() => handleSelectColor(elm.name)}
                    >
                      <input
                        type="checkbox"
                        name="color"
                        className={`tf-check-color ${elm.colorClass}`}
                        readOnly
                        checked={selectedColors.includes(elm.name)}
                      />
                      <label className="label">
                        <span>{elm.name}</span>&nbsp;
                        <span>
                          (
                          {
                            products.filter((el) =>
                              el.colors
                                ?.map((col) => col?.name)
                                ?.includes(elm.name)
                            ).length
                          }
                          )
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="widget-facet">
              <div
                className="facet-title"
                data-bs-target="#size"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="size"
              >
                <span>Size</span>
                <span className="icon icon-arrow-up" />
              </div>
              <div id="size" className="collapse show">
                <ul className="tf-filter-group current-scrollbar">
                  {sizes.map((elm, i) => (
                    <li
                      key={i}
                      onClick={() => handleSelectSizes(elm)}
                      className="list-item d-flex gap-12 align-items-center"
                    >
                      <input
                        type="radio"
                        className="tf-check tf-check-size"
                        readOnly
                        checked={selectedSizes.includes(elm)}
                      />
                      <label className="label">
                        <span>{elm}</span>&nbsp;
                        <span>
                          (
                          {
                            products.filter((el) => el.sizes?.includes(elm))
                              .length
                          }
                          )
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
          <div className="mt-5"></div>
          <a
            className="tf-btn style-2 btn-fill rounded animate-hover-btn"
            onClick={clearFilter}
          >
            Clear Filter
          </a>
        </div>
      </div>
    </div>
  );
}
