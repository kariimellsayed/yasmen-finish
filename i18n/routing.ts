import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ar"],  // اضفت العربية هنا
  defaultLocale: "en",
});
