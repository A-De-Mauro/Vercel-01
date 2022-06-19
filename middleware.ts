/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from 'next/server'

import { supportedLanguages } from './lib/utils/languages'

// This run the middleware only on the specified routes
export const config = {
  matcher: '/',
}

export function middleware(request: NextRequest) {
  const country = request.geo?.country?.toLocaleLowerCase() || 'unsupported'
  const url = request.nextUrl

  // middleware logs for Vercel
  // eslint-disable-next-line no-console
  console.info(request.geo)

  const countryLanguage = supportedLanguages.find(
    (language) => language.country === country || language.code === country
  )

  url.searchParams.set('language', countryLanguage?.code || 'en')
  url.searchParams.set('country', country)

  return NextResponse.rewrite(url)
}
