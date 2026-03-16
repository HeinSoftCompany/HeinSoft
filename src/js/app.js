document.documentElement.classList.add('js')

const $ = (sel, parent = document) => parent.querySelector(sel)
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)]

/* Year */
const yearEl = $('#year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

/* Elements */
const topbar = $('.topbar')
const burger = $('.burger')
const mobileMenu = $('#mobileMenu')
const quoteModal = $('#quoteModal')
const openers = $$('[data-open-modal="quote"]')
const closers = $$('[data-close-modal]')
const progressBar = $('#progressBar')
const glow = $('#cursorGlow')
const lightSection = $('.projects-lusion')

/* ----------------------------------
   TOPBAR SCROLL + LIGHT SECTION
---------------------------------- */
function updateTopbarState() {
  if (!topbar) return

  if (window.scrollY > 10) topbar.classList.add('is-scrolled')
  else topbar.classList.remove('is-scrolled')
}

function updateTopbarLightState() {
  if (!topbar || !lightSection) return

  const headerHeight = topbar.offsetHeight
  const rect = lightSection.getBoundingClientRect()
  const isBehindHeader = rect.top <= headerHeight && rect.bottom >= headerHeight

  topbar.classList.toggle('is-on-light', isBehindHeader)
}

updateTopbarState()
updateTopbarLightState()

window.addEventListener(
  'scroll',
  () => {
    updateTopbarState()
    updateTopbarLightState()
    updateProgress()
  },
  { passive: true }
)

window.addEventListener('resize', updateTopbarLightState)
window.addEventListener('load', () => {
  updateTopbarState()
  updateTopbarLightState()
  updateProgress()
})

/* ----------------------------------
   MOBILE MENU
---------------------------------- */
function openMobileMenu() {
  if (!burger || !mobileMenu) return

  burger.setAttribute('aria-expanded', 'true')
  mobileMenu.hidden = false

  requestAnimationFrame(() => {
    mobileMenu.classList.add('is-open')
  })

  document.body.style.overflow = 'hidden'
}

function closeMobileMenu() {
  if (!burger || !mobileMenu) return

  burger.setAttribute('aria-expanded', 'false')
  mobileMenu.classList.remove('is-open')

  setTimeout(() => {
    if (burger.getAttribute('aria-expanded') === 'false') {
      mobileMenu.hidden = true
    }
  }, 280)

  document.body.style.overflow = ''
}

function isMobileOpen() {
  return burger?.getAttribute('aria-expanded') === 'true'
}

burger?.addEventListener('click', () => {
  if (isMobileOpen()) closeMobileMenu()
  else openMobileMenu()
})

$$('.mobile__link').forEach((link) => {
  link.addEventListener('click', () => closeMobileMenu())
})

/* ----------------------------------
   REVEAL ON SCROLL
---------------------------------- */
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.12 }
  )

  $$('.reveal').forEach((el) => io.observe(el))
} else {
  $$('.reveal').forEach((el) => el.classList.add('is-visible'))
}

/* ----------------------------------
   QUOTE MODAL
---------------------------------- */
function lockBody() {
  document.body.style.overflow = 'hidden'
}

function unlockBody() {
  if (!isMobileOpen()) {
    document.body.style.overflow = ''
  }
}

function openModal(modal) {
  if (!modal) return
  modal.classList.add('is-open')
  modal.setAttribute('aria-hidden', 'false')
  lockBody()
}

function closeModal(modal) {
  if (!modal) return
  modal.classList.remove('is-open')
  modal.setAttribute('aria-hidden', 'true')
  unlockBody()
}

openers.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault()
    openModal(quoteModal)
  })
})

closers.forEach((btn) => {
  btn.addEventListener('click', () => closeModal(quoteModal))
})

