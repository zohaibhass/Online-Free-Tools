const fs = require('fs');
const path = require('path');
const blogPath = path.resolve(__dirname, 'lib', 'blog-posts.ts');
const blogText = fs.readFileSync(blogPath, 'utf8');

const postBlocks = blogText.split("slug: '").slice(1);
const posts = [];
for (const block of postBlocks) {
    const slugMatch = block.match(/^([^']+)'/);
    if (!slugMatch) continue;
    const slug = slugMatch[1];
    const contentMatch = block.match(/content:\s*`([\s\S]*?)`\s*\n\s*\}/m);
    const content = contentMatch ? contentMatch[1] : '';
    posts.push({
        slug,
        hasIntro: /<h2>\s*Introduction\s*<\/h2>/i.test(content),
        hasFAQ: /<h2>\s*Frequently Asked Questions\s*<\/h2>/i.test(content),
        hasConclusion: /<h2>\s*(Start Using|Conclusion|Summary|Final Thoughts|Next Steps)\s*<\/h2>/i.test(content),
        hasAuthor: /About the Author/i.test(content),
    });
}
console.log('postCount', posts.length);
console.log('introCount', posts.filter(p => p.hasIntro).length);
console.log('faqCount', posts.filter(p => p.hasFAQ).length);
console.log('conclusionCount', posts.filter(p => p.hasConclusion).length);
console.log('authorCount', posts.filter(p => p.hasAuthor).length);
console.log('missingIntro', posts.filter(p => !p.hasIntro).map(p => p.slug));
console.log('missingFAQ', posts.filter(p => !p.hasFAQ).map(p => p.slug));
console.log('missingConclusion', posts.filter(p => !p.hasConclusion).map(p => p.slug));
console.log('missingAuthor', posts.filter(p => !p.hasAuthor).map(p => p.slug));
