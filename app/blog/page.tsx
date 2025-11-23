'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaClock, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { blogPosts } from '@/lib/data';
import styles from '@/styles/Blog.module.css';

export default function Blog() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className={styles.blog}>
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className={styles.header}
        >
          <h1>
            My <span className="gradient-text">Blog</span>
          </h1>
          <p className={styles.subtitle}>
            Thoughts, tutorials, and insights about web development
          </p>
        </motion.div>

        <div className={styles.grid}>
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className={styles.imageContainer}>
                  <div className={styles.imagePlaceholder}>
                    <span>{post.title}</span>
                  </div>
                </div>

                <div className={styles.content}>
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

                  <h2 className={styles.title}>{post.title}</h2>
                  <p className={styles.description}>{post.description}</p>

                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.div
                    className={styles.readMore}
                    whileHover={{ x: 5 }}
                  >
                    Read More <FaArrowRight />
                  </motion.div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <motion.div
            className={styles.noPosts}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No blog posts yet. Check back soon!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

