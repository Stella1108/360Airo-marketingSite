import React from 'react';
import Link from 'next/link';
import '../styles/CTASection.css';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-heading">Your Next Stage of Sales Growth Starts Here</h2>
        <p className="cta-description">
          Whether you're building your first outbound team or scaling an existing one, 360Airo gives your SMB the tools to generate more pipeline, book more meetings, and accelerate revenue.
        </p>
        <Link href="/book-a-demo" className="cta-button">
          Schedule a Demo
        </Link>
      </div>
    </section>
  );
}
