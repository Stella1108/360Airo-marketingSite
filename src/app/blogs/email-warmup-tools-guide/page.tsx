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
  { id: 'what-is-email-warmup', label: '1. What Is Email Warmup?', arrow: true },
  { id: 'what-is-email-warming', label: '1.1 What Is Email Warming?', arrow: true, indent: true },
  { id: 'what-is-email-domain-warmup', label: '1.2 What Is Email Domain Warmup?', arrow: true, indent: true },
  { id: 'what-are-email-warmup-tools', label: '2. What Are Email Warmup Tools?', arrow: true },
  { id: 'manual-vs-automated-warmup', label: '2.1 Manual vs Automated Warmup', arrow: true, indent: true },
  { id: 'what-is-an-email-warmup-api', label: '2.2 What Is an Email Warmup API?', arrow: true, indent: true },
  { id: 'how-do-email-warmup-tools-work', label: '3. How Do Email Warmup Tools Work?', arrow: true },
  { id: 'how-sender-reputation-affects-warmup', label: '4. How Sender Reputation Affects Warmup', arrow: true },
  { id: 'what-can-damage-sender-reputation', label: '4.1 What Can Damage Sender Reputation?', arrow: true, indent: true },
  { id: 'how-to-improve-sender-reputation', label: '4.2 How to Improve Sender Reputation', arrow: true, indent: true },
  { id: 'how-to-choose-an-email-warmup-tool', label: '5. How to Choose an Email Warmup Tool', arrow: true },
  { id: 'free-vs-paid-email-warmup-tools', label: '6. Free vs Paid Email Warmup Tools', arrow: true },
  { id: 'does-email-warmup-actually-work', label: '7. Does Email Warmup Actually Work?', arrow: true },
  { id: 'best-practices-for-email-warmup', label: '8. Best Practices for Email Warmup', arrow: true },
  { id: 'faqs', label: '9. Frequently Asked Questions', arrow: true },
  { id: 'conclusion', label: '10. Build a Stronger Foundation', arrow: true },
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
    <div className="rounded-[20px] border border-[#dbe3f4] bg-[#f8f9ff] p-4 md:p-7">
      <h3 className="text-[17px] md:text-[22px] font-bold text-[#111827] leading-tight mb-3 md:mb-4">
        {title}
      </h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
      {bullets && bullets.length > 0 ? (
        <ul className="mt-3 md:mt-4 space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 list-disc pl-5 text-justify">
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
      <h3 className="text-[16px] md:text-[19px] font-bold text-[#111827] mb-2 md:mb-4">
        {subtitle}
      </h3>
      <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
        {paragraphs.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </div>
    </div>
  );
}

function SectionImage({ id }: { id: string }) {
  const image = {
    src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80&fm=webp',
    alt: 'Email warmup dashboard',
    label: 'Warmup',
  };
  if (!image) return null;

  return (
    <div className="rounded-[24px] overflow-hidden border border-[#dbe3f4] bg-white shadow-[0_12px_32px_rgba(79,99,255,0.08)]">
      <div className="relative w-full aspect-[16/9] md:aspect-[16/7] h-auto md:h-[340px]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#091b36]/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 md:top-4 md:left-4 rounded-full bg-white/90 px-2.5 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs font-semibold text-[#4f63ff] backdrop-blur">
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
      <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
        {title}
      </h2>
      <div className="space-y-4">
        {intro.length > 0 && (
          <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
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
    <div className="space-y-3 md:space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-[#dbe3f4] rounded-[16px] bg-white overflow-hidden shadow-[0_4px_12px_rgba(17,24,39,0.04)]">
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-4 py-3 md:px-6 md:py-4 text-left text-[15px] md:text-[17px] font-semibold text-[#111827] hover:bg-[#f8f9ff] transition-colors duration-200"
            >
              <span>{faq.subtitle}</span>
              <span className="text-[#4f63ff] text-xl md:text-2xl leading-none ml-4 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              className={`px-4 md:px-6 transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-[1000px] pb-3 md:pb-4 opacity-100' : 'max-h-0 pb-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="space-y-3 md:space-y-4 text-[#4f5668] text-[15px] md:text-[17px] leading-7 text-justify">
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
          <div className="relative w-[180px] md:w-[200px] h-[110px] md:h-[130px] shrink-0">
            <Image
              src="/360aironewlog.png"
              alt="360Airo logo"
              fill
              className="object-contain"
              priority={false}
            />
          </div>
        </div>
        <h3 className="text-[15px] md:text-[16px] leading-[1.3] font-bold text-white text-center mt-[-20px] md:mt-[-30px] mb-3 md:mb-4">
          Email Warmup
          <br />
          Made Simple
        </h3>
        <p className="text-[11px] md:text-[12px] leading-5 text-white text-center mb-3 md:mb-4">
          Automate warmup, monitor reputation, and improve deliverability from day one.
        </p>
        <button className="w-full rounded-[12px] border border-white bg-transparent px-3 py-2.5 md:px-4 md:py-3 text-white text-[12px] md:text-[13px] font-bold hover:opacity-95 transition">
          Try For FREE!
        </button>
      </div>
      <div className="rounded-[18px] border border-[#dbe3f4] bg-white p-3 md:p-4 shadow-[0_8px_24px_rgba(17,24,39,0.05)]">
        <p className="text-[9px] md:text-[10px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-1 md:mb-2">
          Quick Tip
        </p>
        <h4 className="text-[12px] md:text-[13px] leading-5 font-bold text-[#111827] mb-1 md:mb-2">
          Warmup isn't optional
        </h4>
        <p className="text-[10px] md:text-[11px] leading-5 text-[#5f6472]">
          Sending hundreds of emails from a new inbox without warmup is one of the fastest ways to land in spam.
        </p>
      </div>
    </aside>
  );
}

export default function BlogEmailWarmupPage() {
  const [activeId, setActiveId] = useState('introduction');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement | null>(null);
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  // INP FIX: Throttle scroll handler with requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(() => {
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
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
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

          /* Font-display swap to prevent invisible text during font loading */
          @font-face {
            font-family: 'Barlow Condensed';
            font-display: swap;
          }
          @font-face {
            font-family: 'DM Sans';
            font-display: swap;
          }
          @font-face {
            font-family: 'Outfit';
            font-display: swap;
          }
        `}</style>

        {/* LCP FIX: Preload hero image with WebP and high priority */}
        <link
          rel="preload"
          fetchPriority="high"
          as="image"
          href="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
          type="image/webp"
        />

        {/* Hero Section */}
        <section className="pt-6 md:pt-10 pb-6 md:pb-8 px-3 md:px-4 border-b border-[#ddd9ef]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb – all three parts are now clickable links */}
            <div className="flex flex-wrap items-center gap-1 md:gap-2 text-[10px] md:text-sm text-[#6b7280] mb-2 md:mb-4">
              <Link href="/blogs" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Blog
              </Link>
              <span>›</span>
              <Link href="/blogs?category=deliverability" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors">
                Deliverability
              </Link>
              <span>›</span>
              <Link href="./" className="font-medium text-[#111827] hover:text-[#4f63ff] transition-colors break-words">
                <span className="hidden sm:inline">What Are Email Warmup Tools and How Do They Work?</span>
                <span className="sm:hidden">Email Warmup Tools Guide</span>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                {/* CLS FIX + LCP FIX: aspect-ratio container and priority image */}
                <div className="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-auto lg:min-h-[410px] rounded-[20px] md:rounded-[28px] overflow-hidden bg-gradient-to-br from-[#0a3f7a] via-[#0b5ca8] to-[#36a7e8] shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80&fm=webp"
                    alt="Email warmup tools hero"
                    fill
                    priority
                    fetchPriority="high"
                    decoding="sync"
                    className="object-cover mix-blend-overlay opacity-35"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#072f63]/95 via-[#0b4f96]/70 to-transparent" />
                  <div className="relative z-10 h-full p-5 md:p-10 flex flex-col justify-between">
                    <p className="text-white text-[20px] md:text-[36px] lg:text-[42px] font-bold leading-tight max-w-[420px]">
                      Email Warmup
                      <br />
                      Tools Guide
                      <br />
                      2026
                    </p>
                    <div className="absolute bottom-0 right-0 w-[48%] h-[92%] hidden md:block">
                      <Image
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80&fm=webp"
                        alt="Email warmup team"
                        fill
                        className="object-contain object-bottom"
                        priority={false}
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
                <p className="text-[#0ea5b7] font-semibold uppercase tracking-wide text-[10px] md:text-[12px] mb-2 md:mb-3">
                  Deliverability Guide
                </p>
                <h1 className="text-[#111827] text-[22px] md:text-[36px] lg:text-[42px] font-bold leading-[1.08] tracking-[-0.02em] mb-3 md:mb-4">
                  What Are Email Warmup Tools and How Do They Work?
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#5f6472] max-w-2xl mb-3 md:mb-4 leading-relaxed text-justify">
                  You've created a new email address. Your prospect list is ready. But sending hundreds of emails immediately could damage your sender reputation. Here's how warmup tools help.
                </p>

                {/* Meta info – single row on desktop, wrap on mobile */}
                <div className="mb-3 md:mb-4 inline-flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3 rounded-xl border border-[#0C162C] bg-[#0C162C] px-3 py-2 md:px-4 md:py-3 text-white text-[10px] md:text-sm whitespace-normal md:whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logonew.png"
                      alt="360Airo Team"
                      width={140}
                      height={40}
                      className="h-7 md:h-10 w-auto object-contain"
                      priority={false}
                    />
                  </div>
                  <span>• 360AIRO Team</span>
                  <span>• Updated: Jun 2026</span>
                  <span>• 12 min read</span>
                  <span>• 1.2K reads</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl bg-[#4f63ff] text-white font-semibold text-sm md:text-base shadow-md hover:bg-[#4154f5] transition-all">
                    Start Reading
                  </button>
                  <button className="px-5 py-2.5 md:px-7 md:py-3.5 rounded-xl border border-[#6b8cff] text-[#4f63ff] bg-transparent font-semibold text-sm md:text-base hover:bg-white/60 transition-all">
                    Schedule a Demo
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-3 md:px-4 py-4 md:py-8">
          <div className="max-w-[1440px] mx-auto grid xl:grid-cols-[250px_minmax(0,1fr)_250px] lg:grid-cols-[250px_minmax(0,1fr)] gap-6 md:gap-8">
            {/* TOC */}
            <aside className="sticky top-20 self-start hidden lg:block mb-6 md:mb-10">
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
                  'You\'ve created a new email address.',
                  'Your prospect list is ready, your campaign is written, and your sales team is ready to begin outreach. But sending hundreds of emails immediately could damage your sender reputation before the campaign has a chance to perform.',
                  'Mailbox providers evaluate sending patterns, engagement, authentication, and reputation when deciding where an email belongs. A sudden increase in activity from a new or inactive account can appear suspicious.',
                  "That's where email warmup tools come in.",
                  'An email warmup tool gradually increases sending activity and helps establish a consistent history before you scale outreach. Instead of managing the process manually, automated email warmup helps teams prepare multiple mailboxes while monitoring their performance.',
                  "Let's explore what email warming is, how email warmup software works, and how it connects to sender reputation and deliverability.",
                ]}
                infographic={{
                  title: 'Why warmup matters',
                  paragraphs: ['Mailbox providers trust consistent, gradual sending patterns. Sudden spikes trigger spam filters.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-email-warmup"
                id="what-is-email-warmup"
                title="1. What Is Email Warmup?"
                showImage={false}
                intro={[
                  'Email warmup is the process of gradually increasing activity from a new, inactive, or low-volume email account.',
                  'The goal is to establish consistent sending behavior before scaling email outreach.',
                  'For example, if an email address has little sending history and suddenly sends hundreds of messages, the activity may appear unusual. Gradual warmup helps create a more consistent sending pattern.',
                ]}
                infographic={{
                  title: 'Core objective',
                  paragraphs: ['Build a positive sending history so providers recognize your domain as legitimate.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-email-warming"
                id="what-is-email-warming"
                title="1.1 What Is Email Warming?"
                showImage={false}
                intro={[
                  'Email warming and email warmup refer to the same basic process.',
                  'A typical warmup process may include:',
                ]}
                infographic={{
                  title: 'Typical warmup steps',
                  paragraphs: ['Gradual volume increases build trust with mailbox providers.'],
                  bullets: [
                    'Starting with lower daily sending volumes',
                    'Increasing activity gradually',
                    'Generating natural email interactions',
                    'Monitoring bounce rates',
                    'Tracking spam placement',
                    'Adjusting activity based on performance',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'The objective',
                    paragraphs: ["The objective isn't simply to send more emails. It's to create stable sending behavior that supports long-term deliverability."],
                  },
                ]}
              />

              <ArticleSection
                key="what-is-email-domain-warmup"
                id="what-is-email-domain-warmup"
                title="1.2 What Is Email Domain Warmup?"
                showImage={false}
                intro={[
                  'Email address warmup focuses on an individual mailbox. Email domain warmup focuses on establishing a healthy sending history for the domain.',
                  'This distinction matters because mailbox providers evaluate signals associated with both individual senders and domains.',
                  'For revenue teams operating multiple mailboxes, a strong warmup strategy should consider both levels.',
                ]}
                blocks={[]}
              />

              <ArticleSection
                key="what-are-email-warmup-tools"
                id="what-are-email-warmup-tools"
                title="2. What Are Email Warmup Tools?"
                showImage={true}
                intro={[
                  'Email warmup tools are software platforms designed to automate the email warming process.',
                  'Without automation, someone would need to send emails manually, generate conversations, monitor responses, and increase activity over time. This becomes difficult when an organization manages multiple domains and sender accounts.',
                  'An email warmup service automates much of this process.',
                  'Depending on the platform, email warmup software may help teams:',
                ]}
                infographic={{
                  title: 'Common features',
                  paragraphs: ['Automation turns a tedious manual task into a scalable process.'],
                  bullets: [
                    'Gradually increase sending activity',
                    'Create consistent sending patterns',
                    'Monitor mailbox performance',
                    'Track deliverability changes',
                    'Identify potential reputation issues',
                    'Manage multiple email accounts',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Platform scope',
                    paragraphs: ['Some platforms focus exclusively on warmup, while others combine it with deliverability monitoring and outreach automation.'],
                  },
                ]}
              />

              <ArticleSection
                key="manual-vs-automated-warmup"
                id="manual-vs-automated-warmup"
                title="2.1 Manual vs Automated Email Warmup"
                showImage={false}
                intro={[
                  'Manual warmup may be manageable for one email address.',
                  'It becomes much harder to scale across dozens of mailboxes.',
                  'Automated email warmup reduces manual work by managing gradual activity increases and monitoring mailbox performance.',
                  'For revenue teams, the biggest advantage is consistency. Multiple mailboxes can follow structured processes without requiring sales representatives to manage every step manually.',
                ]}
                infographic={{
                  title: 'Key difference',
                  paragraphs: ['Manual works for 1 inbox. Automated works for 100.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-is-an-email-warmup-api"
                id="what-is-an-email-warmup-api"
                title="2.2 What Is an Email Warmup API?"
                showImage={false}
                intro={[
                  'An email warmup API allows organizations to connect warmup functionality with existing sales or email infrastructure.',
                  'Businesses may use an API to add new mailboxes to warmup workflows, monitor progress, retrieve mailbox health information, or connect warmup data with internal reporting systems.',
                  'This can be particularly useful for organizations managing email infrastructure at scale.',
                ]}
                infographic={{
                  title: 'API advantage',
                  paragraphs: ['Integrate warmup directly into your existing sales stack for seamless operations.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="how-do-email-warmup-tools-work"
                id="how-do-email-warmup-tools-work"
                title="3. How Do Email Warmup Tools Work?"
                showImage={false}
                intro={[
                  'Most email warmup tools follow a gradual process rather than immediately increasing sending volume.',
                ]}
                infographic={{
                  title: 'Step-by-step process',
                  paragraphs: ['A structured, incremental approach is the foundation of effective warmup.'],
                  bullets: [
                    'Connect the Email Account',
                    'Start With Lower Activity',
                    'Generate Engagement Signals',
                    'Monitor and Adjust',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Connect the Email Account',
                    paragraphs: ['The first step is connecting the mailbox to the warmup platform. Once connected, the software can begin managing warmup activity and monitoring performance.'],
                  },
                  {
                    subtitle: 'Start With Lower Activity',
                    paragraphs: ['A new mailbox shouldn\'t immediately begin high-volume outreach. The warmup tool starts with lower sending activity and gradually increases volume over time. The rate of increase may depend on mailbox age, domain history, engagement, and performance.'],
                  },
                  {
                    subtitle: 'Generate Engagement Signals',
                    paragraphs: ['Sending volume is only one part of email performance. Mailbox providers may also consider how recipients interact with messages. Depending on the service, warmup tools may support email interactions intended to establish a history of normal sending activity.'],
                  },
                  {
                    subtitle: 'Monitor and Adjust',
                    paragraphs: ['Effective warmup shouldn\'t rely on a fixed schedule alone. Email warmup software may monitor bounce rates, delivery performance, spam placement, sending patterns, and reputation indicators. If performance declines, the warmup strategy may need to be adjusted rather than automatically increasing volume.'],
                  },
                ]}
              />

              <ArticleSection
                key="how-sender-reputation-affects-warmup"
                id="how-sender-reputation-affects-warmup"
                title="4. How Sender Reputation Affects Email Warmup"
                showImage={false}
                intro={[
                  'Email warmup and email sender reputation are closely connected.',
                  'Sender reputation represents how trustworthy your sending activity appears to mailbox providers. Stronger reputation can support better inbox placement, while poor reputation may increase filtering or rejection.',
                ]}
                infographic={{
                  title: 'The connection',
                  paragraphs: ['Warmup builds reputation. Reputation determines inbox placement.'],
                }}
                blocks={[]}
              />

              <ArticleSection
                key="what-can-damage-sender-reputation"
                id="what-can-damage-sender-reputation"
                title="4.1 What Can Damage Sender Reputation?"
                showImage={false}
                intro={[
                  'Several factors can negatively affect email sender reputation:',
                ]}
                infographic={{
                  title: 'Common reputation killers',
                  paragraphs: ['Avoid these to protect your sending infrastructure.'],
                  bullets: [
                    'High bounce rates',
                    'Spam complaints',
                    'Poor list quality',
                    'Sudden sending spikes',
                    'Low engagement',
                    'Missing authentication',
                    'Sending to inactive addresses',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Remember',
                    paragraphs: ['This is why warmup is only one part of a healthy deliverability strategy. A well-warmed mailbox can still lose reputation if outreach practices are poor.'],
                  },
                ]}
              />

              <ArticleSection
                key="how-to-improve-sender-reputation"
                id="how-to-improve-sender-reputation"
                title="4.2 How to Improve Email Sender Reputation"
                showImage={false}
                intro={[
                  'If you want to improve or fix email sender reputation, start with the fundamentals:',
                ]}
                infographic={{
                  title: 'Action plan',
                  paragraphs: ['Reputation is built over time with consistent good practices.'],
                  bullets: [
                    'Configure email authentication',
                    'Verify prospect data',
                    'Remove invalid addresses',
                    'Increase volume gradually',
                    'Monitor bounce and complaint rates',
                    'Send relevant messages',
                    'Track deliverability continuously',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Long-term view',
                    paragraphs: ['The relationship between email deliverability and sender reputation continues long after the initial warmup period.'],
                  },
                ]}
              />

              <ArticleSection
                key="how-to-choose-an-email-warmup-tool"
                id="how-to-choose-an-email-warmup-tool"
                title="5. How to Choose an Email Warmup Tool"
                showImage={false}
                intro={[
                  'Not every email warmup tool offers the same capabilities.',
                  'Some focus on basic warmup, while others combine warmup with deliverability analytics, reputation monitoring, and sales automation.',
                  'When comparing email warmup software, consider:',
                ]}
                infographic={{
                  title: 'Selection criteria',
                  paragraphs: ['The right platform should fit your scale and workflow.'],
                  bullets: [
                    'Automated warmup capabilities',
                    'Multiple mailbox management',
                    'Deliverability insights',
                    'Sender reputation monitoring',
                    'Analytics and reporting',
                    'API availability',
                    'Integration with existing workflows',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Bottom line',
                    paragraphs: ['The right platform should help you understand not only whether a mailbox is warming up, but whether the overall email infrastructure is healthy.'],
                  },
                ]}
              />

              <ArticleSection
                key="free-vs-paid-email-warmup-tools"
                id="free-vs-paid-email-warmup-tools"
                title="6. Free vs Paid Email Warmup Tools"
                showImage={false}
                intro={[
                  'Free email warmup tools may be useful for individuals testing a new mailbox or running limited outreach.',
                  'They can help teams understand the basic warmup process without committing to a larger platform.',
                  'However, growing revenue teams often need greater visibility.',
                  'Paid email warmup software may provide:',
                ]}
                infographic={{
                  title: 'Paid advantages',
                  paragraphs: ['Free tools are great for testing. Paid tools are built for scaling.'],
                  bullets: [
                    'Multiple mailbox management',
                    'Advanced analytics',
                    'Reputation monitoring',
                    'Deliverability insights',
                    'Workflow automation',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Final thought',
                    paragraphs: ['The best free email warmup tool isn\'t necessarily the best choice for a scaling sales organization. The right option depends on the number of mailboxes, campaign volume, and level of monitoring required.'],
                  },
                ]}
              />

              <ArticleSection
                key="does-email-warmup-actually-work"
                id="does-email-warmup-actually-work"
                title="7. Does Email Warmup Actually Work?"
                showImage={false}
                intro={[
                  'A structured warmup process can help establish consistent sending patterns for new or inactive mailboxes.',
                  'But email warmup isn\'t a shortcut to guaranteed inbox placement.',
                  'It works best when combined with:',
                ]}
                infographic={{
                  title: 'Success factors',
                  paragraphs: ['Warmup is most effective as part of a broader strategy.'],
                  bullets: [
                    'Proper authentication',
                    'Clean prospect data',
                    'Gradual volume increases',
                    'Relevant outreach',
                    'Low complaint rates',
                    'Continuous monitoring',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Warning',
                    paragraphs: ['Warmup cannot compensate for poor lists or aggressive sending behavior. It should be treated as one part of a broader email deliverability strategy.'],
                  },
                ]}
              />

              <ArticleSection
                key="best-practices-for-email-warmup"
                id="best-practices-for-email-warmup"
                title="8. Best Practices for Email Warmup"
                showImage={false}
                intro={[
                  'Following best practices ensures your warmup efforts translate into long-term deliverability gains.',
                ]}
                infographic={{
                  title: 'Core principles',
                  paragraphs: ['Start slow, monitor everything, and never stop verifying.'],
                }}
                blocks={[
                  {
                    subtitle: '8.1 Start Before Campaign Launch',
                    paragraphs: ['Give new or inactive mailboxes time to establish consistent activity before scaling outreach.'],
                  },
                  {
                    subtitle: '8.2 Increase Volume Gradually',
                    paragraphs: ['Avoid sudden spikes. Adjust sending volume based on mailbox performance rather than following the same schedule for every account.'],
                  },
                  {
                    subtitle: '8.3 Monitor Sender Reputation',
                    paragraphs: ['Use an email sender reputation check alongside bounce, complaint, authentication, and inbox placement data. A single sender score doesn\'t provide the complete picture.'],
                  },
                  {
                    subtitle: '8.4 Maintain List Quality',
                    paragraphs: ['Invalid email addresses can quickly damage a healthy reputation. Verify prospect information before launching campaigns.'],
                  },
                  {
                    subtitle: '8.5 Keep Monitoring After Warmup',
                    paragraphs: ['Warmup isn\'t a one-time fix. Sender reputation can change as volume, engagement, and list quality change. Continuous monitoring is essential.'],
                  },
                ]}
              />

              {/* FAQ Section */}
              <section id="faqs" className="scroll-mt-28">
                <h2 className="text-[20px] md:text-[24px] font-bold text-[#111827] mb-3 md:mb-4">
                  9. Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  <MiniInfographic
                    title="Quick answers"
                    paragraphs={['Clarifying common questions about warmup.']}
                  />
                  <FaqAccordion
                    faqs={[
                      {
                        subtitle: '9.1 What is an email warmup tool?',
                        paragraphs: ['An email warmup tool is software that automates gradual sending activity and helps monitor mailbox performance before higher-volume outreach begins.'],
                      },
                      {
                        subtitle: '9.2 What are email warmup services?',
                        paragraphs: ['Email warmup services help establish consistent sending activity for new or inactive email accounts through gradual volume increases and performance monitoring.'],
                      },
                      {
                        subtitle: '9.3 Does email warmup actually work?',
                        paragraphs: ['Email warmup can support consistent sending behavior, but it works best alongside authentication, clean data, responsible sending practices, and deliverability monitoring.'],
                      },
                      {
                        subtitle: '9.4 What is the best email warmer?',
                        paragraphs: ['The best email warmer depends on your needs. Look for automated warmup, multiple mailbox management, deliverability visibility, reputation monitoring, and useful integrations.'],
                      },
                      {
                        subtitle: '9.5 What is Email Warmup Outlook?',
                        paragraphs: ['Email warmup for Outlook involves gradually establishing consistent sending activity while monitoring performance across Microsoft\'s email ecosystem. Sender reputation, authentication, engagement, and list quality remain important.'],
                      },
                      {
                        subtitle: '9.6 Which factors can negatively impact email sender reputation?',
                        paragraphs: ['High bounce rates, spam complaints, poor list quality, missing authentication, sudden volume increases, and consistently low engagement can negatively affect sender reputation.'],
                      },
                    ]}
                  />
                </div>
              </section>

              <ArticleSection
                key="conclusion"
                id="conclusion"
                title="10. Build a Stronger Foundation for Email Outreach"
                showImage={false}
                intro={[
                  'Successful email outreach starts before the first campaign is launched.',
                  'Email warmup tools help teams gradually prepare new or inactive mailboxes, establish consistent sending behavior, and reduce the manual effort involved in managing warmup.',
                  'But warmup is only one part of the equation.',
                  'Revenue teams also need visibility into sender reputation, authentication, deliverability, and inbox placement. When these elements work together, businesses can build healthier email infrastructure and scale outreach with greater confidence.',
                ]}
                infographic={{
                  title: '360Airo',
                  paragraphs: [
                    '360Airo brings email warmup, deliverability intelligence, and AI-powered outreach into a connected workflow, helping revenue teams protect sender reputation and improve campaign performance.',
                  ],
                }}
                blocks={[
                  {
                    subtitle: 'Final thought',
                    paragraphs: ['Build a stronger foundation for outbound email with intelligent warmup, continuous monitoring, and AI-powered deliverability insights from 360Airo.'],
                  },
                ]}
              />
            </div>

            <RightPromoCards />
          </div>
        </section>

        {/* Recent Posts */}
        <section className="px-3 md:px-4 pb-4 md:pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-[18px] md:text-[24px] font-bold text-[#111827]">Recent blog posts</h2>
              <a href="/blogs" className="text-[12px] md:text-[14px] font-medium text-[#4f63ff] hover:underline">View all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  title: '10 Cheapest Cold Email Software Tools for Startups & Agencies',
                  tag: 'Cold Email',
                  href: '/blogs/10-cheapest-cold-email-software',
                  description: 'Discover affordable cold email tools for 2026.',
                  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80&fm=webp',
                },
                {
                  title: 'How AI Prospecting Improves Sales Efficiency',
                  tag: 'AI Sales',
                  href: '/blogs/ai-prospecting-sales-efficiency',
                  description: 'Read this next to go deeper into modern sales workflows.',
                  image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80&fm=webp',
                },
                {
                  title: 'CRM Integration Best Practices for Outreach Teams',
                  tag: 'CRM Integration',
                  href: '/blogs/crm-integration-best-practices',
                  description: 'Read this next to go deeper into modern sales workflows.',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80&fm=webp',
                },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group overflow-hidden rounded-[16px] md:rounded-[20px] border border-[#dbe3f4] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-shadow">
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" priority={false} />
                  </div>
                  <div className="p-3 md:p-5">
                    <p className="text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4f63ff] mb-1 md:mb-2">{post.tag}</p>
                    <h3 className="text-[14px] md:text-[16px] font-bold text-[#111827] leading-snug mb-1.5 md:mb-3 group-hover:text-[#4f63ff] transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-[11px] md:text-[13px] text-[#6b7280] line-clamp-2">{post.description}</p>
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