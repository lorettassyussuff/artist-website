"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import type { DocumentCallback } from "react-pdf/dist/shared/types.js";

type BookReaderProps = {
  pdfUrl: string;
  title: string;
};

type PageSize = {
  width: number;
  height: number;
};

type FlipBookHandle = {
  pageFlip: () => {
    getCurrentPageIndex: () => number;
  } | null;
};

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function getFittedPageSize(baseWidth: number, baseHeight: number): PageSize {
  const isMobile = window.innerWidth <= 720;
  const targetWidth = isMobile
    ? Math.max(Math.min(window.innerWidth * 0.94, 600), 340)
    : Math.max(Math.min(window.innerWidth * 0.4, 760), 440);
  const targetHeight = isMobile
    ? Math.max(Math.min(window.innerHeight * 0.78, 860), 430)
    : Math.max(Math.min(window.innerHeight * 0.86, 1000), 500);
  const widthScale = targetWidth / baseWidth;
  const heightScale = targetHeight / baseHeight;
  const scale = Math.min(widthScale, heightScale);

  return {
    width: Math.floor(baseWidth * scale),
    height: Math.floor(baseHeight * scale),
  };
}

const FlipPage = forwardRef<
  HTMLDivElement,
  { children: ReactNode; pageNumber: number }
>(function FlipPage({ children, pageNumber }, ref) {
  return (
    <div ref={ref} className="book-reader-flip-page">
      <div
        className="book-reader-flip-page-inner"
        data-page-number={pageNumber}
      >
        {children}
      </div>
    </div>
  );
});

export default function BookReader({ pdfUrl, title }: BookReaderProps) {
  const flipBookRef = useRef<FlipBookHandle | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize | null>(null);
  const [sourcePageSize, setSourcePageSize] = useState<PageSize | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!sourcePageSize) {
      return;
    }

    const baseSize = sourcePageSize;

    function handleResize() {
      setPageSize(getFittedPageSize(baseSize.width, baseSize.height));
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sourcePageSize]);

  async function handleDocumentLoadSuccess(pdf: DocumentCallback) {
    try {
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });
      const baseSize = {
        width: viewport.width,
        height: viewport.height,
      };

      setSourcePageSize(baseSize);
      setPageSize(getFittedPageSize(baseSize.width, baseSize.height));
      setPageCount(pdf.numPages);
      setCurrentPage(1);
      setError(null);
      setIsLoaded(true);
    } catch (loadError) {
      console.error(loadError);
      setError("The publication could not be loaded in the reader.");
      setIsLoaded(true);
    }
  }

  function handleDocumentLoadError(loadError: Error) {
    console.error(loadError);
    setError("The publication could not be loaded in the reader.");
    setIsLoaded(true);
  }

  const pages = useMemo(() => {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }, [pageCount]);

  const isBooting = !isLoaded && !error;

  function syncCurrentPage(pageIndex?: number) {
    const resolvedPageIndex =
      pageIndex ?? flipBookRef.current?.pageFlip()?.getCurrentPageIndex();

    if (typeof resolvedPageIndex !== "number") {
      return;
    }

    const normalizedPageIndex =
      pageCount > 0
        ? ((resolvedPageIndex % pageCount) + pageCount) % pageCount
        : resolvedPageIndex;

    setCurrentPage(normalizedPageIndex + 1);
  }

  return (
    <div className="book-reader">
      {isBooting ? (
        <div className="book-reader-loading-state" aria-live="polite">
          <div className="book-reader-loading-spinner" aria-hidden="true" />
          <p>Loading publication</p>
        </div>
      ) : null}

      <div className="book-reader-stage">
        <p className="book-reader-status">
          {pageCount ? `Page ${currentPage} of ${pageCount}` : "Loading"}
        </p>

        <div className="book-reader-single-page" aria-label={title}>
          {error ? (
            <div className="book-reader-overlay">
              <p>{error}</p>
            </div>
          ) : null}

          <Document
            key={pdfUrl}
            file={pdfUrl}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={handleDocumentLoadError}
            loading={null}
            error={null}
            noData={null}
            className="book-reader-document"
          >
            {pageSize ? (
              <HTMLFlipBook
                ref={flipBookRef}
                width={pageSize.width}
                height={pageSize.height}
                minWidth={pageSize.width}
                maxWidth={pageSize.width}
                minHeight={pageSize.height}
                maxHeight={pageSize.height}
                size="fixed"
                autoSize
                drawShadow
                flippingTime={900}
                usePortrait
                startPage={0}
                startZIndex={0}
                maxShadowOpacity={0.18}
                mobileScrollSupport={false}
                clickEventForward={false}
                useMouseEvents
                swipeDistance={24}
                showPageCorners={false}
                disableFlipByClick={false}
                showCover={false}
                className="book-reader-flipbook"
                style={{}}
                onFlip={(event) => {
                  syncCurrentPage(Number(event.data));
                }}
                onInit={(event) => {
                  syncCurrentPage(Number(event.data.page));
                }}
                onUpdate={(event) => {
                  syncCurrentPage(Number(event.data.page));
                }}
                onChangeState={(event) => {
                  if (event.data === "read") {
                    syncCurrentPage();
                  }
                }}
              >
                {pages.map((pageNumber) => (
                  <FlipPage key={pageNumber} pageNumber={pageNumber}>
                    <Page
                      pageNumber={pageNumber}
                      width={pageSize.width}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      loading={null}
                    />
                  </FlipPage>
                ))}
              </HTMLFlipBook>
            ) : null}
          </Document>
        </div>
      </div>
    </div>
  );
}
