"use client";
import useAuth from "@/hooks/useAuth";
import { CheckIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { use, useState } from "react";
import Table from "./Table";
import Loader from "./Loader";
import { createCustomer } from "@/api";
import { useStore } from "@/src/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
const products = [
  {
    id: 0,
    name: "Base",
    price: 29,
    video_quality: "Good",
    resolution: "480p",
    portability: "true",
  },
  {
    id: 1,
    name: "Standard",
    price: 39,
    video_quality: "Better",
    resolution: "1080p",
    portability: "true",
  },
  {
    id: 2,
    name: "Premium",
    price: 56,
    video_quality: "Best",
    resolution: "4K + HDR",
    portability: "true",
  },
];
const Plans = () => {
  const { logout, user } = useAuth();
  const [emailState, setEmailState] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(products[2]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const setSubscription = useStore((state)=>state.setSubscription)
  const setPlan = useStore((state)=>state.setPlan)
  const subState = useStore((state)=>state.setSubscription)
  const router = useRouter()
  const subscribeToPlan = async () => {
    if (!user || !selectedPlan) return;

    const email = user.reloadUserInfo.email;
    setIsBillingLoading(true);

    try {
      await createCustomer(email, selectedPlan);
      setIsBillingLoading(false);
      setSubscription(true);
      setPlan({name:selectedPlan.name,price:selectedPlan.price,resolution:selectedPlan.resolution,})
      router.push('/');
    } catch (error) {
      console.log(error.message);
      setIsBillingLoading(false);
    }
  };
  const checkEmailExists = async () => {
    if (user) {
      const customerCollectionRef = collection(db, "Customers");
      const userEmail = user.reloadUserInfo.email;

      // Query to check if user email is already in the customers collection
      const queryToCheck = query(
        customerCollectionRef,
        where("email", "==", userEmail)
      );

      try {
        const querySnapshot = await getDocs(queryToCheck);
        setEmailState(!querySnapshot.empty);

        if (!querySnapshot.empty) {
          // Redirect to the homepage if the email exists
          router.push("/");
        }
        else {
          return 
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }
  useEffect(()=>{
    checkEmailExists();
  },[user,subState])
  return (
    <div>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>
      <main className="pt-28 max-w-5xl mx-auto px-5 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose a plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>
        <div className="mt-4 flex-col flex space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {products.map((plans, index) => (
              <div
                className={` planBox ${
                  selectedPlan.id === plans.id ? "opacity-100" : "opacity-50"
                } cursor-pointer`}
                onClick={() => setSelectedPlan(plans)}
              >
                {plans.name}
              </div>
            ))}
          </div>
          <Table products={products} selectedPlan={selectedPlan} />
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
