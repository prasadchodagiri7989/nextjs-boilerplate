"use client";
import { openCartModal } from "@/utlis/openCartModal";
import React, { useEffect, useContext, useState } from "react";

const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {

  const dummmyData = [
    {
      id: 1,
      imgSrc: "/images/products/orange-1.jpg",
      imgHoverSrc: "/images/products/white-1.jpg",
      title: "Ribbed Tank Top",
      price: 16.95,
      colors: [
        {
          name: "Orange",
          colorClass: "bg_orange-3",
          imgSrc: "/images/products/orange-1.jpg",
        },
        {
          name: "Black",
          colorClass: "bg_dark",
          imgSrc: "/images/products/black-1.jpg",
        },
        {
          name: "White",
          colorClass: "bg_white",
          imgSrc: "/images/products/white-1.jpg",
        },
      ],
      sizes: ["S", "M", "L", "XL"],
      filterCategories: ["Best seller", "On Sale"],
      brand: "Ecomus",
      isAvailable: true,
    }
  ];

  const [cartProducts, setCartProducts] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [compareItem, setCompareItem] = useState([]);

  const [quickViewItem, setQuickViewItem] = useState([dummmyData]);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const fetchProductById = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/products/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching product details", error);
      return null;
    }
  };

  const addProductToCart = async (id, qty) => {
    if (!cartProducts.some((elm) => elm.id === id)) {
      const product = await fetchProductById(id);
      if (product) {
        const item = { ...product, quantity: qty || 1 };
        setCartProducts((prev) => [...prev, item]);
        localStorage.setItem("cartList", JSON.stringify([...cartProducts, item]));
      }
    }
  };

  const isAddedToCartProducts = (id) => {
    return cartProducts.some((elm) => elm._id === id);
  };

  const updateQuantity = (id, qty) => {
    setCartProducts((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      );
      localStorage.setItem("cartList", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const addToWishlist = async (id) => {
    if (!wishList.some((elm) => elm._id === id)) {
      const product = await fetchProductById(id);
      if (product) {
        const item = { ...product};
        setWishList((prev) => [...prev, item]);
        localStorage.setItem("wishList", JSON.stringify([...wishList, item]));
      }
    }
  };

  const removeFromWishlist = (id) => {
    setWishList((prev) => prev.filter((item) => item._id !== id));
    localStorage.setItem("wishList", JSON.stringify(wishList));
  };

  const isAddedtoWishlist = (id) => {
    return wishList.some((elm) => elm._id === id);
  };

  const addToCompareItem = (id) => {
    setCompareItem((prev) => {
      const updatedCompare = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      return updatedCompare;
    });
  };

  const removeFromCompareItem = (id) => {
    setCompareItem((prev) => prev.filter((item) => item !== id));
  };

  const isAddedtoCompareItem = (id) => compareItem.includes(id);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartList"));
    if (cartItems?.length) {
      setCartProducts(cartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishList"));
    if (wishlistItems?.length) {
      setWishList(wishlistItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishList));
  }, [wishList]);

  const contextElement = {
    cartProducts,
    setCartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    quickViewItem,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
    updateQuantity,
  };

  return <dataContext.Provider value={contextElement}>{children}</dataContext.Provider>;
}
