import { NextRequest, NextResponse } from 'next/server';

export const config = {
  //  The matcher config can also take an array of path
  matcher: '/dashboard/:path*',
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
