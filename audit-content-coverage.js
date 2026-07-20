const fs = require('fs');
const path = require('path');

const toolsPath = path.resolve(__dirname, 'lib', 'tools.ts');
const blogPath = path.resolve(__dirname, 'lib', 'blog-posts.ts');

const toolsText = fs.readFileSync(toolsPath, 'utf8');
const blogText = fs.readFileSync(blogPath, 'utf8');

const toolsExportMatch = /export const tools: Tool\[\] = \[/;
const toolsExportIndex = toolsText.search(toolsExportMatch);
if (toolsExportIndex === -1) {
    throw new Error('Unable to locate tools export in lib/tools.ts');
}
const toolsArrayOpen = toolsText.indexOf('[', toolsExportIndex + toolsText.slice(toolsExportIndex).indexOf('='));
if (toolsArrayOpen === -1) {
    throw new Error('Unable to locate opening bracket for tools array');
}
let depth = 0;
let toolsArrayEnd = -1;
for (let i = toolsArrayOpen; i < toolsText.length; i++) {
    const char = toolsText[i];
    if (char === '[') {
        depth++;
    } else if (char === ']') {
        depth--;
        if (depth === 0) {
            toolsArrayEnd = i;
            break;
        }
    }
}
if (toolsArrayEnd === -1) {
    throw new Error('Unable to locate closing bracket for tools array');
}
const toolsArrayText = toolsText.slice(toolsArrayOpen + 1, toolsArrayEnd);
const toolIdRegex = /\bid:\s*'([^']+)'/g;
const toolIds = [];
let match;
while ((match = toolIdRegex.exec(toolsArrayText))) {
    toolIds.push(match[1]);
}

const guideSectionStart = toolsText.indexOf('export const toolGuideContent');
const toolGuideKeys = [];
if (guideSectionStart !== -1) {
    const guideText = toolsText.slice(guideSectionStart);
    const guideKeyRegex = /^\s*'([^']+)':\s*\{/gm;
    while ((match = guideKeyRegex.exec(guideText))) {
        toolGuideKeys.push(match[1]);
    }
}

const missingGuides = toolIds.filter((id) => !toolGuideKeys.includes(id));

const blogSlugRegex = /slug:\s*'([^']+)'/g;
const blogSlugs = [];
while ((match = blogSlugRegex.exec(blogText))) {
    blogSlugs.push(match[1]);
}

const blogPostRegex = /slug:\s*'([^']+)'[\s\S]*?content:\s*`([\s\S]*?)`/gm;
const blogStats = [];
while ((match = blogPostRegex.exec(blogText))) {
    const slug = match[1];
    const content = match[2];
    const hasIntro = /<h2>\s*Introduction\s*<\/h2>/i.test(content);
    const hasFAQ = /<h2>\s*Frequently Asked Questions\s*<\/h2>/i.test(content);
    const hasConclusion = /<h2>\s*(Start Using|Conclusion|Summary|Final Thoughts|Next Steps)\s*<\/h2>/i.test(content);
    const hasAuthorSection = /About the Author/i.test(content);
    blogStats.push({ slug, hasIntro, hasFAQ, hasConclusion, hasAuthorSection });
}

const missingIntro = blogStats.filter((b) => !b.hasIntro).map((b) => b.slug);
const missingFAQ = blogStats.filter((b) => !b.hasFAQ).map((b) => b.slug);
const missingConclusion = blogStats.filter((b) => !b.hasConclusion).map((b) => b.slug);
const missingAbout = blogStats.filter((b) => !b.hasAuthorSection).map((b) => b.slug);

console.log('toolCount', new Set(toolIds).size);
console.log('toolGuideCount', new Set(toolGuideKeys).size);
console.log('missingGuides', JSON.stringify(missingGuides, null, 2));
console.log('blogCount', new Set(blogSlugs).size);
console.log('missingIntro', JSON.stringify(missingIntro, null, 2));
console.log('missingFAQ', JSON.stringify(missingFAQ, null, 2));
console.log('missingConclusion', JSON.stringify(missingConclusion, null, 2));
console.log('missingAbout', JSON.stringify(missingAbout, null, 2));
