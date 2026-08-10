'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import '../../../styles/blogs.css';

type TocItem = {
  id: string;
  label: string;
  arrow: boolean;
  indent?: boolean;
};

const tocItems: TocItem[] = [
  { id: 'introduction', label: 'Introduction', arrow: false },
  { id: 'what-is-email-deliverability', label: '1. What Is Email Deliverability?', arrow: true },
  { id: 'why-95-99-benchmark', label: '1.1 Why Is 95–99% Deliverability Considered a Benchmark?', arrow: true, indent: true },
  { id: 'sender-reputation-and-domain-reputation', label: '2. Sender Reputation and Domain Reputation', arrow: true },
  { id: 'what-is-an-email-sender-score', label: '2.1 What Is an Email Sender Score?', arrow: true, indent: true },
  { id: 'email-authentication-spf-dkim-dmarc', label: '3. Email Authentication: SPF, DKIM, and DMARC', arrow: true },
  { id: 'spf-record', label: '3.1 SPF Record', arrow: true, indent: true },
  { id: 'dkim-authentication', label: '3.2 DKIM Authentication', arrow: true, indent: true },
  { id: 'dmarc-policy', label: '3.3 DMARC Policy', arrow: true, indent: true },
  { id: 'email-list-quality-and-hygiene', label: '4. Email List Quality and Hygiene', arrow: true },
  { id: 'why-list-verification-matters', label: '4.1 Why List Verification Matters', arrow: true, indent: true },
  { id: 'bounce-rate-management', label: '5. Bounce Rate Management', arrow: true },
  { id: 'spam-complaint-rates', label: '6. Spam Complaint Rates', arrow: true },
  { id: 'email-engagement-metrics', label: '7. Email Engagement Metrics', arrow: true },
  { id: 'the-role-of-email-warmup', label: '8. The Role of Email Warmup', arrow: true },
  { id: 'how-to-improve-email-deliverability', label: '9. How to Improve Email Deliverability', arrow: true },
  { id: 'faqs', label: '10. Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: '11. Build Better Deliverability From the Start', arrow: true },
];

function MiniInfographic({
  title,
  paragraphs,
  bullets,
}: {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}) {
  return (
    <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-6 md:p-7">
      <h3 className="text-[18px] md:text-[22px] font-bold text-[#111827] leading-tight mb-4">
        {title}
      </h3>
      <div className="space-y-4 text-[#4f5668] text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      {bullets && bullets.length > 0 ? (
        <ul className="mt-4 space-y-4 text-[#4f5668] text-[17px] leading-7 list-disc pl-5 text-justify">
          {bullets.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function ContentBlock({
  subtitle,
  paragraphs,
}: {
  subtitle: string;
  paragraphs: string[];
}) {
  return (
    <div>
      <h3 className="text-[17px] md:text-[19px] font-bold text-[#111827] mb-4">
        {subtitle}
      </h3>
      <div className="space-y-4 text-[#4f5668] text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

function SectionImage({ id }: { id: string }) {
  const image = {
    src: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=80',
    alt: 'Email deliverability dashboard',
    label: 'Deliverability',
  };
  if (!image) return null;

  return (
    <div className="rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative h-[230px] md:h-[340px] w-full">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#4f63ff] backdrop-blur">
          {image.label}
        </div>
      </div>
    </div>
  );
}

function ArticleSection({
  id,
  title,
  intro,
  blocks,
  infographic,
  showImage = true,
}: {
  id: string;
  title: string;
  intro: string[];
  blocks: { subtitle: string; paragraphs: string[] }[];
  infographic?: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
  };
  showImage?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[24px] font-bold text-[#111827] mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {intro.length > 0 && (
          <div className="space-y-4 text-[#4f5668] text-[17px] leading-7 text-justify">
            {intro.map((text, index) => (
              <p key={index}>{text}</p>
            ))}
          </div>
        )}
        {infographic && <MiniInfographic {...infographic} />}
        {blocks.map((block) => (
          <ContentBlock key={block.subtitle} {...block} />
        ))}
        {showImage && <SectionImage id={id} />}
      </div>
    </section>
  );
}

// --- FAQ Accordion Component ---
function FaqAccordion({ faqs }: { faqs: { subtitle: string; paragraphs: string[] }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-[#dbe3f4] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(17,24,39,0.04)]">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left text-[17px] font-semibold text-[#111827] hover:bg-[#f8f9ff] transition-colors duration-200"
            >
              <span>{faq.subtitle}</span>
              <span className="text-[#4f63ff] text-2xl leading-none ml-4 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              className={`px-6 transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[1000px] pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="space-y-4 text-[#4f5668] text-[17px] leading-7 text-justify">
                {faq.paragraphs.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RightPromoCards() {
  return (
    <aside className="sticky top-20 self-start hidden xl:block space-y-4 w-[250px]">
      <div className="rounded-[20px] border border-[#0C162C] bg-[#0C162C] p-4 shadow-[0_8px_24px_rgba(12,22,44,0.35)]">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative w-[200px] h-[130px] shrink-0">
            <Image
              src="/360aironewlog.png"
              alt="360Airo logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <h3 className="text-[16px] leading-[1.3] font-bold text-white text-center mt-[-30px] mb-4">
          Deliverability
          <br />
          Benchmark Guide
        </h3>
        <p className="text-[12px] leading-5 text-white text-center mb-4">
          Reach the 95–99% deliverability rate with better authentication, warmup, and list hygiene.
        </p>
        <button className="w-full rounded-[12px] border border-white bg-transparent px-4 py-3 text-white text-[13px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>
      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-2">
          Quick Tip
        </p>
        <h4 className="text-[13px] leading-5 font-bold text-[#111827] mb-2">
          Delivery ≠ Inbox
        </h4>
        <p className="text-[11px] leading-5 text-[#5f6472]">
          A 99% delivery rate doesn't guarantee 99% inbox placement. Monitor both metrics.
        </p>
      </div>
    </aside>
  );
}

export default function BlogDeliverabilityPage() {
  const [activeId, setActiveId] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 180;
      let currentSectionId = sections[0]?.id || 'introduction';

      for (const section of sections) {
        if (scrollPosition >= section.offsetTop) {
          currentSectionId = section.id;
        }
      }
      setActiveId(currentSectionId);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="blog-shell">
      <Navbar activeTab="resources" />
      <main className="min-h-screen bg-[#f4f2fb] text-[#111827] pt-20">
        <style jsx global>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Hero Section */}
        <section className="pt-8 md:pt-10 pb-8 px-4 border-b border-[#ddd9ef]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb – all three parts are now clickable links */}
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[#6b7280] mb-4">
              <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Blog
              </Link>
              <span>›</span>
              <Link href="/blogs?category=deliverability" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Deliverability
              </Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                What Factors Influence the 95–99% Email Deliverability Rate Benchmark?
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative min-h-[300px] md:min-h-[410px] rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0a3f7a] via-[#0b5ca8] to-[#36a7e8] shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80"
                    alt="Email deliverability hero"
                    fill
                    priority
                    className="object-cover mix-blend-overlay opacity-35"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#072f63]/95 via-[#0b4f96]/70 to-transparent" />
                  <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-between">
                    <p className="text-white text-[26px] md:text-[36px] lg:text-[42px] font-bold leading-tight max-w-[420px]">
                      Email Deliverability
                      <br />
                      Benchmark
                      <br />
                      2026
                    </p>
                    <div className="absolute bottom-0 right-0 w-[48%] h-[92%] hidden md:block">
                      <Image
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80"
                        alt="Deliverability team"
                        fill
                        className="object-contain object-bottom"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="max-w-2xl"
              >
                <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[11px] md:text-[12px] mb-3">
                  Deliverability Guide
                </p>
                <h1 className="text-[#111827] text-[28px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-4">
                  What Factors Influence the 95–99% Email Deliverability Rate Benchmark?
                </h1>
                <p className="text-[17px] text-[#5f6472] max-w-2xl mb-4 leading-relaxed text-justify">
                  You send 1,000 emails. How many actually get delivered? A 95–99% rate is the benchmark, but reaching it takes more than just good content.
                </p>
                {/* Meta info – single line */}
                <div className="mb-4 inline-flex items-center gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-4 py-3 text-white text-xs md:text-sm whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logonew.png"
                      alt="360Airo Team"
                      width={140}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span>•360AIRO Team</span>
                  <span>•</span>
                  <span>Updated: Jun 2026</span>
                  <span>•</span>
                  <span>14 min read</span>
                  <span>•</span>
                  <span>1.4K reads</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-7 py-3.5 rounded-xl bg-[#4f63ff] text-white font-semibold text-base shadow-md hover:bg-[#4154f5] transition-all">
                    Start Reading
                  </button>
                  <button className="px-7 py-3.5 rounded-xl border border-[#6b8cff] text-[#4f63ff] bg-transparent font-semibold text-base hover:bg-white/60 transition-all">
                    Schedule a Demo
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 py-8">
          <div className="max-w-[1440px] mx-auto grid xl:grid-cols-[250px_minmax(0,1fr)_250px] lg:grid-cols-[250px_minmax(0,1fr)] gap-8">
            {/* TOC */}
            <aside className="sticky top-20 self-start hidden lg:block mb-10">
              <h2 className="text-[16px] font-bold text-[#20242c] mb-4">Table of Contents</h2>
              <nav className="space-y-1.5 border-l border-[#d9dfef] pl-3">
                {tocItems.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`relative block rounded-r-lg px-3 py-1.5 text-[13px] leading-5 transition-all duration-200 ${
                        isActive
                          ? 'bg-[#edf2ff] text-[#2f66db] font-semibold'
                          : 'text-[#4b5563] hover:text-[#2f66db] hover:bg-white/70'
                      } ${item.indent ? 'ml-3' : ''}`}
                    >
                      <span className={`absolute left-[-13px] top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-all ${isActive ? 'bg-[#4f63ff]' : 'bg-transparent'}`} />
                      <span className="flex items-start gap-1.5">
                        {item.arrow ? (
                          <span className={`mt-[1px] text-sm ${isActive ? 'text-[#2f66db]' : 'text-[#94a3b8]'}`}>›</span>
                        ) : (
                          <span className="w-2" />
                        )}
                        <span>{item.label}</span>
                      </span>
                    </a>
                  );
                })}
              </nav>
            </aside>

            {/* Articles */}
            <div className="min-w-0 space-y-4">
              <ArticleSection
                key="introduction"
                id="introduction"
                title="Introduction"
                showImage={false}
                intro={[
                  'You send 1,000 emails.',
                  'How many actually get delivered?',
                  'For a healthy email program, the answer should be most of them. A 95–99% Email Deliverability Rate is often treated as a strong benchmark for email campaigns. But reaching that range isn\'t automatic.',
                  'Your sending history, domain reputation, authentication, email list quality, bounce rates, and recipient engagement all influence whether mailbox providers accept your emails.',
                  'And even a high delivery rate doesn\'t necessarily mean every message reached the inbox.',
                  'That\'s why understanding Email Deliverability requires looking beyond a single percentage.',
                  'Let\'s explore what influences the 95–99% benchmark and the factors revenue teams should monitor to improve email performance.',
                ]}
                infographic={{
                  title: 'What you\'ll learn',
                  paragraphs: ['The factors that separate a 95% delivery rate from a 99% rate, and how to build a sustainable deliverability strategy.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-email-deliverability"
                id="what-is-email-deliverability"
                title="1. What Is Email Deliverability?"
                showImage={false}
                intro={[
                  'Email Deliverability is the ability of an email to successfully reach the recipient\'s inbox rather than being rejected, blocked, or filtered into spam.',
                  'It\'s important to distinguish between email delivery and inbox placement.',
                  'An email may be accepted by the recipient\'s mail server but still land in the spam folder. Technically, it was delivered. But from a campaign perspective, the prospect may never see it.',
                  'That\'s why teams should monitor both the Email Deliverability Rate and Email Inbox Placement.',
                ]}
                infographic={{
                  title: 'Delivery vs. Inbox Placement',
                  paragraphs: ['Delivery means the email was accepted by the server. Inbox placement means it landed in the primary tab – and that\'s what truly matters for outreach.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="why-95-99-benchmark"
                id="why-95-99-benchmark"
                title="1.1 Why Is 95–99% Deliverability Considered a Benchmark?"
                showImage={false}
                intro={[
                  'A 95–99% Email Deliverability Benchmark generally indicates that the majority of messages are being accepted by recipient mail servers.',
                  'Falling below this range may signal problems such as:',
                ]}
                infographic={{
                  title: 'Warning signs below 95%',
                  paragraphs: ['If your delivery rate drops below 95%, investigate these areas.'],
                  bullets: [
                    'Poor list quality',
                    'Invalid email addresses',
                    'Authentication problems',
                    'Reputation issues',
                    'High bounce rates',
                    'Spam complaints',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Important',
                    paragraphs: ['However, a 99% delivery rate doesn\'t guarantee a 99% inbox placement rate. Deliverability should always be evaluated alongside inbox placement, bounce rates, engagement, and complaint rates.'],
                  },
                ]}
              />

              <ArticleSection
                key="sender-reputation-and-domain-reputation"
                id="sender-reputation-and-domain-reputation"
                title="2. Sender Reputation and Domain Reputation"
                showImage={true}
                intro={[
                  'Mailbox providers evaluate your sending history before deciding how to handle incoming messages.',
                  'This is where Sender Reputation and Domain Reputation become important.',
                  'Sender reputation is influenced by factors such as:',
                ]}
                infographic={{
                  title: 'What builds reputation',
                  paragraphs: ['A strong reputation increases trust. A poor reputation leads to filtering, throttling, or rejection.'],
                  bullets: [
                    'Sending consistency',
                    'Bounce history',
                    'Spam complaints',
                    'Recipient engagement',
                    'Authentication',
                    'Previous sending behavior',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-an-email-sender-score"
                id="what-is-an-email-sender-score"
                title="2.1 What Is an Email Sender Score?"
                showImage={false}
                intro={[
                  'An Email Sender Score is a numerical indicator designed to represent aspects of sender reputation.',
                  'While sender scores can provide useful insights, no single score determines deliverability across every mailbox provider.',
                  'Different providers evaluate different signals.',
                  'Revenue teams should therefore monitor reputation alongside broader Email Deliverability Metrics rather than relying on one number alone.',
                ]}
                infographic={{
                  title: 'Use with caution',
                  paragraphs: ['Sender scores are directional, not definitive. Use them as one input among many.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="email-authentication-spf-dkim-dmarc"
                id="email-authentication-spf-dkim-dmarc"
                title="3. Email Authentication: SPF, DKIM, and DMARC"
                showImage={true}
                intro={[
                  'Email Authentication helps mailbox providers verify that messages are legitimately associated with the sending domain.',
                  'Three important authentication standards are SPF, DKIM, and DMARC.',
                ]}
                infographic={{
                  title: 'The authentication triad',
                  paragraphs: ['Together, SPF, DKIM, and DMARC form the foundation of email infrastructure health.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="spf-record"
                id="spf-record"
                title="3.1 SPF Record"
                showImage={false}
                intro={[
                  'An SPF Record identifies the mail servers authorized to send email on behalf of a domain.',
                  'Correct SPF configuration helps recipient servers verify whether a message originated from an approved sending source.',
                ]}
                infographic={{
                  title: 'SPF in brief',
                  paragraphs: ['Tells providers which servers are allowed to send from your domain.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="dkim-authentication"
                id="dkim-authentication"
                title="3.2 DKIM Authentication"
                showImage={false}
                intro={[
                  'DKIM Authentication adds a digital signature to outgoing messages.',
                  'The recipient\'s mail server can verify this signature to confirm that the message wasn\'t altered during transit and is associated with the expected domain.',
                ]}
                infographic={{
                  title: 'DKIM in brief',
                  paragraphs: ['Adds a cryptographic signature that proves the email came from your domain and wasn\'t tampered with.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="dmarc-policy"
                id="dmarc-policy"
                title="3.3 DMARC Policy"
                showImage={false}
                intro={[
                  'A DMARC Policy builds on SPF and DKIM.',
                  'It tells receiving servers how to handle messages that fail authentication checks and provides reporting that can help domain owners identify authentication problems or unauthorized sending.',
                ]}
                infographic={{
                  title: 'DMARC in brief',
                  paragraphs: ['Tells providers what to do when SPF or DKIM fails — and gives you visibility into who is sending on your behalf.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="email-list-quality-and-hygiene"
                id="email-list-quality-and-hygiene"
                title="4. Email List Quality and Hygiene"
                showImage={true}
                intro={[
                  'One of the fastest ways to damage deliverability is sending emails to poor-quality data.',
                  'Email List Hygiene is the process of maintaining accurate, current, and relevant contact information.',
                  'A healthy list reduces the likelihood of sending to:',
                ]}
                infographic={{
                  title: 'What a healthy list avoids',
                  paragraphs: ['Better data quality supports lower bounce rates and healthier sender reputation.'],
                  bullets: [
                    'Invalid email addresses',
                    'Abandoned mailboxes',
                    'Duplicate contacts',
                    'Incorrect addresses',
                    'Irrelevant prospects',
                  ],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="why-list-verification-matters"
                id="why-list-verification-matters"
                title="4.1 Why List Verification Matters"
                showImage={false}
                intro={[
                  'Cold email databases can become outdated quickly.',
                  'People change roles, move companies, and stop using old email addresses.',
                  'Regular verification helps protect Cold Email Deliverability by identifying invalid addresses before campaigns begin.',
                  'List size matters less than list quality.',
                  'Sending 1,000 emails to verified, relevant prospects is generally more valuable than sending 10,000 emails to an outdated database.',
                ]}
                infographic={{
                  title: 'Quality over quantity',
                  paragraphs: ['A smaller, verified list outperforms a large, dirty list every time.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="bounce-rate-management"
                id="bounce-rate-management"
                title="5. Bounce Rate Management"
                showImage={false}
                intro={[
                  'The Email Bounce Rate measures how many messages couldn\'t be successfully delivered.',
                  'Bounces generally fall into two categories.',
                  'A hard bounce usually indicates a permanent delivery issue, such as an invalid or non-existent address.',
                  'A soft bounce is typically temporary and may result from a full mailbox or temporary server issue.',
                  'Consistently high bounce rates can signal poor list quality and negatively affect sender reputation.',
                ]}
                infographic={{
                  title: 'Bounce management tips',
                  paragraphs: ['Keep bounce rates low to protect your reputation.'],
                  bullets: [
                    'Verify contact data',
                    'Remove invalid addresses',
                    'Monitor campaign performance',
                    'Investigate sudden increases',
                    'Maintain clean prospect databases',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Best practice',
                    paragraphs: ['Bounce management is one of the most important Email Deliverability Best Practices for outbound teams.'],
                  },
                ]}
              />

              <ArticleSection
                key="spam-complaint-rates"
                id="spam-complaint-rates"
                title="6. Spam Complaint Rates"
                showImage={false}
                intro={[
                  'A spam complaint occurs when a recipient marks an email as spam.',
                  'The Spam Complaint Rate is a strong negative signal because it indicates that recipients don\'t want or trust the messages they\'re receiving.',
                  'Complaint rates may increase when:',
                ]}
                infographic={{
                  title: 'What drives complaints',
                  paragraphs: ['The most effective way to reduce complaints is to improve relevance.'],
                  bullets: [
                    'Targeting is too broad',
                    'Messaging is irrelevant',
                    'Sending frequency is excessive',
                    'Sender identity is unclear',
                    'Opt-out options are difficult to find',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Solution',
                    paragraphs: ['Better targeting and personalization help ensure that outreach reaches people who are more likely to find the message useful.'],
                  },
                ]}
              />

              <ArticleSection
                key="email-engagement-metrics"
                id="email-engagement-metrics"
                title="7. Email Engagement Metrics"
                showImage={false}
                intro={[
                  'Mailbox providers may consider recipient behavior when evaluating future messages.',
                  'That\'s why Email Engagement Metrics are connected to deliverability.',
                  'Useful engagement signals include:',
                ]}
                infographic={{
                  title: 'Positive signals',
                  paragraphs: ['For cold email campaigns, replies and positive engagement are particularly valuable.'],
                  bullets: [
                    'Replies',
                    'Clicks',
                    'Opens',
                    'Forwarding',
                    'Deletions',
                    'Spam complaints',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Strategy',
                    paragraphs: ['Strong engagement starts with better targeting. Sending fewer, more relevant emails can often support healthier long-term performance than maximizing volume alone.'],
                  },
                ]}
              />

              <ArticleSection
                key="the-role-of-email-warmup"
                id="the-role-of-email-warmup"
                title="8. The Role of Email Warmup"
                showImage={false}
                intro={[
                  'Email Warmup is the process of gradually increasing sending activity from a new or inactive mailbox.',
                  'A new email account with little sending history shouldn\'t immediately begin sending large volumes of outreach.',
                  'Gradual warmup helps establish consistent sending patterns before volume increases.',
                  'A structured warmup process may include:',
                ]}
                infographic={{
                  title: 'Warmup steps',
                  paragraphs: ['Warmup should be combined with authentication, clean data, and responsible sending practices.'],
                  bullets: [
                    'Starting with lower sending volumes',
                    'Increasing activity gradually',
                    'Monitoring mailbox performance',
                    'Tracking reputation signals',
                    'Adjusting volume when problems appear',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Important',
                    paragraphs: ['Warmup isn\'t a substitute for authentication or list hygiene. It\'s one part of a broader strategy.'],
                  },
                ]}
              />

              <ArticleSection
                key="how-to-improve-email-deliverability"
                id="how-to-improve-email-deliverability"
                title="9. How to Improve Email Deliverability"
                showImage={true}
                intro={[
                  'There is no single action that guarantees a 95–99% Email Deliverability Rate.',
                  'Deliverability is the result of multiple factors working together.',
                  'To Improve Email Deliverability, revenue teams should:',
                ]}
                infographic={{
                  title: 'Action checklist',
                  paragraphs: ['The strongest email programs treat deliverability as an ongoing process rather than a one-time technical setup.'],
                  bullets: [
                    'Authenticate domains with SPF, DKIM, and DMARC',
                    'Warm up new mailboxes gradually',
                    'Verify prospect data before outreach',
                    'Maintain email list hygiene',
                    'Monitor bounce rates',
                    'Keep spam complaints low',
                    'Track sender and domain reputation',
                    'Personalize outreach',
                    'Monitor inbox placement continuously',
                  ],
                }}
                blocks={[]}
              />

              {/* FAQ Section */}
              <section id="faqs" className="scroll-mt-28">
                <h2 className="text-[24px] font-bold text-[#111827] mb-4">
                  10. Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <MiniInfographic
                    title="Quick answers"
                    paragraphs={['Clear up common questions about deliverability.']}
                  />
                  <FaqAccordion
                    faqs={[
                      {
                        subtitle: '10.1 What is email deliverability?',
                        paragraphs: ['Email deliverability is the ability of an email to reach the recipient\'s inbox rather than being rejected, blocked, or filtered into spam.'],
                      },
                      {
                        subtitle: '10.2 Why is 95–99% deliverability considered a benchmark?',
                        paragraphs: ['A 95–99% delivery rate indicates that most messages are being accepted by recipient mail servers. However, delivery rate should be evaluated alongside inbox placement, bounce rates, and spam complaints.'],
                      },
                      {
                        subtitle: '10.3 How does sender reputation affect email deliverability?',
                        paragraphs: ['Sender reputation helps mailbox providers evaluate the trustworthiness of sending activity. Poor reputation may increase the likelihood of filtering, throttling, or rejection.'],
                      },
                      {
                        subtitle: '10.4 Why are SPF, DKIM, and DMARC important?',
                        paragraphs: ['These authentication standards help recipient servers verify that messages are legitimately associated with the sending domain and haven\'t been altered during transit.'],
                      },
                      {
                        subtitle: '10.5 How does email list hygiene improve deliverability?',
                        paragraphs: ['Maintaining clean and verified contact data reduces hard bounces and helps protect sender reputation.'],
                      },
                    ]}
                  />
                </div>
              </section>

              <ArticleSection
                key="conclusion"
                id="conclusion"
                title="11. Build Better Deliverability From the Start"
                showImage={false}
                intro={[
                  'A strong Email Deliverability Rate isn\'t created by one tool or one setting.',
                  'It comes from healthy sending infrastructure, authenticated domains, accurate prospect data, controlled sending patterns, and continuous monitoring.',
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    '360Airo helps revenue teams connect email warmup, deliverability intelligence, prospect data, and AI-powered outreach within one workflow. Improve inbox performance, protect sender reputation, and scale cold email outreach with greater confidence using 360Airo.',
                  ],
                }}
                blocks={[]}
              />
            </div>

            <RightPromoCards />
          </div>
        </section>

        {/* Recent Posts */}
        <section className="px-4 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827]">Recent blog posts</h2>
              <a href="/blogs" className="text-[14px] font-medium text-[#4f63ff] hover:underline">View all</a>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: 'What Are Email Warmup Tools and How Do They Work?',
                  tag: 'Warmup',
                  href: '/blogs/email-warmup-tools-guide',
                  description: 'Learn how warmup tools protect sender reputation.',
                  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  title: '10 Cheapest Cold Email Software Tools for Startups & Agencies',
                  tag: 'Cold Email',
                  href: '/blogs/10-cheapest-cold-email-software',
                  description: 'Discover affordable cold email tools for 2026.',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
                },
                {
                  title: 'How AI Prospecting Improves Sales Efficiency',
                  tag: 'AI Sales',
                  href: '/blogs/ai-prospecting-sales-efficiency',
                  description: 'Read this next to go deeper into modern sales workflows.',
                  image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80',
                },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group overflow-hidden rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-2">{post.tag}</p>
                    <h3 className="text-[16px] font-bold text-[#111827] leading-snug mb-3 group-hover:text-[#4f63ff] transition-colors">{post.title}</h3>
                    <p className="text-[13px] text-[#6b7280]">{post.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}