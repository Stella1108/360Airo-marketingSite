'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Clock,
  User,
  Search,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import '../../styles/blogs.css';
import '../../styles/customer-stories.css';
import FeatureMarquee from '../../components/FeatureMarquee';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const blogPosts = [
  {
    id: 1,
    title: 'What Are Email Warmup Tools and How Do They Work?',
    excerpt: 'You’ve created a new email address. Sending hundreds of emails immediately could damage your sender reputation. Here’s how warmup tools help you scale safely.',
    slug: 'email-warmup-tools-guide',
    author: '360Airo Team',
    date: 'June 10, 2026',
    readTime: '12 min read',
    category: 'Deliverability',
    image: '/email-warmup-tools1.png',
    featured: true,
    isNew: true,
    views: '1.2K',
    tags: ['Warmup', 'Deliverability', 'Sender Reputation'],
  },
  {
    id: 2,
    title: 'What Factors Influence the 95–99% Email Deliverability Rate Benchmark?',
    excerpt: 'You send 1,000 emails. How many actually get delivered? A 95–99% rate is the benchmark, but reaching it takes more than just good content.',
    slug: 'email-deliverability-rate-benchmark',
    author: '360Airo Team',
    date: 'June 15, 2026',
    readTime: '14 min read',
    category: 'Deliverability',
    image: '/email-deliverability1.png',
    featured: true,
    isNew: true,
    views: '980',
    tags: ['Deliverability', 'Authentication', 'SPF', 'DKIM', 'DMARC'],
  },
  {
    id: 3,
    title: 'Best Practices to Keep Email Bounce Rates Below the 3% Target',
    excerpt: 'You launch an email campaign to 1,000 prospects. Some emails fail to deliver. Those bounces aren\'t just missed opportunities — they can damage your sender reputation. Learn how to keep bounce rates below 3%.',
    slug: 'best-practices-email-bounce-rates',
    author: '360Airo Team',
    date: 'June 20, 2026',
    readTime: '10 min read',
    category: 'Deliverability',
    image: '/email-bounce-rate1.png',
    featured: true,
    isNew: true,
    views: '1.1K',
    tags: ['Bounce Rate', 'Deliverability', 'Email Verification', 'List Hygiene'],
  },
  {
    id: 4,
    title: 'Best AI Tools for Outbound Prospecting in 2026',
    excerpt: 'Artificial intelligence has fundamentally changed the way businesses identify, engage, and convert prospects. Discover the top AI-powered platforms that can supercharge your outbound sales in 2026.',
    slug: 'ai-prospecting-tools-2026',
    author: '360Airo Team',
    date: 'June 25, 2026',
    readTime: '18 min read',
    category: 'AI Prospecting',
    image: '/ai-tool-prospecting1.png',
    featured: true,
    isNew: true,
    views: '2.1K',
    tags: ['AI', 'Prospecting', 'Sales Tools', 'Automation'],
  },
  {
    id: 5,
    title: 'AI SDR vs Human SDR: Cost, Performance & ROI Comparison',
    excerpt: 'Should you invest in an AI SDR, continue hiring human SDRs, or combine both? Compare cost, performance, scalability, and ROI to find the right answer for your business.',
    slug: 'ai-sdr-vs-human-sdr',
    author: '360Airo Team',
    date: 'June 28, 2026',
    readTime: '15 min read',
    category: 'AI SDR',
    image: '/ai-sdr-vs-human1.png',
    featured: true,
    isNew: true,
    views: '1.8K',
    tags: ['AI SDR', 'Sales Development', 'Outbound', 'ROI'],
  },
  {
    id: 6,
    title: 'Key Metrics Used to Measure Cold Email Outreach Success',
    excerpt: 'You send 1,000 cold emails. Seven hundred are opened. Fifty prospects reply. Ten book a meeting. Was the campaign successful? Learn which metrics truly measure cold email performance.',
    slug: 'cold-email-metrics-kpis',
    author: '360Airo Team',
    date: 'July 1, 2026',
    readTime: '10 min read',
    category: 'Cold Email',
    image: "/kpi's-meassure-outreach-success1.png",
    featured: true,
    isNew: true,
    views: '1.3K',
    tags: ['Cold Email', 'KPIs', 'Metrics', 'Deliverability'],
  },
  {
    id: 7,
    title: 'Email vs SMS Outreach: Conversion Benchmarks',
    excerpt: 'Your buyers aren\'t ignoring your outreach because they\'re uninterested—they\'re busy. Learn when to use email, when to use SMS, and how to combine them for maximum conversions.',
    slug: 'email-vs-sms-outreach-conversion-benchmarks',
    author: '360Airo Team',
    date: 'August 13, 2026',
    readTime: '10 min read',
    category: 'Email Marketing',
    image: '/email-vs-sms-outreach1.png',
    featured: true,
    isNew: true,
    views: '2.3K',
    tags: ['Email Marketing', 'SMS', 'Multichannel', 'Outreach'],
  },
  {
    id: 8,
    title: 'Email Delivery vs Email Deliverability: What\'s the Difference?',
    excerpt: 'You send 1,000 emails. Your dashboard says 980 were delivered. But are they actually reaching the inbox? Learn the critical difference between delivery and deliverability.',
    slug: 'email-delivery-vs-deliverability',
    author: '360Airo Team',
    date: 'August 18, 2026',
    readTime: '9 min read',
    category: 'Deliverability',
    image: '/email-delivery-vs-deliverability.png',
    featured: true,
    isNew: true,
    views: '1.8K',
    tags: ['Deliverability', 'Authentication', 'SPF', 'DKIM', 'DMARC'],
  },
  {
    id: 9,
    title: 'Multi‑Channel Outreach Explained: Why One Channel Is No Longer Enough in B2B Sales',
    excerpt: 'Today\'s buyers don\'t make decisions after a single email. Learn how to combine email, LinkedIn, calls, and SMS into a coordinated outreach strategy that drives 287% higher purchase rates.',
    slug: 'multi-channel-outreach-explained',
    author: '360Airo Team',
    date: 'August 20, 2026',
    readTime: '12 min read',
    category: 'Multichannel',
    image: '/multichannel-outreach1.png',
    featured: true,
    isNew: true,
    views: '3.1K',
    tags: ['Multichannel', 'Outreach', 'LinkedIn', 'Sales Development'],
  },
  {
    id: 10,
    title: 'Why Your Cold Emails Go to Spam (And How to Keep Them Out)',
    excerpt: 'You\'ve spent hours building a prospect list and personalizing emails – but days later, barely any replies. Learn why spam filters block cold emails and how to fix it.',
    slug: 'why-cold-emails-go-to-spam',
    author: '360Airo Team',
    date: 'August 25, 2026',
    readTime: '11 min read',
    category: 'Deliverability',
    image: '/why-email-goes-to-spam1.png',
    featured: true,
    isNew: true,
    views: '2.5K',
    tags: ['Spam', 'Deliverability', 'Authentication', 'Cold Email'],
  },
  {
    id: 11,
    title: 'AI for Sales: A Beginner\'s Guide to Working Smarter',
    excerpt: 'Sales has never been short on tools – but salespeople still spend too much time on administrative work. Discover how AI can help you work smarter, not harder.',
    slug: 'ai-for-sales-beginners-guide',
    author: '360Airo Team',
    date: 'August 28, 2026',
    readTime: '12 min read',
    category: 'AI',
    image: '/ai-for-sales1.png',
    featured: true,
    isNew: true,
    views: '3.4K',
    tags: ['AI', 'Sales', 'Automation', 'Prospecting'],
  },
  {
    id: 12,
    title: 'How Does Email Deliverability Work? A Step‑by‑Step Guide to Reaching the Inbox',
    excerpt: 'You spend hours crafting the perfect email. But if it never reaches the inbox, your efforts are wasted. Learn how email deliverability works and how to keep your messages out of spam.',
    slug: 'how-email-deliverability-works',
    author: '360Airo Team',
    date: 'September 1, 2026',
    readTime: '11 min read',
    category: 'Deliverability',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=80&fm=webp',
    featured: true,
    isNew: true,
    views: '1.5K',
    tags: ['Deliverability', 'Authentication', 'SPF', 'DKIM', 'DMARC', 'Inbox Placement'],
  },
  {
    id: 13,
    title: 'How to Build Your First Cold Email Campaign: A Step‑by‑Step Guide That Gets Replies',
    excerpt: 'You don\'t need a massive sales team to generate pipeline. Learn how to build your first cold email campaign that actually gets replies – from targeting the right prospects to writing emails that start meaningful conversations.',
    slug: 'how-to-build-first-cold-email-campaign',
    author: '360Airo Team',
    date: 'September 5, 2026',
    readTime: '10 min read',
    category: 'Cold Email',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=80&fm=webp',
    featured: true,
    isNew: true,
    views: '1.6K',
    tags: ['Cold Email', 'Campaign', 'Prospecting', 'Outreach'],
  },
  // ✅ NEW: How to Find B2B Leads
  {
    id: 14,
    title: 'How to Find B2B Leads: A Complete Guide to Building a High-Quality Sales Pipeline',
    excerpt: 'Finding B2B leads has never been easier—or more difficult. Learn how to find the right leads, use intent data, qualify prospects, and build a sales pipeline that drives predictable revenue.',
    slug: 'how-to-find-b2b-leads',
    author: '360Airo Team',
    date: 'September 8, 2026',
    readTime: '12 min read',
    category: 'Lead Generation',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=80&fm=webp',
    featured: true,
    isNew: true,
    views: '2.1K',
    tags: ['Lead Generation', 'B2B', 'Prospecting', 'Intent Data'],
  },
  {
  id: 15,
  title: 'How to Improve Cold Email Reply Rates: 7 Proven Strategies That Generate More Conversations',
  excerpt: 'You spent hours building a prospect list. The opens start coming in – but the replies never follow. Learn 7 proven strategies to turn more opens into meaningful conversations.',
  slug: 'how-to-improve-cold-email-reply-rates',
  author: '360Airo Team',
  date: 'September 12, 2026',
  readTime: '10 min read',
  category: 'Cold Email',
  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1000&q=80&fm=webp',
  featured: true,
  isNew: true,
  views: '1.9K',
  tags: ['Cold Email', 'Reply Rate', 'Prospecting', 'Outreach'],
},
];

