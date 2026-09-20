import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const NUSA_PUTRA_REFERENCE =
  'https://nusaputra.ac.id/about/our-values/'

function App() {
  const pageRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* =========================
         HERO INTRO ANIMATION
      ========================= */

      const heroTimeline = gsap.timeline()

      heroTimeline
        .from('.hero-eyebrow', {
          opacity: 0,
          y: 25,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from('.hero-title-line', {
          opacity: 0,
          y: 100,
          duration: 1.1,
          stagger: 0.12,
          ease: 'power4.out',
        }, '-=0.45')
        .from('.hero-description', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.55')
        .from('.hero-meta', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.45')
        .from('.hero-scroll', {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
        }, '-=0.35')


      /* =========================
         HERO PARALLAX
      ========================= */

      gsap.to('.hero-image', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })


      /* =========================
         HERO CONTENT FADE
      ========================= */

      gsap.to('.hero-content', {
        y: -100,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: '70% top',
          scrub: true,
        },
      })


      /* =========================
         GENERAL REVEAL
      ========================= */

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 70,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        })
      })


      /* =========================
         IMAGE REVEAL
      ========================= */

      gsap.utils.toArray('.image-reveal').forEach((element) => {
        gsap.from(element, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.4,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            once: true,
          },
        })
      })


      /* =========================
         TRILOGI ANIMATION
      ========================= */

      gsap.utils.toArray('.value-item').forEach((element, index) => {

        gsap.from(element, {
          opacity: 0,
          x:
            index === 0
              ? -80
              : index === 2
                ? 80
                : 0,
          y:
            index === 1
              ? 80
              : 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
            once: true,
          },
        })

      })


      /* =========================
         QUOTE
      ========================= */

      gsap.from('.big-quote', {
        opacity: 0,
        scale: 0.9,
        duration: 1.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.quote-section',
          start: 'top 75%',
          once: true,
        },
      })


      /* =========================
         VISUAL BREAK
      ========================= */

      gsap.to('.visual-break img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.visual-break',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })


      /* =========================
         READING PROGRESS
      ========================= */

      gsap.to('.reading-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      })


      /* =========================
         NAVBAR
      ========================= */

      ScrollTrigger.create({
        start: 'top -100',
        end: 99999,

        onEnter: () => {
          document
            .querySelector('.navbar')
            ?.classList.add('scrolled')
        },

        onLeaveBack: () => {
          document
            .querySelector('.navbar')
            ?.classList.remove('scrolled')
        },
      })

    }, pageRef)

    return () => ctx.revert()

  }, [])


  /* =========================
     NAVIGATION
  ========================= */

  const scrollTo = (id) => {

    setMenuOpen(false)

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: 'smooth',
      })

  }


  /* =========================
     COPY LINK
  ========================= */

  const copyLink = async () => {

    try {

      await navigator.clipboard.writeText(
        window.location.href
      )

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)

    } catch (error) {

      console.error(
        'Gagal menyalin link:',
        error
      )

    }

  }


  return (

    <div
      ref={pageRef}
      className="site"
    >

      {/* =====================================
          READING PROGRESS
      ===================================== */}

      <div className="reading-progress" />


      {/* =====================================
          NAVBAR
      ===================================== */}

      <header className="navbar">

        <div className="nav-inner">

          <button
            className="brand"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            WISNU<span>.</span>
          </button>


          <nav className="desktop-nav">

            <button
              onClick={() =>
                scrollTo('article')
              }
            >
              ARTICLE
            </button>

            <button
              onClick={() =>
                scrollTo('trilogi')
              }
            >
              TRILOGI
            </button>

            <button
              onClick={() =>
                scrollTo('reflection')
              }
            >
              REFLECTION
            </button>

            <button
              onClick={() =>
                scrollTo('about')
              }
            >
              ABOUT
            </button>

          </nav>


          <button
            className="menu-button"
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            aria-label="Menu"
          >

            {menuOpen ? '×' : '☰'}

          </button>

        </div>

      </header>


      {/* =====================================
          MOBILE MENU
      ===================================== */}

      <div
        className={`mobile-menu ${
          menuOpen ? 'open' : ''
        }`}
      >

        <button
          onClick={() =>
            scrollTo('article')
          }
        >
          ARTICLE
        </button>

        <button
          onClick={() =>
            scrollTo('trilogi')
          }
        >
          TRILOGI
        </button>

        <button
          onClick={() =>
            scrollTo('reflection')
          }
        >
          REFLECTION
        </button>

        <button
          onClick={() =>
            scrollTo('about')
          }
        >
          ABOUT
        </button>

      </div>


      {/* =====================================
          HERO
      ===================================== */}

      <section className="hero">

        <div className="hero-image-wrap">

          <img
            className="hero-image"
            src="/images/hero.jpg"
            alt="Suasana MABIM Universitas Nusa Putra"
          />

          <div className="hero-overlay" />

        </div>


        <div className="hero-content">

          <div className="hero-eyebrow">

            <span />

            MABIM 2026

            <span />

          </div>


          <h1 className="hero-title">

            <span className="hero-title-line">
              Perjalanan
            </span>

            <span className="hero-title-line italic">
              Pertama,
            </span>

            <span className="hero-title-line">
              Cerita yang Akan
            </span>

            <span className="hero-title-line">
              Selalu Diingat.
            </span>

          </h1>


          <p className="hero-description">

            Catatan pribadi tentang pengalaman,
            pembelajaran, kesan, dan harapan
            setelah mengikuti rangkaian MABIM
            Universitas Nusa Putra.

          </p>


          <div className="hero-meta">

            <span>
              WISNU PERMANA
            </span>

            <span>·</span>

            <span>
              TEKNIK ELEKTRO
            </span>

            <span>·</span>

            <span>
              2026
            </span>

          </div>

        </div>


        <div
          className="hero-scroll"
          onClick={() =>
            scrollTo('article')
          }
        >

          <span>
            SCROLL TO READ
          </span>

          <span className="scroll-arrow">
            ↓
          </span>

        </div>

      </section>


      {/* =====================================
          ARTICLE
      ===================================== */}

      <main id="article">

        <section className="article-intro section">

          <div className="article-label reveal">
            PERSONAL JOURNAL
          </div>


          <div className="article-header reveal">

            <h2>

              Perjalanan Pertama

              <br />

              di Nusa Putra

            </h2>


            <div className="article-meta">

              <span>
                20 SEPTEMBER 2026
              </span>

              <span>·</span>

              <span>
                8 MIN READ
              </span>

            </div>

          </div>


          <div className="intro-grid">

            <div className="dropcap-text reveal">

              <p>

                Setiap perjalanan memiliki cerita
                pertama. Bagi saya, MABIM bukan hanya
                tentang mengenal lingkungan kampus,
                tetapi tentang bagaimana saya mulai
                memahami tempat baru yang akan menjadi
                bagian dari perjalanan saya.

              </p>

            </div>


            <div className="intro-side reveal">

              <p>

                Ada banyak hal yang sebelumnya hanya
                saya bayangkan tentang kehidupan
                perkuliahan. Namun melalui MABIM,
                semuanya mulai terasa nyata.

              </p>


              <p>

                Bertemu dengan lingkungan baru,
                mengenal teman-teman baru, mengikuti
                berbagai kegiatan, dan mendapatkan
                pengalaman baru membuat saya menyadari
                bahwa menjadi mahasiswa bukan hanya
                tentang hadir di kelas.

              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            FOTO 1
        ===================================== */}

        <section className="full-image-section">

          <div className="image-reveal full-image">

            <img
              src="/images/mabim-1.jpg"
              alt="Kegiatan MABIM"
            />

            <div className="image-caption">
              MABIM 2026 · A NEW BEGINNING
            </div>

          </div>

        </section>


        {/* =====================================
            KESAN
        ===================================== */}

        <section className="story-section section">

          <div className="section-number reveal">
            01
          </div>


          <div className="story-grid">

            <div className="story-title reveal">

              <span>
                KESAN
              </span>

              <h2>

                Hal-hal kecil
                yang menjadi
                cerita besar.

              </h2>

            </div>


            <div className="story-content reveal">

              <p className="lead">

                Mengikuti MABIM memberikan pengalaman
                yang berbeda dari apa yang saya bayangkan
                sebelumnya.

              </p>


              <p>

                Pada awalnya, saya datang dengan rasa
                penasaran sekaligus sedikit canggung
                karena berada di lingkungan yang baru.

              </p>


              <p>

                Namun seiring berjalannya kegiatan,
                suasana tersebut perlahan berubah.

                Saya mulai mengenal teman baru,
                memahami lingkungan kampus, dan
                mendapatkan berbagai pengalaman yang
                mungkin tidak akan saya dapatkan jika
                hanya melihat kehidupan kampus dari luar.

              </p>


              <p>

                Dari kegiatan sederhana hingga interaksi
                dengan orang-orang baru, semuanya
                memberikan kesan tersendiri.

              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            HARAPAN
        ===================================== */}

        <section className="dark-section quote-section">

          <div className="quote-decoration">
            “
          </div>


          <div className="big-quote">

            <span className="small-label">
              HARAPAN
            </span>


            <blockquote>

              “Saya ingin menjadikan masa perkuliahan
              bukan hanya tentang mendapatkan nilai,
              tetapi tentang bertumbuh, berkontribusi,
              dan menemukan versi terbaik dari diri
              sendiri.”

            </blockquote>


            <div className="quote-author">
              — Wisnu Permana
            </div>

          </div>

        </section>


        {/* =====================================
            TRILOGI NUSA PUTRA
        ===================================== */}

        <section
          id="trilogi"
          className="trilogi-section section"
        >

          <div className="section-heading reveal">

            <div className="section-number">
              02
            </div>


            <div>

              <span className="eyebrow">
                NUSA PUTRA
              </span>


              <h2>
                Trilogi Nusa Putra
              </h2>


              <p>

                Tiga nilai yang menjadi bagian dari
                perjalanan mahasiswa Nusa Putra.

              </p>

            </div>

          </div>


          <div className="values">


            {/* VALUE 01 */}

            <article className="value-item">

              <div className="value-number">
                01
              </div>


              <div className="value-content">

                <span>
                  AMOR DEUS
                </span>


                <h3>
                  Cinta kepada Tuhan
                </h3>


                <p>

                  Nilai yang mengingatkan saya untuk
                  tetap memiliki landasan spiritual
                  dan menjadikan setiap proses
                  pembelajaran sebagai bagian dari
                  perjalanan hidup.

                </p>

              </div>


              <span className="value-arrow">
                ↗
              </span>

            </article>


            {/* VALUE 02 */}

            <article className="value-item">

              <div className="value-number">
                02
              </div>


              <div className="value-content">

                <span>
                  PARENTIUM
                </span>


                <h3>
                  Cinta kepada Orang Tua
                </h3>


                <p>

                  Sebuah pengingat bahwa perjalanan
                  pendidikan tidak hanya tentang diri
                  sendiri, tetapi juga tentang menghargai
                  dan membahagiakan orang yang telah
                  mendukung perjalanan kita.

                </p>

              </div>


              <span className="value-arrow">
                ↗
              </span>

            </article>


            {/* VALUE 03 */}

            <article className="value-item">

              <div className="value-number">
                03
              </div>


              <div className="value-content">

                <span>
                  CONSERVATIO
                </span>


                <h3>
                  Cinta kepada Sesama
                </h3>


                <p>

                  Nilai yang mengajarkan pentingnya
                  kepedulian, kontribusi, dan hubungan
                  yang baik dengan lingkungan serta
                  sesama manusia.

                </p>

              </div>


              <span className="value-arrow">
                ↗
              </span>

            </article>


          </div>


          {/* OFFICIAL REFERENCE */}

          <div className="reference reveal">

            <div>

              <span>
                OFFICIAL REFERENCE
              </span>


              <p>

                Informasi mengenai nilai-nilai
                Universitas Nusa Putra dapat
                dibaca melalui halaman resmi
                universitas.

              </p>

            </div>


            <a
              href={NUSA_PUTRA_REFERENCE}
              target="_blank"
              rel="noreferrer"
            >

              Nusa Putra · Our Values

              <span>
                ↗
              </span>

            </a>

          </div>

        </section>


        {/* =====================================
            VISUAL BREAK
        ===================================== */}

        <section className="visual-break">

          <img
            src="/images/mabim-2.jpg"
            alt="Perjalanan MABIM Nusa Putra"
          />


          <div className="visual-break-text">

            <span>
              A NEW PLACE.
            </span>

            <span>
              A NEW CHAPTER.
            </span>

            <span>
              A NEW BEGINNING.
            </span>

          </div>

        </section>


        {/* =====================================
            REFLECTION
        ===================================== */}

        <section
          id="reflection"
          className="reflection section"
        >

          <div className="section-number reveal">
            03
          </div>


          <div className="reflection-content">

            <span className="eyebrow reveal">
              REFLECTION
            </span>


            <h2 className="reveal">

              MABIM mengajarkan saya
              bahwa memulai tidak harus
              <em> sempurna.</em>

            </h2>


            <div className="reflection-text reveal">

              <p>

                Setiap orang datang dengan cerita yang
                berbeda. Ada yang sudah memiliki banyak
                pengalaman, ada pula yang baru pertama
                kali benar-benar mengenal dunia
                perkuliahan.

              </p>


              <p>

                Saya menyadari bahwa tidak semua hal
                harus langsung dipahami pada hari pertama.
                Ada proses untuk mengenal, mencoba,
                melakukan kesalahan, kemudian belajar
                kembali.

              </p>


              <p>

                Dan mungkin, justru proses itulah yang
                membuat perjalanan menjadi berarti.

              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            FOTO 3
        ===================================== */}

        <section className="photo-story section">

          <div className="photo-story-grid">

            <div className="photo-story-image image-reveal">

              <img
                src="/images/mabim-3.jpg"
                alt="Mahasiswa MABIM"
              />

            </div>


            <div className="photo-story-copy reveal">

              <span className="eyebrow">
                ONE MORE THING
              </span>


              <h2>

                Lebih dari sekadar
                kegiatan.

              </h2>


              <p>

                MABIM menjadi salah satu halaman
                pertama dari perjalanan saya sebagai
                mahasiswa Teknik Elektro.

                Halaman yang mungkin suatu hari nanti
                akan saya lihat kembali dan mengingat
                bagaimana semuanya bermula.

              </p>

            </div>

          </div>

        </section>


        {/* =====================================
            CLOSING
        ===================================== */}

        <section className="closing-section">

          <div className="closing-content">

            <span className="eyebrow">
              THE END OF THIS CHAPTER
            </span>


            <h2>

              Sampai Jumpa di

              <em>
                Bab Berikutnya.
              </em>

            </h2>


            <p>

              MABIM 2026 menjadi salah satu halaman
              pertama dari perjalanan saya sebagai
              mahasiswa Universitas Nusa Putra.

            </p>


            <p>

              Masih banyak hal yang ingin dipelajari,
              orang yang ingin ditemui, dan pengalaman
              yang ingin diciptakan.

            </p>


            <div className="signature">

              — Wisnu Permana
              <br />

              <small>
                Teknik Elektro
              </small>

            </div>

          </div>

        </section>


        {/* =====================================
            ABOUT
        ===================================== */}

        <section
          id="about"
          className="about section"
        >

          <div className="about-image reveal">

            <img
              src="/images/author.jpg"
              alt="Wisnu Permana"
            />

          </div>


          <div className="about-content reveal">

            <span className="eyebrow">
              ABOUT THE AUTHOR
            </span>


            <h2>
              Wisnu Permana
            </h2>


            <p className="about-role">

              Mahasiswa Teknik Elektro

              <br />

              Universitas Nusa Putra

              <br />

              MABIM 2026

            </p>


            <p>

              Menulis sebagai cara untuk mengingat
              perjalanan, memahami pengalaman, dan
              mendokumentasikan langkah pertama
              sebagai mahasiswa Universitas Nusa Putra.

            </p>


            <div className="socials">

              <a
                href="#"
                aria-label="Instagram"
              >
                IG
              </a>


              <a
                href="#"
                aria-label="LinkedIn"
              >
                IN
              </a>


              <a
                href="mailto:"
                aria-label="Email"
              >
                @
              </a>

            </div>

          </div>

        </section>


        {/* =====================================
            REFERENCES
        ===================================== */}

        <section className="references section">

          <div className="references-heading reveal">

            <span className="eyebrow">
              REFERENCES
            </span>


            <h2>

              Sumber yang
              saya gunakan.

            </h2>

          </div>


          <div className="reference-list reveal">

            <a
              href={NUSA_PUTRA_REFERENCE}
              target="_blank"
              rel="noreferrer"
              className="reference-item"
            >

              <div>

                <span>
                  01 · OFFICIAL WEBSITE
                </span>


                <h3>

                  Universitas Nusa Putra —
                  Our Values

                </h3>

              </div>


              <span className="reference-arrow">
                ↗
              </span>

            </a>

          </div>

        </section>

      </main>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer>

        <div className="footer-top">

          <div className="footer-brand">

            WISNU<span>.</span>

          </div>


          <p>

            MABIM 2026

            <br />

            Teknik Elektro

            <br />

            Universitas Nusa Putra

          </p>

        </div>


        <div className="footer-bottom">

          <span>

            © 2026 Wisnu Permana

          </span>


          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >

            BACK TO TOP ↑

          </button>

        </div>

      </footer>


      {/* =====================================
          FLOATING SHARE
      ===================================== */}

      <div className="share-wrapper">

        <button
          className="share-button"
          onClick={copyLink}
          aria-label="Copy article link"
        >

          {copied ? '✓' : '↗'}

        </button>


        <span
          className={`copy-tooltip ${
            copied ? 'show' : ''
          }`}
        >

          {copied
            ? 'LINK COPIED'
            : 'COPY LINK'}

        </span>

      </div>

    </div>

  )
}

export default App