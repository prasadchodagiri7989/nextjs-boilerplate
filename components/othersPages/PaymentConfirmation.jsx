import React from "react";
import Link from "next/link";

export default function PaymentConfirmation({ paymentId, orderId, amount }) {
  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h5 className="fw-5 mb_20">Payment confirmation</h5>
            <div className="tf-page-cart-checkout">
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Payment ID</div>
                <p>{paymentId}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Order ID</div>
                <p>{orderId}</p>
              </div>
              <div className="d-flex align-items-center justify-content-between mb_15">
                <div className="fs-18">Amount</div>
                <p>₹{amount}</p>
              </div>
              <div className="d-flex gap-10 mt-4">
                <Link
                  href={`/`}
                  className="tf-btn w-100 btn-outline animate-hover-btn rounded-0 justify-content-center"
                >
                  <span>Go to Home</span>
                </Link>
                <Link
                  href={`/orders`}
                  className="tf-btn w-100 btn-fill animate-hover-btn radius-3 justify-content-center"
                >
                  <span>View Order</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
