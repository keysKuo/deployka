import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider"
import AuthProvider from "@/components/providers/auth-provider";
import Header from "./components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { WebSocketProvider } from "@/components/providers/socket-provider";
// const geistSans = localFont({
//     src: "./fonts/GeistVF.woff",
//     variable: "--font-geist-sans",
//     weight: "100 900",
// });
// const geistMono = localFont({
//     src: "./fonts/GeistMonoVF.woff",
//     variable: "--font-geist-mono",
//     weight: "100 900",
// });

const poppinsMedium = localFont({
    src: "./fonts/Poppins-Medium.ttf",
    variable: "--font-poppins",
    weight: "100 900",
})

const spaceGrotesk = localFont({
    src: "./fonts/SpaceGrotesk.ttf",
    variable: "--font-space",
    weight: "100 900",
})

export const metadata: Metadata = {
    title: "Deployka Cloud",
    description: "Build your own website instantly",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body
                className={`${poppinsMedium.variable} ${spaceGrotesk.variable} antialiased`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        <Header session={session} />
                        {/* <WebSocketProvider> */}
                            {children}
                        {/* </WebSocketProvider> */}
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
