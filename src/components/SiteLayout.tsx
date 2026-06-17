import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { getCMS } from "@/lib/cms-store";

export async function SiteLayout({ children }: { children: React.ReactNode }) {
  const cms = await getCMS();

  return (
    <CurrencyProvider>
      <Header navigation={cms.navigation} settings={cms.settings} />
      <main className="flex-1">{children}</main>
      <Footer
        navigation={cms.navigation}
        settings={cms.settings}
        aboutText={cms.footer.aboutText}
        copyright={cms.footer.copyright}
      />
      <WhatsAppButton
        number={cms.settings.whatsappNumber}
        message={cms.settings.whatsappMessage}
      />
      <LiveChatWidget embedCode={cms.settings.liveChatEmbed} />
    </CurrencyProvider>
  );
}
