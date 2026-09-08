import { getPayload } from 'payload';
import config from '@payload-config';

export async function GET() {
  const p = await getPayload({ config });
  const r = await p.find({ collection: 'wisata', limit: 3 });
  return Response.json({ count: r.docs.length });
}
