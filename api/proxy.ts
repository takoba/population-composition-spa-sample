import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { API_KEY, API_ORIGIN } = process.env
  if (API_KEY === undefined || API_ORIGIN === undefined) {
    throw new Error('Unexpected Error: the required env is undefined.')
  }

  const url = new URL(`${API_ORIGIN}${req.url ?? ''}`)
  url.searchParams.delete('path')

  const response = await fetch(
    url.href,
    {
      method: req.method,
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: ['GET', 'HEAD'].includes(req.method ?? '') ? undefined : req.body,
    },
  )
  res.status(response.status).json(
    await response.json()
  )
}
