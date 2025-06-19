import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import Providers from "./providers";

import "@/styles/global.scss";

export const metadata: Metadata = {
  title: "Ticto: Teste - NextJS",
  description: "Teste técnico para a Ticto",
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontFamilys = [poppins.style, roboto.style];

  return (
    <html lang="pt_BR" className={fontFamilys.join(", ")}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
