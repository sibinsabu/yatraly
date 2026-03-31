import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Extremely basic in-memory rate limiter for demonstration purposes.
// For production Vercel, use @upstash/ratelimit.
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();

export function proxy(request: NextRequest) {
  // Only apply to public endpoints / auth endpoints or all pages basically
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown-ip';
  
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 100; // Sensible default

  const now = Date.now();
  const limitData = rateLimitMap.get(ip);

  if (!limitData || now - limitData.timestamp > windowMs) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  } else {
    limitData.count++;
    if (limitData.count > maxRequests) {
      // Graceful 429
      return new NextResponse('Too Many Requests. Please try again later.', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'Content-Type': 'text/plain'
        }
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
