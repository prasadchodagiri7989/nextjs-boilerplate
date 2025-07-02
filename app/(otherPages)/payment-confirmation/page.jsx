import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import PaymentConfirmation from "@/components/othersPages/PaymentConfirmation";
import React from "react";

export const metadata = {
  title: "Payment Confirmation || BikersHub",
  description: "Ecomus",
};

// ✅ No need for 'use client' or force-dynamic here

export default function PaymentConfirmationPage({ searchParams }) {
  const paymentId = searchParams.paymentId;
  const orderId = searchParams.orderId;
  const amount = searchParams.amount;

  return (
    <>
      <Header2 />
      <div className="tf-page-title">
        <div className="container-full">
          <div className="heading text-center">Payment Confirmation</div>
        </div>
      </div>

      <PaymentConfirmation
        paymentId={paymentId}
        orderId={orderId}
        amount={amount}
      />
      <Footer1 />
    </>
  );
}
