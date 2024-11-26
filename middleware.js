// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const token = request.cookies.get("token");

//   if (!token) {
//     return NextResponse.redirect(new URL("/about", request.url));
//   }

//   return NextResponse.next();
// }

import { auth } from "@/app/_library/auth";
export const middleware = auth;
export const config = {
  matcher: ["/account"]
};
