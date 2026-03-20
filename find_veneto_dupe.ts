import fs from 'fs'

const data = JSON.parse(fs.readFileSync('all_products_final.json', 'utf8'))
const matches = data.filter((p: any) => p.name.toLowerCase().includes('veneto'))
console.log(JSON.stringify(matches.map((p: any) => ({ name: p.name, slug: p.slug })), null, 2))
