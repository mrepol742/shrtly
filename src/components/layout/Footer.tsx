"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faLinkedin,
  faSteam,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import CookiePreference from "../common/CookiePreference";
import TrustPilotWidget from "../common/TrustPilotWidget";
import { usePathname } from "next/navigation";

export default function Footer({ force = false }: { force?: boolean }) {
  const pathname = usePathname();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/gaming", label: "Gaming" },
    { href: "/certificates", label: "Certificates" },
    { href: "/work-experience", label: "Work Experience" },
    { href: "/contact-me", label: "Contact Me" },
  ];

  const projectLinks = [
    {
      href: "https://web-designs.melvinjonesrepol.com",
      label: "Web Design",
      external: true,
    },
    {
      href: "https://wakatime.melvinjonesrepol.com",
      label: "Wakatime Stats",
      external: true,
    },
    { href: "https://www.webvium.com", label: "Webvium Browser" },
    {
      href: "https://www.melvinjonesrepol.com/protocol-discussion-platform",
      label: "Protocol Discussion Platform",
    },
    {
      href: "https://www.melvinjonesrepol.com/axleshift-freight-management",
      label: "Axleshift Freight Management",
    },
    {
      href: "https://www.melvinjonesrepol.com/point-of-sale",
      label: "Point of Sale",
    },
    { href: "https://ulishastore.com", label: "Ulisha Store Laravel" },
    {
      href: "https://www.melvinjonesrepol.com/canis-agent",
      label: "Canis Chatbot",
    },
    {
      href: "https://www.hallofcodes.org",
      label: "Hall of Codes",
      external: true,
    },
    { href: "https://www.melvinjonesrepol.com/sitemap.xml", label: "Sitemap" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com/mrepol742",
      icon: faFacebook,
      label: "Facebook",
    },
    { href: "https://github.com/mrepol742", icon: faGithub, label: "GitHub" },
    {
      href: "https://linkedin.com/in/mrepol742",
      icon: faLinkedin,
      label: "LinkedIn",
    },
    {
      href: "https://youtube.com/@mrepol742",
      icon: faYoutube,
      label: "YouTube",
    },
    {
      href: "https://steamcommunity.com/id/mrepol742",
      icon: faSteam,
      label: "Steam",
    },
  ];

  if (!force && pathname !== "/") return null;

  return (
    <footer className="mt-8 border-t border-[#dbe5de] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-[#17211b] transition-colors hover:text-[#17854b]"
              href="https://www.melvinjonesrepol.com/"
            >
              Melvin Jones Repol
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#657269]">
              Building modern software experiences with passion and precision.
              Striving for excellence, one project at a time.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-[#dbe5de] text-[#526057] transition-colors hover:border-[#17854b] hover:bg-[#eaf5ed] hover:text-[#17854b]"
                >
                  <FontAwesomeIcon icon={icon} className="text-sm" />
                </Link>
              ))}
            </div>

            <div className="mt-5 max-w-xs">
              <TrustPilotWidget />
            </div>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer navigation">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#17854b]">Navigate</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link className="text-[#526057] transition-colors hover:text-[#17854b]" href={`https://www.melvinjonesrepol.com${href}`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Projects */}
          <nav aria-label="Featured projects">
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-[#17854b]">Projects</h4>
            <ul className="mt-4 grid gap-2.5 text-sm">
              {projectLinks.map(({ href, label, external }) => (
                <li key={href}>
                  <Link
                    className="text-[#526057] transition-colors hover:text-[#17854b]"
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#e6ece7] pt-6 text-xs text-[#657269] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Melvin Jones Repol. All rights
            reserved.
          </span>

          <div className="flex flex-wrap items-center gap-2.5">
            <CookiePreference />

            <span aria-hidden="true">·</span>

            <Link
              href="https://status.melvinjonesrepol.com"
              target="_blank"
              className="transition-colors hover:text-[#17854b]"
            >
              Status
            </Link>

            <span aria-hidden="true">·</span>

            <Link
              href="https://www.melvinjonesrepol.com/legal"
              target="_blank"
              className="transition-colors hover:text-[#17854b]"
            >
              Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
