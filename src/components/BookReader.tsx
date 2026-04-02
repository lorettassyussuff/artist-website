"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";

type BookReaderProps = {
  pdfUrl: string;
  title: string;
};

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";

function getFittedPageSize(baseWidth: number, baseHeight: number) {
  const targetWidth = Math.max(Math.min(window.innerWidth * 0.62, 920), 320);
  const targetHeight = Math.max(window.innerHeight * 0.85, 320);
  const widthScale = targetWidth / baseWidth;
  const heightScale = targetHeight / baseHeight;
  const scale = Math.min(widthScale, heightScale);

  return {
    scale,
    width: Math.floor(baseWidth * scale),
    height: Math.floor(baseHeight * scale),
  };
}

export default function BookReader({ pdfUrl, title }: BookReaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pdfRef = useRef<PDFDocumentProxy | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [turnDirection, setTurnDirection] = useState<"next" | "prev">("next");
  const [turnSnapshot, setTurnSnapshot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [surfaceSize, setSurfaceSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [isPageReady, setIsPageReady] = useState(false);
  const [hasRenderedInitialPage, setHasRenderedInitialPage] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadPdf() {
      try {
        setError(null);
        setHasRenderedInitialPage(false);
        setIsPageReady(false);
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        if (cancelled) {
          loadingTask.destroy();
          return;
        }

        pdfRef.current = pdf;
        const firstPage = await pdf.getPage(1);

        if (cancelled) {
          return;
        }

        const firstViewport = firstPage.getViewport({ scale: 1 });
        setSurfaceSize(
          getFittedPageSize(firstViewport.width, firstViewport.height),
        );
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
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      try {
        setIsTransitioning(true);
        setIsPageReady(false);

        await new Promise((resolve) => {
          window.setTimeout(resolve, 340);
        });

        if (cancelled) {
          return;
        }

        const pdf = pdfRef.current;

        if (!pdf || pdf.numPages === 0) {
          return;
        }

        const page = await pdf.getPage(currentPage);

        if (cancelled || pdfRef.current !== pdf) {
          return;
        }

        const baseViewport = page.getViewport({ scale: 1 });
        const nextSurfaceSize = getFittedPageSize(
          baseViewport.width,
          baseViewport.height,
        );
        const viewport = page.getViewport({ scale: nextSurfaceSize.scale });
        const context = canvas.getContext("2d");
        const outputScale = Math.max(window.devicePixelRatio || 1, 1.5);

        if (!context) {
          return;
        }

        setSurfaceSize(nextSurfaceSize);
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

        if (!cancelled && pdfRef.current === pdf) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (!cancelled && pdfRef.current === pdf) {
                setIsPageReady(true);
                setHasRenderedInitialPage(true);
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
          setIsPageReady(false);
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

  const isBooting = !hasRenderedInitialPage && !error;

  return (
    <div className="book-reader">
      <div className={`book-reader-stage${isBooting ? " is-hidden" : ""}`}>
        <p className="book-reader-status">
          {pageCount ? `Page ${currentPage} of ${pageCount}` : "Loading"}
        </p>

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
            className={`book-reader-page-surface${
              !isPageReady ? " is-loading" : ""
            }${
              isTransitioning ? " is-transitioning" : ""
            }${
              turnDirection === "prev" ? " is-turning-prev" : " is-turning-next"
            }`}
            style={
              surfaceSize
                ? {
                    width: `${surfaceSize.width + 16}px`,
                    height: `${surfaceSize.height + 16}px`,
                  }
                : undefined
            }
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

          {error ? (
            <div className="book-reader-overlay">
              <p>{error}</p>
            </div>
          ) : null}
        </div>

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
      {isBooting ? (
        <div className="book-reader-loading-state" aria-live="polite">
          <div className="book-reader-loading-spinner" aria-hidden="true" />
          <p>Loading publication</p>
        </div>
      ) : null}
    </div>
  );
}