$('#quoteForm')?.addEventListener('submit', (e) => {
  e.preventDefault()

  const form = e.currentTarget
  const fd = new FormData(form)

  const name = (fd.get('name') || '').toString().trim()
  const email = (fd.get('email') || '').toString().trim()
  const project = (fd.get('project') || '').toString().trim()
  const message = (fd.get('message') || '').toString().trim()

  const phone = '5581993193905' // troque pelo seu número

  const projectLabels = {
    'landing-page': 'Landing Page',
    'site-institucional': 'Site Institucional',
    'e-commerce': 'E-commerce',
    'google-maps': 'Google Maps',
    'links-personalizados': 'Links Personalizados',
    'identidade-visual': 'Identidade Visual'
  }

  const projectText = projectLabels[project] || project || 'Não informado'

  const text =
`Olá! Vim pelo site da HeinSoft e quero solicitar um orçamento.

Nome: ${name}
Email: ${email}
Serviço: ${projectText}
Mensagem: ${message || 'Não informada'}`

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`

  window.open(url, '_blank')

  form.reset()
  closeModal(quoteModal)
})

/* ----------------------------------
   ESC KEY
---------------------------------- */
window.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return

  if (quoteModal?.classList.contains('is-open')) closeModal(quoteModal)
  if (isMobileOpen()) closeMobileMenu()
})

/* ----------------------------------
   SCROLL PROGRESS BAR
---------------------------------- */
function updateProgress() {
  if (!progressBar) return

  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const doc = document.documentElement
  const total = doc.scrollHeight - doc.clientHeight || 1
  const pct = Math.min(100, Math.max(0, (scrollTop / total) * 100))

  progressBar.style.width = `${pct}%`
}

/* ----------------------------------
   CURSOR GLOW
---------------------------------- */
let glowT = null

function showGlow() {
  if (!glow) return
  glow.style.opacity = '1'

  if (glowT) clearTimeout(glowT)
  glowT = setTimeout(() => {
    glow.style.opacity = '0'
  }, 900)
}

window.addEventListener(
  'mousemove',
  (e) => {
    if (!glow) return

    const x = (e.clientX / window.innerWidth) * 100
    const y = (e.clientY / window.innerHeight) * 100

    glow.style.setProperty('--mx', `${x}%`)
    glow.style.setProperty('--my', `${y}%`)
    showGlow()
  },
  { passive: true }
)

/* ----------------------------------
   SMOOTH SCROLL WITH HEADER OFFSET
---------------------------------- */
function getHeaderOffset() {
  return (topbar?.getBoundingClientRect().height || 80) + 10
}

$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')
    if (!id || id === '#') return

    const target = document.querySelector(id)
    if (!target) return

    e.preventDefault()

    const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
    window.scrollTo({ top, behavior: 'smooth' })

    closeMobileMenu()
  })
})

/* ----------------------------------
   HOVER PARALLAX
---------------------------------- */
function attachParallax(el, strength = 9) {
  const onMove = (e) => {
    const rect = el.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    const px = mx / rect.width - 0.5
    const py = my / rect.height - 0.5

    const rx = (-py * strength).toFixed(2)
    const ry = (px * strength).toFixed(2)

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`

    const media = el.querySelector('.parallax-media')
    if (media) {
      media.style.transform = `translate(${(px * 8).toFixed(1)}px, ${(py * 8).toFixed(1)}px) translateZ(18px)`
    }
  }

  const onLeave = () => {
    el.style.transform = ''
    const media = el.querySelector('.parallax-media')
    if (media) media.style.transform = ''
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
}

;[
  ...document.querySelectorAll('.service'),
  ...document.querySelectorAll('.project'),
  ...document.querySelectorAll('.about-card'),
  ...document.querySelectorAll('.tcard'),
  ...document.querySelectorAll('.pCard'),
].forEach((card) => {
  card.setAttribute('data-parallax', 'true')
  const img = card.querySelector('img')
  if (img) img.classList.add('parallax-media')
  attachParallax(card, 9)
})

/* ----------------------------------
   IMAGES
---------------------------------- */
document.querySelectorAll('img').forEach((img) => {
  if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy')
  if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async')
})