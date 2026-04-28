import type { ReactNode } from "react";

type TabLayoutProps = {
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
};

const TabLayout = ({ title, children, headerAction }: TabLayoutProps) => (
  <div className="flex h-full min-h-0 flex-1 flex-col p-8 ">
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-headline-3 text-brown-600">{title}</h1>
      {headerAction ?? null}
    </header>
    <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
  </div>
);

export default TabLayout;
