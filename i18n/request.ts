import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  let messages;

  switch (locale) {
    case "en":
      messages = (await import("../messages/en.json")).default;
      break;
    case "ar":
      messages = (await import("../messages/ar.json")).default;
      break;
    default:
      messages = (await import("../messages/en.json")).default;
      break;
  }

  return {
    locale,
    messages,
  };
});
