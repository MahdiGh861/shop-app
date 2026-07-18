import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./globals.css";
function Notfound() {
  return (
    <div className="notfound">
      <p className="text-2xl text-foreground">صفحه مورد نظر پیدا نشد</p>
      <Link href="/">
        <Button
          variant="outline"
          className="mt-4 text-primary hover:text-primary"
        >
          بازگشت به صفحه اصلی
        </Button>
      </Link>
    </div>
  );
}

export default Notfound;
