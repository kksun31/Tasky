import { RedirectToSignIn } from '@clerk/nextjs'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

/*const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api(.*)',
])*/

export default clerkMiddleware(async (auth, req) => {
  const isPublicRoute = createRouteMatcher([  '/',])
  const { userId, orgId } = await auth()
  if (userId && isPublicRoute(req)) {
    let path = "/select-org";
    
    if (orgId) {
      path = `/organization/${orgId}`
    }
    
    const orgSelection = new URL(path, req.url)
    return NextResponse.redirect(orgSelection)
  }
  
  
  if (!userId && !isPublicRoute(req)) {
    return RedirectToSignIn({ redirectUrl: req.url });
  }

  if (userId && !orgId && req.nextUrl.pathname !== "/select-org") {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }

//  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/organization(.*)', // Разрешаем все organization routes
  '/platform/organization(.*)',
  ],
}

