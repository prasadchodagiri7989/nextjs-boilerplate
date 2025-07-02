'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Footer1 from '@/components/footers/Footer1';
import Header2 from '@/components/headers/Header2';
import PaymentConfirmation from '@/components/othersPages/PaymentConfirmation';

export default function PaymentConfirmationClient() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

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
