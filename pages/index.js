import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div>

      <h2 className={styles.action}>
        <Link href="/create" className={styles.button} style={{borderBottom: "2px solid #000"}}> Lets make some qr codes!!!!</Link>
      </h2>
      <div>
        see some test runs <Link href="/qrs"><span style={{textDecoration: "underline", cursor: "pointer"}}>here</span></Link>.
      </div>

      <p>
        This is a small test project to try see if I still remember some nextJS/graphql concepts.
        <br/>
        <br/>
        Some features
        <ul>
          <li>Type something to generate a QR code</li>
          <li>Customize size and color</li>
          <li>Save in svg format to a PostgreSQL database</li>
          <li>Uses apollo client</li>
        </ul>
      </p>

    </div>
  )
}
