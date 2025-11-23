'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaClock, FaCalendarAlt, FaArrowLeft, FaTag } from 'react-icons/fa';
import { blogPosts } from '@/lib/data';
import { use } from 'react';
import styles from '@/styles/BlogPost.module.css';

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className={styles.notFound}>
        <div className="container">
          <h1>Post Not Found</h1>
          <p>The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className={styles.blogPost}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Link href="/blog" className={styles.backLink}>
            <FaArrowLeft /> Back to Blog
          </Link>

          <div className={styles.header}>
            <h1>{post.title}</h1>

            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <FaCalendarAlt />
                {formatDate(post.date)}
              </span>
              <span className={styles.metaItem}>
                <FaClock />
                {post.readTime}
              </span>
            </div>

            <div className={styles.tags}>
              {post.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  <FaTag />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.coverImage}>
            <div className={styles.imagePlaceholder}>
              <span>{post.title}</span>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.article}>
              <p className={styles.description}>{post.description}</p>

              <h2>Introduction</h2>
              <p>
                This is a sample blog post content. In a real application, you would
                fetch the full content from a CMS, Markdown files, or a database.
                You can integrate solutions like MDX, Contentful, or Sanity for
                managing your blog content.
              </p>

              <h2>Key Points</h2>
              <ul>
                <li>Modern web development techniques</li>
                <li>Best practices and patterns</li>
                <li>Real-world examples and use cases</li>
                <li>Performance optimization tips</li>
              </ul>

              <h2>Code Example</h2>
              <pre className={styles.codeBlock}>
                <code>
{`// Example code snippet
const greet = (name: string) => {
  return \`Hello, \${name}!\`;
};

console.log(greet('World'));`}
                </code>
              </pre>

              <h2>Conclusion</h2>
              <p>
                This example demonstrates how you can structure your blog posts. You can
                add MDX support to write posts in Markdown with JSX components, or
                integrate a headless CMS for easier content management.
              </p>
            </div>

            <div className={styles.share}>
              <h3>Share this post</h3>
              <div className={styles.shareButtons}>
                <button className={styles.shareBtn}>Twitter</button>
                <button className={styles.shareBtn}>LinkedIn</button>
                <button className={styles.shareBtn}>Facebook</button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

