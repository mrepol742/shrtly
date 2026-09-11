import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-6 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
        <span>&copy;2026 Shrtly. All rights reserved.</span>
        <div>
          Built and designed by&nbsp;
          <Link
            href="melvinjonesrepol.com"
            className="hover:text-gray-400 transition-colors"
          >
            melvinjonesrepol.com
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            href="https://www.melvinjonesrepol.com/legal/terms-of-service"
            className="hover:text-gray-400 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="https://www.melvinjonesrepol.com/legal/privacy-policy"
            className="hover:text-gray-400 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
