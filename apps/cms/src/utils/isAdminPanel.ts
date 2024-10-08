import type { PayloadRequest } from 'payload'

export const isAdminPanel = (req: PayloadRequest) =>
  req.headers.has('referer') &&
  req.headers.get('referer')?.startsWith(`${process.env.NEXT_PUBLIC_CMS_URL}${req.payload.config.routes.admin}`)
