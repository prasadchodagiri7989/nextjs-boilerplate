"use client";
import { useEffect, useState } from "react";
import Slider from "rc-slider";

const bikeModels = {
  BMW: [
    "G 310 R",
    "GS 310G"
  ],
  BSA: [
    "Goldstar 650"
  ],
  BAJAJ: [
    "Dominar 250/400(2017-2022)",
    "Dominar 250/400(2019-2021)",
    "Dominar 250/400(2019-2022)",
    "Dominar 400 (2017-2018)",
    "Dominar 400(2019-2021)",
    "Pulsar NS200",
    "Pulsar NS400Z"
  ],
  "HARLEY DAVIDSON": [
    "Harley X440"
  ],
  HERO: [
    "XPulse 200"
  ],
  HONDA: [
    "CB200X",
    "CB300F",
    "CB300R",
    "CB350",
    "CB350 RS",
    "NX500"
  ],
  KTM: [
    "ADVENTURE 250/390",
    "ADVENTURE 250/390/390X",
    "ADVENTURE 250/390/390X/390",
    "ADVENTURE 250/390/390X/390Rally",
    "ADVENTURE 390",
    "ADVENTURE 390(2025)",
    "ADVENTURE 390/390X",
    "DUKE 250/390(2017-18)",
    "Duke 125 (2020-22)",
    "Duke 200 BS6(2021-22)",
    "Duke 250/390 Gen 3",
    "Duke 250/390(2019-2022)",
    "Duke 390/250/200/3+D572+D568+D568:D582",
    "Duke 390/250/200/390 GEN 3",
    "Duke 390/250/200/390 Gen 3",
    "Duke 390/250/390 GEN 3",
    "RC 200/390"
  ],
  HUSQVARNA: [
    "Svartpilen and Vitpilen"
  ],
  KAWASAKI: [
    "Ninja 300",
    "Versys 650",
    "Vulcan 650"
  ],
  "ROYAL ENFIELD": [
    "Bear 650",
    "Classic 350 Reborn",
    "Continental GT 650/ Interceptor",
    "Guerrilla 450",
    "Himalayan 411 (2016-2020)",
    "Himalayan 411 BS6(2021-23)",
    "Himalayan 450",
    "Hunter 350",
    "Meteor 350",
    "Scram 411",
    "Shotgun 650",
    "Super Meteor 650"
  ],
  "ROYAK ENFIELD": [
    "Guerrilla 450"
  ],
  SUZUKI: [
    "V Strom SX 250",
    "V-STROM 250",
    "V-STROM 251",
    "V-STROM 252",
    "V-STROM 253",
    "V-STROM 254",
    "V-STROM 255",
    "V-STROM 256",
    "V-STROM 257"
  ],
  Suzuki: [
    "V-Storm 250"
  ],
  TRIUMPH: [
    "Scrambler 400",
    "Scrambler 400 X",
    "Speed 400"
  ],
  YAMAHA: [
    "FZ 25",
    "MT 15"
  ],
  YEZDI: [
    "Yezdi Adventure",
    "Yezdi Scrambler"
  ]
};

const brands = Object.keys(bikeModels);

export default function ShopFilter({ setFilteredProducts, products }) {
  const [price, setPrice] = useState([1000, 200000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);

  const handlePrice = (value) => setPrice(value);

  const handleSelectBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setSelectedModels([]); // Reset models when brand changes
  };

  const handleSelectModel = (model) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    );
  };

  const handleSelectAvailability = (value) => {
    setSelectedAvailability((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const clearFilter = () => {
    setSelectedBrands([]);
    setSelectedModels([]);
    setSelectedAvailability([]);
    setPrice([1000, 200000]);
    setFilteredProducts(products);
  };

  useEffect(() => {
    const filtered = products.filter((product) => {
      return (
        product.price >= price[0] &&
        product.price <= price[1] &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
        (selectedModels.length === 0 || selectedModels.includes(product.model)) &&
        (selectedAvailability.length === 0 || selectedAvailability.includes(product.stock > 0))
      );
    });
    setFilteredProducts(filtered);
  }, [price, selectedBrands, selectedModels, selectedAvailability, products]);

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
          <form onSubmit={(e) => e.preventDefault()} className="facet-filter-form">
            <div className="widget-facet">
              <h6 className="facet-title">Price</h6>
              <Slider
                range
                min={100}
                max={200000}
                defaultValue={price}
                onChange={handlePrice}
              />
              <p className="caption-price">
                Rs.{price[0]} - Rs.{price[1]}
              </p>
            </div>

            <div className="widget-facet">
              <h6 className="facet-title">Brand</h6>
              <ul className="tf-filter-group current-scrollbar mb_36">
                {brands.map((brand) => (
                  <li key={brand} onClick={() => handleSelectBrand(brand)}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      readOnly
                    />
                    <label>{brand}</label>
                  </li>
                ))}
              </ul>
            </div>

            {selectedBrands.length === 1 && (
              <div className="widget-facet">
                <h6 className="facet-title">Model</h6>
                <ul className="tf-filter-group current-scrollbar mb_36">
                  {(bikeModels[selectedBrands[0]] || []).map((model) => (
                    <li key={model} onClick={() => handleSelectModel(model)}>
                      <input
                        type="checkbox"
                        checked={selectedModels.includes(model)}
                        readOnly
                      />
                      <label>{model}</label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="widget-facet">
              <h6 className="facet-title">Availability</h6>
              <ul className="tf-filter-group current-scrollbar mb_36">
                <li onClick={() => handleSelectAvailability(true)}>
                  <input
                    type="checkbox"
                    checked={selectedAvailability.includes(true)}
                    readOnly
                  />
                  <label>Available</label>
                </li>
                <li onClick={() => handleSelectAvailability(false)}>
                  <input
                    type="checkbox"
                    checked={selectedAvailability.includes(false)}
                    readOnly
                  />
                  <label>Out of Stock</label>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="tf-btn style-2 btn-fill rounded mt-3"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
