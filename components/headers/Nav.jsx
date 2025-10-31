"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { products1 } from "@/data/products";
import { ProductCard } from "../shopCards/ProductCard";
import { Navigation } from "swiper/modules";
import {
  allHomepages,
  blogLinks,
  demoItems,
  pages,
  productDetailPages,
  productsPages,
} from "@/data/menu";
import { usePathname } from "next/navigation";

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




export default function Nav({ isArrow = true, textColor = "", Linkfs = "" }) {
  const [selectedBike, setSelectedBike] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const pathname = usePathname();
  const isMenuActive = (menuItem) => {
    let active = false;
    if (menuItem.href?.includes("/")) {
      if (menuItem.href?.split("/")[1] == pathname.split("/")[1]) {
        active = true;
      }
    }
    if (menuItem.length) {
      active = menuItem.some(
        (elm) => elm.href?.split("/")[1] == pathname.split("/")[1]
      );
    }
    if (menuItem.length) {
      menuItem.forEach((item) => {
        item.links?.forEach((elm2) => {
          if (elm2.href?.includes("/")) {
            if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
              active = true;
            }
          }
          if (elm2.length) {
            elm2.forEach((item2) => {
              item2?.links?.forEach((elm3) => {
                if (elm3.href.split("/")[1] == pathname.split("/")[1]) {
                  active = true;
                }
              });
            });
          }
        });
        if (item.href?.includes("/")) {
          if (item.href?.split("/")[1] == pathname.split("/")[1]) {
            active = true;
          }
        }
      });
    }

    return active;
  };
  return (
    <>
      {" "}
      <li className="menu-item position-relative">  
      <a
        href="#"
        className={`item-link ${Linkfs} ${textColor}`}
        style={{ color: "var(--white)" }}
      >
        Shop By Bike
        {isArrow ? <i className="icon icon-arrow-down" /> : ""}
      </a>

      <div className="sub-menu links-default">
        <ul className="menu-list" style={{ marginBottom: "20px", fontWeight: "bold" }}>
          <li>
            <select
              className="tf-select"
              value={selectedBike}
              onChange={(e) => {
                setSelectedBike(e.target.value);
                setSelectedModel(""); // Reset model on bike change
              }}
            >
              <option value="">Select Bike</option>
              {Object.keys(bikeModels).map((bike) => (
                <option key={bike} value={bike}>
                  {bike.charAt(0).toUpperCase() + bike.slice(1)}
                </option>
              ))}
            </select>
          </li>
          <li>
            <select
              className="tf-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBike}
            >
              <option value="">Select Model</option>
              {selectedBike &&
                bikeModels[selectedBike].map((model) => (
                  <option key={model} value={model.toLowerCase()}>
                    {model}
                  </option>
                ))}
            </select>
          </li>
        </ul>

        {/* Show button only when both bike and model are selected */}
        {selectedBike && selectedModel && (
          <Link
            href={`/shop-by-bike/${selectedBike}/${selectedModel}`}
            className="fade-item fade-item-3 tf-btn btn-fill animate-hover-btn btn-xl radius-3"
          >
            <span>Get</span>
            <i className="icon icon-arrow-right" />
          </Link>
        )}
      </div>
    </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor} ${
            isMenuActive(productsPages) ? "" : ""
          } `}
          style={{ color: "var(--white)" }}
        >
          Motorcycles
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {productsPages.map((menu, index) => (
                <div className="col-lg-2" key={index}>
                  <div className="mega-menu-item">
                    <div className="menu-heading">{menu.heading}</div>
                    <ul className="menu-list">
                      {menu.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className={`menu-link-text link ${
                              isMenuActive(link) ? "" : ""
                            }`}   style={{ fontWeight: "bold" }}
                          >
                            {link.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(productDetailPages) ? "" : ""
          }`}
          style={{ color: "var(--white)" }}
        >
          Riding Gears
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              {productDetailPages.map((menuItem, index) => (
                <div key={index} className="col-lg-2">
                  <div className="mega-menu-item">
                    <div className="menu-heading">{menuItem.heading}</div>
                    <ul className="menu-list">
                      {menuItem.links.map((linkItem, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={linkItem.href}
                            className={`menu-link-text link position-relative  `}
                              style={{ fontWeight:"bold"}}
                          >
                            {linkItem.text}
                            {linkItem.extra}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="col-lg-4">
                <div className="menu-heading">Best seller</div>
                <div className="hover-sw-nav hover-sw-2">
                  <Swiper
                    dir="ltr"
                    modules={[Navigation]}
                    navigation={{
                      prevEl: ".snmpn1",
                      nextEl: ".snmnn1",
                    }}
                    slidesPerView={2}
                    spaceBetween={30}
                    className="swiper tf-product-header wrap-sw-over"
                  >
                    {[...products1]
                      .slice(0, 4)

                      .map((elm, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                          <ProductCard product={elm} />
                        </SwiperSlide>
                      ))}
                  </Swiper>
                  <div className="nav-sw nav-next-slider nav-next-product-header box-icon w_46 round snmpn1">
                    <span className="icon icon-arrow-left" />
                  </div>
                  <div className="nav-sw nav-prev-slider nav-prev-product-header box-icon w_46 round snmnn1">
                    <span className="icon icon-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(pages) ? "activeMenu" : ""
          }`}
          style={{ color: "var(--white)" }}
        >
          Helmets
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu submenu-default">
          <ul className="menu-list">
            {pages.map((item, index) => (
              <li key={index} className={item.links ? "menu-item-2 " : ""}>
                {item.href.includes("#") ? (
                  <a
                    href={item.href}
                    className={`${item.className} ${
                      isMenuActive(item.links) ? "" : ""
                    }`}
                  >
                    {item.text}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`${item.className}  ${
                      isMenuActive(item) ? "" : ""
                    }`}
                    style={{ position: "relative", fontWeight: "bold"}}
                  >
                    {item.text}{" "}
                    {item.label && (
                      <div className="demo-label">
                        <span className="demo-new">{item.label}</span>
                      </div>
                    )}
                  </Link>
                )}

                {item.links && (
                  <div className="sub-menu submenu-default">
                    <ul className="menu-list">
                      {item.links.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={`${subItem.className} ${
                              isMenuActive(subItem) ? "" : ""
                            }`}
                              style={{ fontWeight:"bold"}}
                          >
                            {subItem.text}
                            {subItem.label && (
                              <div className="demo-label">
                                <span className="demo-new">
                                  {subItem.label}
                                </span>
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a
          href="#"
          className={`item-link ${Linkfs} ${textColor}  ${
            isMenuActive(blogLinks) ? "" : ""
          }`}
          style={{ color: "var(--white)" }}
        >
          Shop By Biker
          {isArrow ? <i className="icon icon-arrow-down" /> : ""}
        </a>
        <div className="sub-menu links-default">
          <ul className="menu-list">
            {blogLinks.map((linkItem, index) => (
              <li key={index}>
                <Link
                  href={linkItem.href}
                  className={`menu-link-text link text_black-2  ${
                    isMenuActive(linkItem) ? "" : ""
                  }`}
                    style={{ fontWeight:"bold"}}
                >
                  {linkItem.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </>
  );
}
