import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const pathsToRevalidate = [
  "/",
  "/about",
  "/selected-works",
  "/cv",
  "/writings",
  "/contact",
];

function isAuthorized(request: NextRequest) {
  const secretFromQuery = request.nextUrl.searchParams.get("secret");
  const secretFromHeader = request.headers.get("x-revalidate-secret");
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!expectedSecret) {
    return false;
  }

  return (
    secretFromQuery === expectedSecret || secretFromHeader === expectedSecret
  );
}

export async function POST(request: NextRequest) {
  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Invalid revalidation secret" },
      { status: 401 },
    );
  }

  for (const path of pathsToRevalidate) {
    revalidatePath(path);
  }

  return NextResponse.json({
    ok: true,
    revalidated: pathsToRevalidate,
    now: Date.now(),
  });
}

