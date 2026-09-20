import Link from "next/link";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-[70vh] items-center justify-center px-6 py-16">
        <section className="w-full max-w-xl text-center">
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#17211b] sm:text-5xl">
            This link leads nowhere.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#657269]">
            The page may have moved, expired, or never existed. Return to Shrtly
            to generate a new link. Link expires in 24 hours upon creation
            regardless of usage.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-xl bg-[#17854b] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#146c3d]"
            >
              Go to homepage
            </Link>
            <Link
              href="https://www.melvinjonesrepol.com/contact-me"
              className="rounded-xl border border-[#b9c6bd] bg-white px-5 py-3 text-sm font-semibold text-[#334139] transition-colors hover:border-[#17854b] hover:bg-[#eaf5ed]"
            >
              Get in touch
            </Link>
          </div>
        </section>
      </main>
      <Footer force />
    </>
  );
}
