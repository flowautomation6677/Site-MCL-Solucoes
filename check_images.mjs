import fs from 'fs';

const htmlContent = fs.readFileSync('C:\\Users\\luiza\\Downloads\\projeto site mcl\\projeto.html', 'utf-8');
const match = htmlContent.match(/const products = \[([\s\S]*?)\];/);
let productsStr = `[${match[1]}]`;
const productsArray = Function('"use strict";return (' + productsStr + ')')();
const newProducts = productsArray.filter(p => p.category === 'laminados' || p.category === 'vinilicos');

const files = fs.readdirSync('public/images');
const missing = [];

newProducts.forEach(p => {
    // Note: the original code decodes URI, or maybe the problem is non-breaking spaces vs regular spaces
    let EXPECTED = p.image.replace('images/', '');
    if (!files.includes(EXPECTED)) {
        // Find closest
        const closest = files.find(f => f.toLowerCase() === EXPECTED.toLowerCase());
        const closestDecoded = files.find(f => decodeURIComponent(f).toLowerCase() === EXPECTED.toLowerCase());
        const closestNoSpaces = files.find(f => f.replace(/\s/g, '') === EXPECTED.replace(/\s/g, ''));

        console.log(`Missing EXACT MATCH: "${EXPECTED}"`);
        console.log(`  Closest (case-ignore): "${closest}"`);
        console.log(`  Closest (decode): "${closestDecoded}"`);
        console.log(`  Closest (nospaces): "${closestNoSpaces}"`);
        console.log('---');
        missing.push({ expected: EXPECTED, closest: closest || closestDecoded || closestNoSpaces });
    }
});
console.log(`Total mismatched: ${missing.length}`);
