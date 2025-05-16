import { NextResponse, NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
  const token = req.cookies.get('token');
  const { pathname } = req.nextUrl;

  // List of protected paths
  // const protectedPaths = [
  //   '/blog-articles',
  //   '/organizations',
  //   '/users',
  //   '/model-documents',
  //   '/tasks',
  //   '/task-templates'
  // ];

  // Check if the current path is protected
  // const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));

  // if (!token) {
  //   if(req.url !== '/?token'){

  //     return NextResponse.redirect(new URL('https://cco-portal-sria.vercel.app/', req.nextUrl));
  //   }
  // Redirect to login if trying to access protected path without token
  // }

  // Allow the request to continue if:
  // 1. There's a token, or
  // 2. It's not a protected path
  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     '/blog-articles/:path*',
//     '/organizations/:path*',
//     '/users/:path*',
//     '/model-documents/:path*',
//     '/tasks/:path*',
//     '/task-templates/:path*','/blog-articles'
//   ]
// };
