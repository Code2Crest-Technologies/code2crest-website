import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Go to Code2Crest home">
      <Image
        src={logo}
        alt="Code2Crest Technologies logo"
        width={260}
        height={52}
      />
    </Link>
  );
}
