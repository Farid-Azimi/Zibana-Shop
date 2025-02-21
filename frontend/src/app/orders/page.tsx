"use client";
import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface Order {
  _id: string;
  purchasedAt: string;
  quantity: number;
  productId?: {
    imageSrc?: string;
    title?: string;
    discountedPrice?: number;
  };
}

export default function OrdersPage() {
  const [purchaseHistory, setPurchaseHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<{ [key: string]: boolean }>({});
  const { token, id } = useUserStore();

 
  useEffect(() => {
    if (!id || !token) return;

    const fetchPurchaseHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/purchase-history/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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

  const groupedOrders = purchaseHistory.reduce((groups, order) => {
    const purchaseTime = new Date(order.purchasedAt).toLocaleString();
    if (!groups[purchaseTime]) {
      groups[purchaseTime] = [];
    }
    groups[purchaseTime].push(order);
    return groups;
  }, {} as { [key: string]: Order[] });

  const toggleGroup = (time: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [time]: !prev[time],
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-center mb-12">
          لیست سفارشات شما
        </h1>
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner size={64} />
          </div>
        ) : purchaseHistory.length === 0 ? (
          <p className="text-center text-gray-500">هیچ سفارشی یافت نشد.</p>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedOrders).map(([time, orders]) => (
              <div
                key={time}
                className="bg-white shadow-xl rounded-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                  <h2 className="text-xl font-bold text-white font-sans">
                    زمان ثبت سفارش: {time}
                  </h2>
                  <button
                    onClick={() => toggleGroup(time)}
                    className="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-2 rounded-full shadow hover:shadow-lg transition transform hover:scale-105"
                  >
                    {expandedGroups[time]
                      ? "مخفی کردن محصولات"
                      : "نمایش محصولات"}
                  </button>
                </div>
                <AnimatePresence>
                  {expandedGroups[time] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="p-4 px-0 mr-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {orders.map((item: any, index: number) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-veryLightGray w-[260px] rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-2 p-4 border"
                          >
                            {item.productId?.imageSrc && (
                              <div className="relative w-full h-48 mb-6 overflow-hidden rounded-md ">
                                <Image
                                  src={item.productId.imageSrc}
                                  alt={item.productId.title || "Product Image"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                             )} 
                            <h3 className="font-semibold text-gray-800 mb-2">
                              {item.productId?.title || "Unknown Product"}
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">
                              قیمت: {item.productId?.discountedPrice}
                            </p>
                            <p className="text-sm text-gray-500">
                              تعداد: {item.quantity}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
