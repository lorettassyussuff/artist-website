"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteMeta, standaloneNavLinks } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  function renderNavLinks() {
    return standaloneNavLinks.map((link) => {
      const isActive = pathname === link.href;
      return (
        <Link
          key={link.href}
          href={link.href}
          className={`nav-link${isActive ? " active" : ""}`}
          onClick={() => setMobileOpen(false)}
        >
          {link.label}
        </Link>
      );
    });
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-title">
          {siteMeta.name}
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {renderNavLinks()}

          <a
            href={siteMeta.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-link-icon"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
        </nav>

        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="mobile-nav-trigger"
              aria-label="Open navigation menu"
            >
              <span />
              <span />
            </button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="mobile-nav-overlay" />
            <Dialog.Content className="mobile-nav-panel">
              <div className="mobile-nav-header">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="mobile-nav-close"
                    aria-label="Close navigation menu"
                  >
                    <span />
                    <span />
                  </button>
                </Dialog.Close>
              </div>

              <nav className="mobile-nav-links" aria-label="Mobile primary">
                {renderNavLinks()}
                <a
                  href={siteMeta.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link mobile-nav-instagram"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="mobile-nav-instagram-label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                    Instagram
                  </span>
                </a>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
