"use client";

import { Provider } from "react-redux";
import store from '@/app/store'; // Adjust the path as necessary

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