export default function BlogsPage() {
  // Added 'Lead Generation' to categories
  const categories = ['All', 'Cold Email', 'Email Marketing', 'LinkedIn', 'Email Tools', 'Deliverability', 'AI Prospecting', 'AI SDR', 'AI', 'Lead Generation'];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoriesRef = useRef<HTMLDivElement>(null);

  const filteredPosts = useMemo(() => {
    let posts = blogPosts;
    if (selectedCategory !== 'All') {
      posts = blogPosts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      posts = posts.filter(post => {
        const haystack = [post.title, post.excerpt, post.category, post.author, ...(post.tags || [])].join(' ').toLowerCase();
        return haystack.includes(query);
      });
    }
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredPosts[0] || blogPosts[0];
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : filteredPosts;

  const filteredResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return blogPosts.filter((post) => {
      const haystack = [post.title, post.excerpt, post.category, post.author, ...(post.tags || [])].join(' ').toLowerCase();
      return haystack.includes(query);
    });
  }, [searchQuery]);

  const scrollCategories = (direction: 'left' | 'right') => {
    if (!categoriesRef.current) return;
    const scrollAmount = 260;
    categoriesRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="blog-shell">
      <Navbar activeTab="resources" />
      <main className="blog-light-main pt-28 pb-16">
        {/* Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 mb-10 md:mb-12 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900" style={{ fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase', fontWeight: 900 }}>
            Insights & Resources
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl mx-auto md:mx-0 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Expert guides, product updates, and growth strategies for modern outreach teams.
          </p>
        </div>

        {/* Featured Post */}
        <section className="px-4 pb-12">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid gap-6 md:gap-8 rounded-[24px] premium-featured-card p-4 sm:p-6 md:p-8 md:grid-cols-2"
            >
              <motion.div variants={itemVariants} className="overflow-hidden rounded-xl h-[220px] sm:h-[260px] md:h-[320px] relative shadow-md">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="h-full w-full rounded-xl object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="flex flex-col justify-center">
                <div>
                  <span className="premium-badge mb-3 inline-block" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {featuredPost.category}
                  </span>
                </div>
                <h1
                  className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-white tracking-tight"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {featuredPost.title}
                </h1>
                <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-gray-300 line-clamp-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {featuredPost.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-blue-400" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-blue-400" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <Link href={`/blogs/${featuredPost.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="premium-button text-sm"
                    >
                      Read article <ArrowRight className="h-3.5 w-3.5 inline ml-1" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Sticky Nav */}
        <div className="blog-sticky-nav-light">
          <div className="blog-sticky-container">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="min-w-0 flex-1 overflow-hidden">
                <div ref={categoriesRef} className="scrollbar-hide flex items-center gap-4 sm:gap-6 overflow-x-auto whitespace-nowrap py-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`minimal-tab-btn-light text-sm sm:text-base ${selectedCategory === cat ? 'active' : ''}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative hidden min-w-[200px] md:block ml-4">
              <div className="minimal-search-box-light">
                <Search className="h-4 w-4 text-blue-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Blog"
                  className="w-full bg-transparent outline-none placeholder:text-gray-500 text-xs text-gray-800"
                />
              </div>
              {searchQuery.trim() && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-[0_12px_32px_rgba(15,23,42,0.12)]">
                  {filteredResults.length > 0 ? (
                    <div className="max-h-[320px] overflow-y-auto py-2">
                      {filteredResults.map((post) => (
                        <Link
                          key={post.id}
                          href={`/blogs/${post.slug}`}
                          onClick={() => setSearchQuery('')}
                          className="block px-4 py-3 transition-colors hover:bg-gray-50"
                        >
                          <p className="text-[13px] font-semibold text-gray-900">{post.title}</p>
                          <p className="mt-1 line-clamp-2 text-[11px] text-gray-500">{post.excerpt}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-4 text-[12px] text-gray-500">No matching blog posts found.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <section className="px-4 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {gridPosts.map((post) => (
                <Link
                  key={post.id}
                  className="blog-light-card flex flex-col h-full transition-shadow hover:shadow-lg rounded-xl overflow-hidden border border-gray-200 bg-white"
                  href={`/blogs/${post.slug}`}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden bg-gray-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="flex flex-col p-4 sm:p-5 flex-1">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-[10px] sm:text-xs">
                          {post.category}
                        </span>
                        <span className="text-[10px] sm:text-xs">{post.readTime}</span>
                      </div>
                      <span className="text-blue-600 font-medium text-[12px] sm:text-sm hover:underline">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty state */}
            {gridPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-sm">No blog posts found for the selected category or search.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* CTA */}
      <section className="cs-cta-modern">
        <div className="cs-cta-bg"><div className="cs-cta-pattern"></div></div>
        <div className="cs-cta-content w-full px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
            Put multichannel outbound on autopilot<br className="hidden sm:block" /> with 360Airo
          </h2>
          <div className="cs-cta-buttons flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <button className="btn-primary-purple w-full sm:w-auto">Start free &rarr;</button>
            <button className="btn-secondary-white w-full sm:w-auto">Book a demo &rarr;</button>
          </div>
          <FeatureMarquee />
        </div>
      </section>

      <Footer />
      <style jsx global>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}