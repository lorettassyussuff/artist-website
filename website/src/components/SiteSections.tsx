import Image from "next/image";
import BookReader from "@/components/BookReader";
import HeroCarousel from "@/components/HeroCarousel";
import PrintCarousel from "@/components/PrintCarousel";
import {
  aboutText,
  aboutPortrait,
  cvSections,
  installationShots,
  paintings,
  prints,
  siteMeta,
  writingText,
} from "@/content/site";

type SectionProps = {
  compact?: boolean;
};

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
}) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {text ? <p className="section-copy">{text}</p> : null}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-media hero-media-single">
        <HeroCarousel images={installationShots} />
      </div>

      <div className="hero-copy">
        <p className="hero-statement">{siteMeta.tagline}</p>
      </div>
    </section>
  );
}

export function AboutSection({ compact = false }: SectionProps) {
  return (
    <section id="about" className={`site-section ${compact ? "compact" : ""}`}>
      <div className={`two-column-section ${compact ? "single-column" : ""}`}>
        <SectionIntro
          eyebrow={compact ? undefined : "About"}
          title={
            compact
              ? undefined
              : "A practice grounded in figuration, memory, and lived interiority."
          }
        />
        <div
          className={`about-grid ${compact ? "centered-section-content" : ""}`}
        >
          <div className="about-copy-block">
            {aboutText.map((paragraph) => (
              <p key={paragraph} className="body-copy">
                {paragraph}
              </p>
            ))}
          </div>
          <figure className="portrait-frame">
            <Image
              src={aboutPortrait}
              alt="Loretta Yussuff in the studio in front of works in progress."
              fill
              sizes="(max-width: 900px) 100vw, 34vw"
              style={{ objectFit: "cover" }}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

export function SelectedWorksSection({ compact = false }: SectionProps) {
  return (
    <section
      id="selected-works"
      className={`site-section works-section ${compact ? "compact" : ""}`}
    >
      <SectionIntro
        title="Paintings"
        text="A focused sequence of paintings presented one image at a time."
      />

      <div className="paintings-stack">
        {paintings.map((painting) => (
          <figure key={painting.src} className="painting-card">
            <Image
              src={painting.src}
              alt={painting.title}
              width={1920}
              height={1080}
              className="painting-image"
            />
            <figcaption className="painting-caption">
              <p className="painting-title">{painting.title}</p>
              <p className="painting-medium">{painting.medium}</p>
              <p className="painting-credit">{painting.credit}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="prints-block">
        <SectionIntro
          eyebrow="Selected Works"
          title="Prints"
          text="A smaller group of works on paper and print-based pieces."
        />
        <PrintCarousel prints={prints} />
      </div>
    </section>
  );
}

export function CVSection({ compact = false }: SectionProps) {
  return (
    <section id="cv" className={`site-section ${compact ? "compact" : ""}`}>
      <div
        className={`two-column-section cv-layout ${compact ? "single-column" : ""}`}
      >
        <SectionIntro
          eyebrow={compact ? undefined : "CV"}
          title={
            compact
              ? undefined
              : "Exhibitions, education, press, awards, and commissions."
          }
        />
        <div
          className={`cv-stack ${compact ? "centered-section-content" : ""}`}
        >
          {cvSections.map((section) => (
            <div key={section.title} className="cv-section-card">
              <h3>{section.title}</h3>
              {Array.isArray(section.lines) ? (
                <div className="cv-line-list">
                  {section.lines.map((line) => (
                    <p key={line} className="cv-line">
                      {line}
                    </p>
                  ))}
                </div>
              ) : Array.isArray(section.entries) ? (
                <div className="cv-entry-list">
                  {section.entries.map((entry) => (
                    <div
                      key={[entry.primary, entry.secondary, entry.meta]
                        .filter(Boolean)
                        .join("-")}
                      className="cv-entry"
                    >
                      <p className="cv-primary">{entry.primary}</p>
                      {entry.secondary ? (
                        <p className="cv-secondary">{entry.secondary}</p>
                      ) : null}
                      {entry.meta ? (
                        <p className="cv-meta">{entry.meta}</p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WritingsSection({ compact = false }: SectionProps) {
  return (
    <section
      id="writings"
      className={`site-section ${compact ? "compact" : ""}`}
    >
      <div
        className={`two-column-section writings-layout ${
          compact ? "single-column" : ""
        }`}
      >
        <SectionIntro
          eyebrow={compact ? undefined : "Writings"}
          title={
            compact
              ? undefined
              : "Writing as a parallel space for image, reflection, and language."
          }
        />
        <div
          className={`writings-grid ${compact ? "centered-section-content" : ""}`}
        >
          <div
            className={`writing-reader ${compact ? "writing-reader-compact" : ""}`}
          >
            {/* <div className="writing-reader-cover">
              <div className="writing-reader-header">
                <div>
                  <h3>THE CRAB</h3>
                </div>
              </div>
              <div className="writing-reader-note">
                {writingText.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div> */}
            <div className="section-intro">
              <h2>THE CRAB</h2>
              {writingText.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {/* <SectionIntro title="THE CRAB" text={writingText[0]} /> */}
            <BookReader pdfUrl={siteMeta.writingsPdf} title="THE CRAB" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ compact = false }: SectionProps) {
  return (
    <section
      id="contact"
      className={`site-section contact-section ${compact ? "compact" : ""}`}
    >
      <div className={`contact-panel ${compact ? "single-column" : ""}`}>
        {!compact ? (
          <SectionIntro
            eyebrow="Contact"
            title="For enquiries, updates, and new work."
          />
        ) : null}
        <div
          className={`contact-ledger ${compact ? "centered-section-content" : ""}`}
        >
          <a href={`mailto:${siteMeta.email}`} className="contact-primary-card">
            <span className="contact-kicker">Email</span>
            <strong>{siteMeta.email}</strong>
            <p>For exhibitions, commissions, studio enquiries, and new work.</p>
          </a>
          <div className="contact-secondary-list">
            <a href={siteMeta.mailingList} className="contact-secondary-row">
              <span className="contact-kicker">Mailing List</span>
              <strong>Join via email</strong>
            </a>
            <a
              href={siteMeta.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-secondary-row"
            >
              <span className="contact-kicker icon-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
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
              <strong>@lorettayussuff</strong>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {siteMeta.name}
      </p>
    </footer>
  );
}
