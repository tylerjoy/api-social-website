"use client"; //client component

import { UserProvider } from "@auth0/nextjs-auth0/client"; //allows us to use authentication hooks
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return <UserProvider>{children}</UserProvider>;
}
