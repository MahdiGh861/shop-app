import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import "../globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
        <Header/>
        <main className="flex-1 max-w-7xl p-5 px-10 w-full mx-auto">
            {children}
        </main>
        <Footer/>
    </div>
  );
}
