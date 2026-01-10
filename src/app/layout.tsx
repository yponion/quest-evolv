import type { Metadata } from "next";
import "@/styles/globals.css";
import ReactQueryProvider from "@/providers/QueryClientProvider";

export const metadata: Metadata = {
  title: "이볼브 프론트엔드 과제 - 양정운",
  description: "이볼브 프론트엔드 지원자 양정운님의 과제입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
