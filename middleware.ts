export {default} from 'next-auth/middleware'

export const config = {
    matcher: ["/data/:path", "/Admin/:path*"]
}