import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";

export default function Logo() {
  return (
    <Link href="#home" className="inline-flex shrink-0">
      <Image
        src={logo}
        alt="Code2Crest Logo"
        width={260}
        height={52}
      />
    </Link>
  );
}