"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

type BookReaderProps = {
  pdfUrl: string;
  title: string;
};

type PdfDocument = PDFDocumentProxy;

export default function BookReader({ pdfUrl, title }: BookReaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pageSurfaceRef = useRef<HTMLDivElement | null>(null);
  const pdfRef = useRef<PdfDocument | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");
  const [turnSnapshot, setTurnSnapshot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        setError(null);

        const pdfjs = await import("pdfjs-dist/webpack");
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        if (cancelled) {
          loadingTask.destroy();
          return;
        }

        pdfRef.current = pdf;
        setPageCount(pdf.numPages);
        setCurrentPage(1);
      } catch (renderError) {
        console.error(renderError);
        if (!cancelled) {
          setError("The publication could not be loaded in the reader.");
        }
      }
    }

    loadPdf();

    return () => {
      cancelled = true;
      pdfRef.current?.destroy?.();
      pdfRef.current = null;
    };
  }, [pdfUrl]);

  useEffect(() => {
    let cancelled = false;

    async function renderCurrentPage() {
      const pdf = pdfRef.current;
      const canvas = canvasRef.current;
      const pageSurface = pageSurfaceRef.current;

      if (!pdf || !canvas || !pageSurface) {
        return;
      }

      try {
        setIsTransitioning(true);

        await new Promise((resolve) => {
          window.setTimeout(resolve, 260);
        });

        const page = await pdf.getPage(currentPage);

        if (cancelled) {
          return;
        }

        const baseViewport = page.getViewport({ scale: 1 });
        const targetWidth = Math.max(
          Math.min(window.innerWidth * 0.62, 920),
          320,
        );
        const targetHeight = Math.max(window.innerHeight * 0.85, 320);
        const widthScale = targetWidth / baseViewport.width;
        const heightScale = targetHeight / baseViewport.height;
        const scale = Math.min(widthScale, heightScale);
        const viewport = page.getViewport({ scale });
        const context = canvas.getContext("2d");
        const outputScale = Math.max(window.devicePixelRatio || 1, 1.5);

        if (!context) {
          return;
        }

        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: context,
          viewport,
          transform:
            outputScale === 1
              ? undefined
              : [outputScale, 0, 0, outputScale, 0, 0],
        }).promise;

        if (!cancelled) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!cancelled) {
                setIsTransitioning(false);
                setTurnSnapshot(null);
              }
            });
          });
        }
      } catch (renderError) {
        console.error(renderError);
        if (!cancelled) {
          setError("The publication could not be loaded in the reader.");
          setIsTransitioning(false);
          setTurnSnapshot(null);
        }
      }
    }

    renderCurrentPage();

    return () => {
      cancelled = true;
    };
  }, [currentPage, pageCount]);

  function goToPage(nextPage: number, direction: "next" | "prev") {
    const currentCanvas = canvasRef.current;

    if (currentCanvas) {
      setTurnSnapshot(currentCanvas.toDataURL("image/png"));
    }

    setTurnDirection(direction);
    setCurrentPage(Math.max(1, Math.min(pageCount, nextPage)));
  }

  return (
    <div className="book-reader">
      <p className="book-reader-status">
        {pageCount ? `Page ${currentPage} of ${pageCount}` : "Loading"}
      </p>
      <div className="book-reader-stage">
        <button
          type="button"
          className="book-reader-button book-reader-button-prev"
          onClick={() => goToPage(currentPage - 1, "prev")}
          disabled={isTransitioning || currentPage <= 1}
        >
          Previous
        </button>

        <div className="book-reader-single-page">
          <div
            ref={pageSurfaceRef}
            className={`book-reader-page-surface${
              isTransitioning ? " is-transitioning" : ""
            }${
              turnDirection === "prev" ? " is-turning-prev" : " is-turning-next"
            }`}
          >
            {turnSnapshot ? (
              <img
                src={turnSnapshot}
                alt=""
                aria-hidden="true"
                className={`book-reader-turn-snapshot${
                  isTransitioning ? " is-transitioning" : ""
                }${
                  turnDirection === "prev"
                    ? " is-turning-prev"
                    : " is-turning-next"
                }`}
              />
            ) : null}
            <canvas
              ref={canvasRef}
              aria-label={`${title} page ${currentPage}`}
            />
          </div>
        </div>

        {error ? (
          <div className="book-reader-overlay">
            <p>{error}</p>
          </div>
        ) : null}

        <button
          type="button"
          className="book-reader-button book-reader-button-next"
          onClick={() => goToPage(currentPage + 1, "next")}
          disabled={
            isTransitioning || pageCount === 0 || currentPage >= pageCount
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}
