// node tools/coolify.mjs <METHOD> <path> [jsonBody]  -> Coolify API (personal box)
import { env } from './env.mjs';
const [m = 'GET', p, body] = process.argv.slice(2);
const r = await fetch('https://coolify.mcsyauqi.com/api/v1/' + p.replace(/^\/+/, ''), { method: m, headers: { Authorization: `Bearer ${env.HOSTINGER3_COOLIFY_API_TOKEN}`, 'Content-Type': 'application/json', Accept: 'application/json' }, body });
const t = await r.text(); let j; try { j = JSON.parse(t); } catch { j = t; }
console.log(r.status, typeof j === 'string' ? j.slice(0, 1500) : JSON.stringify(j, null, 1).slice(0, 2500));
