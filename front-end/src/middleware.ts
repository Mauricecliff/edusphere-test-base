import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/' || path === '/login';
  const token = request.cookies.get('token');

  if (token) {
    console.log('token from request signed in >>>', token);
    request.headers.set('Authorization', `Bearer ${token}`);
    // Redirect to the dashboard only if not already there
    if (path !== '/dashboard') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  

  if (!isPublicPath && !token) {
    console.log('token from request >>>', token);
    return NextResponse.redirect(new URL('/', request.url));
  }

  console.log('token >>>', token);

  return NextResponse.next(); // Proceed with the request as normal if none of the above conditions match
}

export const config = {
  matcher: ['/dashboard', '/', '/login'],
};
