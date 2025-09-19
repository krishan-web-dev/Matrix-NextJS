'use client';

import { useState, useEffect, useMemo } from 'react';
import styles from './SocialShare.module.scss';
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaEnvelope,
  FaShareAlt,
} from 'react-icons/fa';

export default function SocialShare() {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const socialLinks = useMemo(() => [
    {
      icon: <FaFacebookF />,
      color: '#1877f2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: <FaTwitter />,
      color: '#1da1f2',
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check%20this%20out!`,
    },
    {
      icon: <FaWhatsapp />,
      color: '#25d366',
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent('Check this out: ' + shareUrl)}`,
    },
    {
      icon: <FaLinkedinIn />,
      color: '#0a66c2',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      icon: <FaEnvelope />,
      color: '#dd4b39',
      href: `mailto:?subject=Check this out&body=${encodeURIComponent(shareUrl)}`,
    },
  ], [shareUrl]);

  return (
    <div className={styles.shareContainer}>
      <div className={styles.hoverArea}>
        <div className={styles.shareButton}>
          <FaShareAlt />
        </div>

        <div className={styles.iconRow}>
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconWrapper}
              style={{
                backgroundColor: item.color,
                transitionDelay: `${index * 80}ms`,
              }}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
