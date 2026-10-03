// node tools/dns.mjs [create]  -> A konsep.mcsyauqi.com -> 72.61.143.148 (DNS-only)
import { env } from './env.mjs';
const H = { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`, 'Content-Type': 'application/json' };
const cf = (p, o = {}) => fetch('https://api.cloudflare.com/client/v4' + p, { headers: H, ...o }).then(r => r.json());
const zid = (await cf('/zones?name=mcsyauqi.com')).result[0].id;
const recs = await cf(`/zones/${zid}/dns_records?name=konsep.mcsyauqi.com`);
console.log('existing', JSON.stringify(recs.result.map(r => [r.type, r.content, r.proxied])));
if (process.argv[2] === 'create' && !recs.result.length) {
  const r = await cf(`/zones/${zid}/dns_records`, { method: 'POST', body: JSON.stringify({ type: 'A', name: 'konsep', content: '72.61.143.148', ttl: 300, proxied: false }) });
  console.log('create', r.success, JSON.stringify(r.errors));
}
