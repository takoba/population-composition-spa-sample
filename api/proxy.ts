import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { API_KEY, API_ORIGIN } = process.env

  const response = await fetch(`${API_ORIGIN}${req.url}`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY ?? ''
    },
    body: req.body,
  })

  res.status(response.status).json(
    await response.json()
  )
}
