const INDIAN_PHONE_REGEX = /^(\+91|91)?[6-9]\d{9}$/;

export function normalizeIndianPhone(phone: string): string {
  return phone.replace(/[\s-]/g, "");
}

export function isValidIndianPhone(phone: string): boolean {
  return INDIAN_PHONE_REGEX.test(normalizeIndianPhone(phone));
}

export function formatIndianPhoneDisplay(phone: string): string {
  const digits = normalizeIndianPhone(phone).replace(/^(\+91|91)/, "");
  return `+91 ${digits}`;
}

export function buildWhatsAppMessage({
  name,
  phone,
  inquiry,
  greetingTemplate,
  defaultPrefix,
}: {
  name: string;
  phone: string;
  inquiry?: string;
  greetingTemplate: string;
  defaultPrefix?: string;
}): string {
  const template =
    greetingTemplate.trim() ||
    "Hi, I'm {name}. My number is {phone}. I'd like to inquire about your laundry machines/services.";

  const body = template
    .replace(/\{name\}/gi, name.trim())
    .replace(/\{phone\}/gi, formatIndianPhoneDisplay(phone));

  const prefix = defaultPrefix?.trim();
  const parts = [prefix, body, inquiry?.trim()].filter(Boolean);
  return parts.join("\n\n");
}
