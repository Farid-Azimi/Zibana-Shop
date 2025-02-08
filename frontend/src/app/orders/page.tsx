"use client";
import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/stores/useUserStore";

export default function OrdersPage() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, id } = useUserStore();

  useEffect(() => {
    if (!id || !token) return;
    const fetchPurchaseHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/purchase-history/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch purchase history");
        }

        const data = await response.json();
        setPurchaseHistory(data.purchaseHistory);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchaseHistory();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">در حال دریافت اطلاعات ...</div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">سفارشات شما</h1>
        {purchaseHistory.length === 0 ? (
          <p className="text-center text-gray-600">هیچ سفارشی یافت نشد.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {purchaseHistory.map((item: any) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-6 border"
              >
                {item.productId?.imageSrc && (
                  <div className="relative w-full h-48 mb-4">
                    <Image
                      src={item.productId.imageSrc}
                      alt={item.productId.title || "Product Image"}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                <h2 className="text-2xl font-medium mb-3">
                  {item.productId?.title || "Unknown Product"}
                </h2>
                <p className="text-gray-500 mb-2">
                  زمان خرید: {new Date(item.purchasedAt).toLocaleString()}
                </p>
                <p className="text-gray-500">تعداد: {item.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
