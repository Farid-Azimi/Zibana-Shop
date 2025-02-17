"use client";
import Layout from "@/components/Layout/Layout";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

interface Order {
  _id: string;
  purchasedAt: string; // or Date if applicable
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

  // Always call all hooks
  useEffect(() => {
    // Only fetch if id and token are available.
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

  // Now conditionally render the UI after all hooks have been called.
  if (!id || !token) {
    return (
      <Layout>
        <div className="min-h-screen container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
            لطفاً وارد شوید یا ثبت‌نام کنید
          </h1>
          <p className="text-center text-gray-500">
            برای مشاهده سفارشات خود، ابتدا وارد حساب کاربری خود شوید یا ثبت‌نام کنید.
          </p>
        </div>
      </Layout>
    );
  }

  // Group orders by purchase time using full locale string (or change to toLocaleDateString)
  const groupedOrders = purchaseHistory.reduce((groups, order) => {
    const purchaseTime = new Date(order.purchasedAt).toLocaleString();
    if (!groups[purchaseTime]) {
      groups[purchaseTime] = [];
    }
    groups[purchaseTime].push(order);
    return groups;
  }, {} as { [key: string]: Order[] });

  // Toggle the visibility of orders for a given purchase time.
  const toggleGroup = (time: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [time]: !prev[time],
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
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
                  <h2 className="text-2xl font-bold text-white">
                    زمان خرید: {time}
                  </h2>
                  <button
                    onClick={() => toggleGroup(time)}
                    className="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-2 rounded-full shadow hover:shadow-lg transition transform hover:scale-105"
                  >
                    {expandedGroups[time]
                      ? "مخفی کردن سفارشات"
                      : "نمایش سفارشات"}
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
                      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {orders.map((item: any, index: number) => (
                          <motion.div
                            key={item._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-50 rounded-lg shadow hover:shadow-2xl transition transform hover:-translate-y-2 p-4 border"
                          >
                            {item.productId?.imageSrc && (
                              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md">
                                <Image
                                  src={item.productId.imageSrc}
                                  alt={item.productId.title || "Product Image"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {item.productId?.title || "Unknown Product"}
                            </h3>
                            <p className="text-sm text-gray-500 mb-1">
                              زمان خرید:{" "}
                              {new Date(item.purchasedAt).toLocaleString()}
                            </p>
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
