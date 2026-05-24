'use client';
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BlogPageClient;
var react_1 = require("react");
var link_1 = require("next/link");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function BlogPageClient(_a) {
    var blogPosts = _a.blogPosts, categories = _a.categories;
    var _b = (0, react_1.useState)('All'), activeCategory = _b[0], setActiveCategory = _b[1];
    var _c = (0, react_1.useState)(1), currentPage = _c[0], setCurrentPage = _c[1];
    var pageSize = 6;
    var filteredPosts = (0, react_1.useMemo)(function () {
        return activeCategory === 'All'
            ? blogPosts
            : blogPosts.filter(function (post) { return post.category === activeCategory; });
    }, [activeCategory, blogPosts]);
    var pageCount = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
    var paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    var handleCategoryChange = function (category) {
        setActiveCategory(category);
        setCurrentPage(1);
    };
    return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-10">
                <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-3">Blog</p>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Insights for developers, creators, and teams.</h1>
                <p className="max-w-3xl text-lg text-muted-foreground">
                    Browse our blog for practical guides, clear explanations, and quick tool tutorials designed to help you move faster and ship smarter.
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(function (category) { return (<button_1.Button key={category} variant={activeCategory === category ? 'default' : 'outline'} size="sm" onClick={function () { return handleCategoryChange(category); }}>
                        {category}
                    </button_1.Button>); })}
            </div>

            <div className="mb-6 text-sm text-muted-foreground">
                Showing {paginatedPosts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} - {(currentPage - 1) * pageSize + paginatedPosts.length} of {filteredPosts.length} posts
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paginatedPosts.map(function (post) { return (<card_1.Card key={post.slug} className="group h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <div className="p-6 flex flex-col h-full">
                            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-primary font-semibold">
                                <span>{post.category}</span>
                                <span>{post.readTime}</span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{post.title}</h2>
                                <p className="text-sm text-muted-foreground leading-relaxed">{post.description}</p>
                            </div>

                            <div className="mt-6 flex items-center justify-between gap-4">
                                <link_1.default href={"/blog/".concat(post.slug)} className="text-sm font-semibold text-primary hover:text-foreground transition-colors inline-flex items-center gap-2">
                                    Read article
                                    <lucide_react_1.ArrowRight className="w-4 h-4"/>
                                </link_1.default>
                            </div>
                        </div>
                    </card_1.Card>); })}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {pageCount}
                </div>
                <div className="flex flex-wrap gap-2">
                    <button_1.Button variant="outline" size="sm" disabled={currentPage === 1} onClick={function () { return setCurrentPage(function (page) { return Math.max(page - 1, 1); }); }}>
                        Previous
                    </button_1.Button>
                    {Array.from({ length: pageCount }, function (_, index) { return (<button_1.Button key={index} variant={currentPage === index + 1 ? 'default' : 'outline'} size="sm" onClick={function () { return setCurrentPage(index + 1); }}>
                            {index + 1}
                        </button_1.Button>); })}
                    <button_1.Button variant="outline" size="sm" disabled={currentPage === pageCount} onClick={function () { return setCurrentPage(function (page) { return Math.min(page + 1, pageCount); }); }}>
                        Next
                    </button_1.Button>
                </div>
            </div>

            <div className="mt-12 border-t border-border pt-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold">Stay up to date</h2>
                        <p className="text-muted-foreground">Check back often for new posts on tools, developer workflows, and productivity tips.</p>
                    </div>
                    <link_1.default href="/contact" className="text-sm font-semibold text-primary hover:text-foreground transition-colors">
                        Contact us about a feature or topic
                    </link_1.default>
                </div>
            </div>
        </div>);
}
