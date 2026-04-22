import type { Metadata } from 'next';
import { Fraunces, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LangProvider } from '@/i18n/LangProvider';
import { NotificationBar } from '@/components/NotificationBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FloatingButtons } from '@/components/FloatingButtons';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['SOFT', 'opsz'],
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: '생명의 선물 코리아 | Gift of Life International Korea',
    template: '%s · 생명의 선물 코리아',
  },
  description:
    '선천성 심장병을 가진 세계 각국의 어린이들에게 수술과 지원을 제공하는 비영리 단체 Gift of Life International Korea. 당신의 후원이 한 아이의 심장을 구합니다.',
  metadataBase: new URL('https://giftoflife-testpage2.vercel.app'),
  openGraph: {
    type: 'website',
    title: '생명의 선물 코리아',
    description: '선천성 심장병 어린이들에게 새 삶을 선물합니다.',
    locale: 'ko_KR',
  },
  icons: {
    icon: '/gift_of_life_logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`${fraunces.variable} ${manrope.variable} ${mono.variable}`}
    >
      <body>
        <LangProvider>
          <NotificationBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingButtons />
        </LangProvider>
      </body>
    </html>
  );
}
