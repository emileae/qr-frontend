import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Main(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>QR Stickers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
      <Link href="/">Home</Link> | <Link href="/create">Create a QR code</Link> | <Link href="/qrs">See "orders"</Link>
      </header>

      <main className={styles.main}>
        {props.children}
      </main>

      <footer className={styles.footer}>
          Emile's QR stickers
      </footer>
    </div>
  )
}
