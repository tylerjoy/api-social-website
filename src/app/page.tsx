"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Script from "next/script";
import { type Subscription, getSubscriptionAction } from "./actions";
import { useEffect, useState } from "react";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default function Home() {
  const { user, isLoading } = useUser();
  const [subscription, setSubscription] = useState<Subscription>();

  useEffect(() => {
    if (!user) return;
    if (!user.email) return;
    getSubscriptionAction(user.email).then(setSubscription);
  }, [user]);

  // console.log(getSubscriptionAction("mrjoy206@gmail.com"));
  // console.log()

  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {user ? (
        <>
          Welcome {user.name}!<a href="/api/auth/logout">Logout</a>
          {!subscription && (
            <>
              <Script async src="https://js.stripe.com/v3/pricing-table.js" />
              <div>{subscription}</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: `
                <stripe-pricing-table
                pricing-table-id="prctbl_1OZiAjBQWIJh4a3OXVDsdNfg"
                publishable-key="pk_test_51OZi2ZBQWIJh4a3O1ucP5dOjXUfhjIIB77hMC11XeOwLOOiOWlxSswYvpf5Oev1axkcy5JzAGpK15tAszHeAx4Tl00jXywdMgu"
              ></stripe-pricing-table>`,
                }}
              ></div>
            </>
          )}
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </main>
  );
}
