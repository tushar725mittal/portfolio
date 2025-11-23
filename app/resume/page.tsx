'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaDownload, 
  FaGlobe, 
  FaFilePdf, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode,
  FaCertificate,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaLinkedin,
  FaGithub
} from 'react-icons/fa';
import { personalInfo, experiences, education, skills, projects, certifications } from '@/lib/data';
import styles from '@/styles/Resume.module.css';

type ViewMode = 'web' | 'pdf';

function ResumeContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [pdfError, setPdfError] = useState(false);

  // Read view mode from URL params on mount
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'pdf' || view === 'web') {
      setViewMode(view as ViewMode);
    }
  }, [searchParams]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Tushar Mittal - CV.pdf';
    link.download = 'Tushar_Mittal_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.searchParams.set('view', mode);
    window.history.pushState({}, '', url);
  };

  return (
    <section className={styles.resume}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1>
            My <span className="gradient-text">Resume</span>
          </h1>
          <p className={styles.subtitle}>
            Download my resume or view it in your browser
          </p>

          <div className={styles.controls}>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.toggleBtn} ${viewMode === 'web' ? styles.active : ''}`}
                onClick={() => handleViewChange('web')}
              >
                <FaGlobe /> Web View
              </button>
              <button
                className={`${styles.toggleBtn} ${viewMode === 'pdf' ? styles.active : ''}`}
                onClick={() => handleViewChange('pdf')}
              >
                <FaFilePdf /> PDF View
              </button>
            </div>

            <motion.button
              className={styles.downloadBtn}
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download PDF
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === 'web' ? (
            <motion.div
              key="web-view"
              className={styles.webView}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Contact Header */}
              <motion.div
                className={styles.contactHeader}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
              >
                <div className={styles.profileSection}>
                  <div className={styles.profileImageContainer}>
                    <Image
                      src="/tusharphoto.jpeg"
                      alt={personalInfo.name}
                      width={120}
                      height={120}
                      className={styles.profilePhoto}
                    />
                  </div>
                  <div className={styles.nameSection}>
                    <h2>{personalInfo.name}</h2>
                    <p className={styles.jobTitle}>{personalInfo.title}</p>
                  </div>
                </div>
                <div className={styles.contactInfo}>
                  <a href={`mailto:${personalInfo.email}`}>
                    <FaEnvelope /> {personalInfo.email}
                  </a>
                  <a href={`https://linkedin.com/in/${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin /> LinkedIn
                  </a>
                  <a href={`https://github.com/${personalInfo.github}`} target="_blank" rel="noopener noreferrer">
                    <FaGithub /> GitHub
                  </a>
                  <span>
                    <FaMapMarkerAlt /> {personalInfo.location}
                  </span>
                </div>
              </motion.div>

              {/* Summary */}
              <motion.div
                className={styles.section}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h3 variants={fadeInUp}>
                  <FaBriefcase /> Professional Summary
                </motion.h3>
                <motion.p variants={fadeInUp} className={styles.summary}>
                  {personalInfo.bio}
                </motion.p>
              </motion.div>

              {/* Experience */}
              <motion.div
                className={styles.section}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h3 variants={fadeInUp}>
                  <FaBriefcase /> Work Experience
                </motion.h3>
                <div className={styles.timeline}>
                  {experiences.map((exp) => (
                    <motion.div
                      key={exp.id}
                      className={styles.timelineItem}
                      variants={fadeInUp}
                    >
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        <div className={styles.itemHeader}>
                          <div>
                            <h4>{exp.position}</h4>
                            <p className={styles.company}>{exp.company}</p>
                          </div>
                          <div className={styles.dateLocation}>
                            <span className={styles.date}>
                              <FaCalendarAlt /> {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.endDate === 'Present' ? 'Present' : new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </span>
                            {exp.location && (
                              <span className={styles.location}>
                                <FaMapMarkerAlt /> {exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <ul className={styles.responsibilities}>
                          {exp.description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Education */}
              <motion.div
                className={styles.section}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h3 variants={fadeInUp}>
                  <FaGraduationCap /> Education
                </motion.h3>
                <div className={styles.timeline}>
                  {education.map((edu) => (
                    <motion.div
                      key={edu.id}
                      className={styles.timelineItem}
                      variants={fadeInUp}
                    >
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        <div className={styles.itemHeader}>
                          <div>
                            <h4>{edu.degree}</h4>
                            <p className={styles.company}>{edu.institution || edu.school}</p>
                            <p className={styles.field}>{edu.field}</p>
                          </div>
                          <div className={styles.dateLocation}>
                            <span className={styles.date}>
                              <FaCalendarAlt /> {edu.year || `${new Date(edu.startDate!).getFullYear()} - ${new Date(edu.endDate!).getFullYear()}`}
                            </span>
                            <span className={styles.location}>
                              <FaMapMarkerAlt /> {edu.location}
                            </span>
                            {(edu.gpa || edu.percentage) && (
                              <span className={styles.gpa}>
                                {edu.gpa ? `GPA: ${edu.gpa}` : `Percentage: ${edu.percentage}`}
                              </span>
                            )}
                          </div>
                        </div>
                        {edu.description && (
                          <p className={styles.description}>{edu.description}</p>
                        )}
                        {edu.achievements && (
                          <ul className={styles.responsibilities}>
                            {edu.achievements.map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div
                className={styles.section}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h3 variants={fadeInUp}>
                  <FaCode /> Technical Skills
                </motion.h3>
                <div className={styles.skillsGrid}>
                  {['Frontend', 'Backend', 'Tools'].map((category) => (
                    <motion.div key={category} className={styles.skillCategory} variants={fadeInUp}>
                      <h4>{category}</h4>
                      <div className={styles.skillTags}>
                        {skills
                          .filter((skill) => skill.category === category)
                          .map((skill) => (
                            <span key={skill.id} className={styles.skillTag}>
                              {skill.name}
                            </span>
                          ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Projects */}
              <motion.div
                className={styles.section}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.h3 variants={fadeInUp}>
                  Featured Projects
                </motion.h3>
                <div className={styles.projectsGrid}>
                  {projects.filter(p => p.featured).map((project) => (
                    <motion.div
                      key={project.id}
                      className={styles.projectCard}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                    >
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                      <div className={styles.projectTags}>
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                          View Project →
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              {certifications.length > 0 && (
                <motion.div
                  className={styles.section}
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <motion.h3 variants={fadeInUp}>
                    <FaCertificate /> Certifications
                  </motion.h3>
                  <div className={styles.certificationsGrid}>
                    {certifications.map((cert) => (
                      <motion.div
                        key={cert.id}
                        className={styles.certCard}
                        variants={fadeInUp}
                      >
                        <h4>{cert.name}</h4>
                        <p className={styles.issuer}>{cert.issuer}</p>
                        <p className={styles.certDate}>{new Date(cert.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="pdf-view"
              className={styles.pdfView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.pdfContainer}>
                {pdfError ? (
                  <div className={styles.pdfError}>
                    <p>Unable to load PDF preview.</p>
                    <motion.button
                      className={styles.downloadBtn}
                      onClick={handleDownload}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaDownload /> Download PDF Instead
                    </motion.button>
                  </div>
                ) : (
                  <>
                    <iframe
                      src="/Tushar Mittal - CV.pdf#toolbar=1&navpanes=0&scrollbar=1"
                      className={styles.pdfIframe}
                      title="Resume PDF"
                      onError={() => setPdfError(true)}
                    />
                    <div className={styles.pdfFallback}>
                      <p>If the PDF doesn&apos;t load, you can:</p>
                      <div className={styles.fallbackActions}>
                        <motion.button
                          className="btn btn-primary"
                          onClick={handleDownload}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaDownload /> Download PDF
                        </motion.button>
                        <motion.a
                          href="/Tushar Mittal - CV.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Open in New Tab
                        </motion.a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function Resume() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <ResumeContent />
    </Suspense>
  );
}

