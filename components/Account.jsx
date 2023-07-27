"use client";
import { getCustomersData } from "@/api";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Membership from "./Membership";
const Account = () => {
  const { user,logout } = useAuth();
  const [customer, setCustomer] = useState([]);
  //   const userEmail =;

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userEmail = user.reloadUserInfo.email;
        try {
          const data = await getCustomersData(userEmail);

          if (data && data.length > 0) {
            setCustomer(data);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <header className={`bg-[#141414]`}>
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>
        <Link href="/accounts">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>
      <main className="pt-24 mx-auto max-w-6xl px-5 pb-12 transition-all md:px-10">
        <div className="flex gap-x-4 flex-col md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
            <p className="text-xs font-semibold text-[#555]">
              Member since{" "}
              {customer.map((data) => {
                const createdAtDate = new Date(
                  data.createAt.toDate()
                ).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });
                return (
                  <span
                    className="text-xs font-semibold text-[#555]"
                    key={data.id}
                  >
                    {createdAtDate}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
        <Membership/>
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0">
          <h4>Plan Details</h4>
          {/*Find Current Plan*/}
          {customer.map((data) => {
            const plan = data.plan.name;
            return <div key={data.id}>{plan}</div>;
          })}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </>
  );
};

export default Account;
