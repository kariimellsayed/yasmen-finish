// app/[locale]/layout.tsx

import "./globals.css";
import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import AppProviderWrapper from "../Context/AppProviderWrapper";

export const metadata = {
  title: "Home",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} dir="ltr">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviderWrapper>
            <Navbar />
            {children}
            <Footer />
          </AppProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
