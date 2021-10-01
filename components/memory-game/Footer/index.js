import Image from 'next/image'
import styles from '../../../styles/Footer.module.css'

const Footer = (props) => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://juanmarin.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/juanmarin-white.svg" alt="Juan Marin Logo" width={120} height={20} />
        </span>
      </a>
    </footer>
  )
}
export default Footer;
