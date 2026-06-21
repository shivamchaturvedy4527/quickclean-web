const HELP: Record<string, string> = {
  settings: "Logo, header menu, phone/timing, email, address, footer — site-wide settings.",
  home: "Home page (/): hero banner, video, client logos, testimonials, installation photos.",
  about: "About Us page (/about-us) ka content.",
  sustainability: "Sustainability page — Company menu mein hai.",
  solutions: "Solutions page aur teeno solution pages.",
  products: "Products page (/products) — page heading + har machine + pressing machines. Sab ek jagah.",
  contact: "Contact Us page (/contact-us).",
  news: "News articles — home page par bhi dikhte hain.",
  messages: "Contact form aur newsletter ke messages — sirf padhne ke liye.",
  security: "Admin password change.",
};

export function TabHelp({ tab }: { tab: string }) {
  const text = HELP[tab];
  if (!text) return null;
  return (
    <div className="mb-4 max-w-3xl rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-sky-950">
      {text} — phir <strong>Publish to Website</strong> dabao.
    </div>
  );
}
