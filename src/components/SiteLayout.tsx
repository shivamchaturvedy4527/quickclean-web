import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { CookieConsent } from "@/components/CookieConsent";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { LabelsProvider } from "@/context/LabelsContext";
import { getCMS } from "@/lib/cms-store";

export async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cms = await getCMS();

  return (
    <LabelsProvider labels={cms.labels}>
      <CurrencyProvider>
        <TopBar settings={cms.settings} />
        <Header navigation={cms.navigation} settings={cms.settings} />
        <main className="flex-1">{children}</main>
        <Footer navigation={cms.navigation} settings={cms.settings} footer={cms.footer} />
        <WhatsAppButton
          number={cms.settings.whatsappNumber}
          defaultPrefix={cms.settings.whatsappMessage}
          greetingTemplate={
            cms.settings.whatsappGreetingTemplate ||
            "Hi, I'm {name}. My number is {phone}. I'd like to inquire about your laundry machines/services."
          }
          labels={cms.labels.whatsapp}
        />
        <LiveChatWidget embedCode={cms.settings.liveChatEmbed} />
        <CookieConsent content={cms.cookieConsent} />
      </CurrencyProvider>
    </LabelsProvider>
  );
}
