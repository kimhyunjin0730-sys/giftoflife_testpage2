import { AboutTabs } from '@/components/about/AboutTabs';

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AboutTabs />
      {children}
    </>
  );
}
