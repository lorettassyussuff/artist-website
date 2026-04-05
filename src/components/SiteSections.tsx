import Image from "next/image";
import WritingsReader from "@/components/WritingsReader";
import type {
  AboutContent,
  ContactContent,
  CvSectionContent,
  HeroContent,
  SelectedWorksContent,
  WritingsContent,
} from "@/lib/sanity/queries";

type SectionProps = {
  compact?: boolean;
};

function SectionFallback({ message }: { message: string }) {
  return <div className="section-fallback">{message}</div>;
}

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

export function HeroSection({
  imageSrc,
  imageAlt,
  caption,
  statement,
}: HeroContent) {
  if (!imageSrc && !caption && !statement) {
    return (
      <section className="hero-section">
        <SectionFallback message="Content unavailable." />
      </section>
    );
  }

  return (
    <section className="hero-section">
      <div className="hero-media hero-media-single">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            style={{ objectFit: "cover" }}
            priority
          />
        ) : null}
      </div>

      <div className="hero-copy">
        <p className="hero-statement">{caption}</p>
        {statement ? <p className="section-copy">{statement}</p> : null}
      </div>
    </section>
  );
}

type AboutSectionProps = SectionProps & AboutContent;

export function AboutSection({
  compact = false,
  sectionEyebrow,
  sectionTitle,
  header,
  paragraphs,
  portraitSrc,
  portraitAlt,
}: AboutSectionProps) {
  const hasHeader = Boolean(header);
  const hasParagraphs = paragraphs.length > 0;
  const hasCopy = hasHeader || hasParagraphs;
  const hasPortrait = Boolean(portraitSrc);
  const shouldOffsetPortrait = hasHeader && hasParagraphs;

  return (
    <section id="about" className={`site-section ${compact ? "compact" : ""}`}>
      <div className={`two-column-section ${compact ? "single-column" : ""}`}>
        <SectionIntro
          eyebrow={compact ? undefined : sectionEyebrow}
          title={compact ? undefined : sectionTitle}
        />
        <div
          className={`about-grid ${compact ? "centered-section-content" : ""}`}
        >
          {hasCopy ? (
            <>
              {hasHeader ? (
                <div className="about-copy-block about-copy-block-lead">
                  <p className="about-kicker">{header}</p>
                </div>
              ) : null}
              {hasParagraphs ? (
                <div
                  className={`about-copy-block${
                    hasHeader ? " about-copy-block-rest" : ""
                  }`}
                >
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph} className="body-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <SectionFallback message="Content unavailable." />
          )}
          {hasPortrait ? (
            <figure
              className={`portrait-frame${
                shouldOffsetPortrait ? " portrait-frame-offset" : ""
              }`}
            >
              <Image
                src={portraitSrc}
                alt={portraitAlt}
                fill
                sizes="(max-width: 900px) 100vw, 34vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type SelectedWorksSectionProps = SectionProps & SelectedWorksContent;

export function SelectedWorksSection({
  compact = false,
  paintingsTitle,
  paintingsIntro,
  paintingsNavLabel,
  printsTitle,
  printsIntro,
  printsNavLabel,
  paintings,
  prints,
}: SelectedWorksSectionProps) {
  const hasPaintings = paintings.length > 0;
  const hasPrints = prints.length > 0;

  return (
    <section
      id="selected-works"
      className={`site-section works-section ${compact ? "compact" : ""}`}
    >
      <div className="works-primary">
        <div
          className={`works-header-shell ${
            compact ? "centered-section-content" : ""
          }`}
        >
          <div className="works-header-copy">
            <SectionIntro title={paintingsTitle} text={paintingsIntro} />
          </div>
          <div className="works-header-nav-column">
            <nav
              className="works-jump-nav"
              aria-label="Selected works sections"
            >
              <div className="works-jump-nav-box">
                {hasPaintings && paintingsNavLabel ? (
                  <a href="#selected-works" className="works-jump-link">
                    {paintingsNavLabel}
                  </a>
                ) : null}
                {hasPrints && printsNavLabel ? (
                  <a href="#prints" className="works-jump-link">
                    {printsNavLabel}
                  </a>
                ) : null}
              </div>
            </nav>
          </div>
        </div>

        <div className="paintings-stack">
          {hasPaintings ? (
            paintings.map((painting, index) => {
              const aspectRatio = painting.imageWidth / painting.imageHeight;
              const orientationClass =
                aspectRatio < 0.65
                  ? "very-portrait"
                  : aspectRatio < 0.95
                    ? "portrait"
                    : aspectRatio <= 1.08
                      ? "balanced"
                      : aspectRatio <= 1.45
                        ? "landscape"
                        : "very-landscape";
              const imageSizes =
                orientationClass === "very-portrait"
                  ? "(max-width: 720px) 92vw, (max-width: 1512px) 24vw, 20vw"
                  : orientationClass === "portrait"
                    ? "(max-width: 720px) 92vw, (max-width: 1512px) 28vw, 24vw"
                    : orientationClass === "balanced"
                      ? "(max-width: 720px) 92vw, 30vw"
                      : orientationClass === "landscape"
                        ? "(max-width: 720px) 92vw, (max-width: 1512px) 48vw, 42vw"
                        : "(max-width: 720px) 92vw, (max-width: 1512px) 68vw, 56vw";

              return (
                <figure
                  key={painting.src}
                  className={`painting-card painting-card-${orientationClass}`}
                >
                  <div
                    className={`painting-frame painting-frame-${orientationClass}`}
                  >
                    <Image
                      src={painting.src}
                      alt={painting.title}
                      width={painting.imageWidth}
                      height={painting.imageHeight}
                      className="painting-image"
                      sizes={imageSizes}
                      priority={index === 0}
                    />
                  </div>
                  <figcaption className="painting-caption">
                    <p className="painting-title">{painting.title}</p>
                    <p className="painting-medium">{painting.medium}</p>
                    <p className="painting-credit">{painting.credit}</p>
                  </figcaption>
                </figure>
              );
            })
          ) : (
            <SectionFallback message="Content unavailable." />
          )}
        </div>

        {hasPrints ? (
          <div id="prints" className="prints-header">
            <SectionIntro title={printsTitle} text={printsIntro} />
          </div>
        ) : null}
      </div>

      {hasPrints ? (
        <div className="prints-block">
          <div className="prints-stack">
            {prints.map((print) => (
              <figure key={print.src} className="print-card">
                <Image
                  src={print.src}
                  alt={print.title}
                  width={print.imageWidth}
                  height={print.imageHeight}
                  className="print-image"
                  sizes="(max-width: 720px) 88vw, 40vw"
                />
                <figcaption className="print-caption">
                  <p className="print-title">{print.title}</p>
                  <p className="print-medium">{print.medium}</p>
                  <p className="print-credit">{print.credit}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

type CvSectionProps = SectionProps & {
  sections: CvSectionContent[];
} & {
  title: string;
  sectionEyebrow: string;
  sectionTitle: string;
};

export function CVSection({
  compact = false,
  sectionEyebrow,
  sectionTitle,
  sections,
}: CvSectionProps) {
  return (
    <section id="cv" className={`site-section ${compact ? "compact" : ""}`}>
      <div
        className={`two-column-section cv-layout ${compact ? "single-column" : ""}`}
      >
        <SectionIntro
          eyebrow={compact ? undefined : sectionEyebrow}
          title={compact ? undefined : sectionTitle}
        />
        <div
          className={`cv-stack ${compact ? "centered-section-content" : ""}`}
        >
          {sections.length > 0 ? (
            sections.map((section) => (
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
            ))
          ) : (
            <SectionFallback message="Content unavailable." />
          )}
        </div>
      </div>
    </section>
  );
}

type WritingsSectionProps = SectionProps & WritingsContent;

export function WritingsSection({
  compact = false,
  sectionEyebrow,
  sectionTitle,
  publicationTitle,
  publicationDescription,
  pdfUrl,
}: WritingsSectionProps) {
  const hasReader = Boolean(pdfUrl && publicationTitle);

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
        {!compact ? (
          <SectionIntro eyebrow={sectionEyebrow} title={sectionTitle} />
        ) : null}
        <div
          className={`writings-grid ${compact ? "centered-section-content" : ""}`}
        >
          <div
            className={`writing-reader ${compact ? "writing-reader-compact" : ""}`}
          >
            <div
              className={`section-intro ${compact ? "compact-section-intro" : ""}`}
            >
              {publicationTitle ? <h2>{publicationTitle}</h2> : null}
              {publicationDescription ? <p>{publicationDescription}</p> : null}
            </div>
            {hasReader ? (
              <WritingsReader
                key={pdfUrl}
                pdfUrl={pdfUrl}
                title={publicationTitle}
              />
            ) : (
              <SectionFallback message="Content unavailable." />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactSectionProps = SectionProps & ContactContent;

export function ContactSection({
  compact = false,
  sectionEyebrow,
  sectionTitle,
  email,
  emailDescription,
  mailingListHref,
  mailingListLabel,
  instagramHref,
  instagramLabel,
}: ContactSectionProps) {
  const hasEmail = Boolean(email);
  const hasMailingList = Boolean(mailingListHref || mailingListLabel);
  const hasInstagram = Boolean(instagramHref || instagramLabel);

  return (
    <section
      id="contact"
      className={`site-section contact-section ${compact ? "compact" : ""}`}
    >
      <div className={`contact-panel ${compact ? "single-column" : ""}`}>
        {!compact ? (
          <SectionIntro eyebrow={sectionEyebrow} title={sectionTitle} />
        ) : null}
        <div
          className={`contact-ledger ${compact ? "centered-section-content" : ""}`}
        >
          {hasEmail ? (
            <div className="contact-primary-card">
              <span className="contact-kicker">Email</span>
              <strong>{email}</strong>
              <p>{emailDescription}</p>
            </div>
          ) : (
            <SectionFallback message="Content unavailable." />
          )}
          {hasMailingList || hasInstagram ? (
            <div className="contact-secondary-list">
              {hasMailingList ? (
                <div className="contact-secondary-row">
                  {/* <a href={mailingListHref} className="contact-secondary-row"> */}
                  <span className="contact-kicker">Mailing List</span>
                  <strong>{mailingListLabel}</strong>
                  {/* </a> */}
                </div>
              ) : null}
              {hasInstagram ? (
                <a
                  href={instagramHref}
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
                  <strong>{instagramLabel}</strong>
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ siteName }: { siteName: string }) {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {siteName}
      </p>
    </footer>
  );
}
