import { gsap } from 'gsap'
import { toPng } from 'html-to-image'
import './styles.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="workspace">
    <header class="topbar">
      <div>
        <p class="product">XHS Motion Template</p>
        <h1>小红书 3:4 动画图文模版</h1>
      </div>
      <div class="actions">
        <button class="icon-button" data-action="restart" title="重新播放动画" aria-label="重新播放动画">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4v6h6"/><path d="M20 12a8 8 0 1 1-2.34-5.66L4 20"/></svg>
        </button>
        <button class="primary" data-action="export">导出高清 PNG</button>
        <button class="secondary" data-action="codepen">打开 CodePen</button>
      </div>
    </header>

    <section class="stage-layout">
      <aside class="panel left-panel">
        <h2>内容</h2>
        <label>
          标题
          <textarea data-bind="title" rows="3">3 个习惯，让你的周末变得更松弛</textarea>
        </label>
        <label>
          副标题
          <input data-bind="subtitle" value="生活方式 / 灵感清单 / 自我更新" />
        </label>
        <label>
          封面标签
          <input data-bind="tagline" value="周末重启计划" />
        </label>
        <label>
          品牌/账号
          <input data-bind="brand" value="@Aili Notes" />
        </label>
      </aside>

      <section class="canvas-wrap" aria-label="小红书图文画布">
        <div class="poster-shell">
        <article class="poster" id="poster">
          <div class="poster-bg"></div>
          <div class="grain"></div>
          <div class="poster-header">
            <span class="tag" data-field="tagline">周末重启计划</span>
            <span class="brand" data-field="brand">@Aili Notes</span>
          </div>
          <h2 class="poster-title" data-field="title">3 个习惯，让你的周末变得更松弛</h2>
          <p class="poster-subtitle" data-field="subtitle">生活方式 / 灵感清单 / 自我更新</p>

          <div class="hero-photo" role="img" aria-label="生活方式高清图片区域">
            <div class="sun"></div>
            <div class="window-card">
              <span></span>
              <strong>slow morning</strong>
            </div>
            <div class="cup"></div>
            <div class="book"></div>
            <div class="leaf leaf-one"></div>
            <div class="leaf leaf-two"></div>
          </div>

          <div class="tips">
            <section class="tip">
              <span>01</span>
              <div>
                <h3>先清空待办</h3>
                <p>把脑内任务写成 3 条以内，降低启动阻力。</p>
              </div>
            </section>
            <section class="tip">
              <span>02</span>
              <div>
                <h3>保留一段离线时间</h3>
                <p>不用回复所有消息，给注意力留白。</p>
              </div>
            </section>
            <section class="tip">
              <span>03</span>
              <div>
                <h3>记录一个微小进步</h3>
                <p>让周末不只是休息，也有可见的复原感。</p>
              </div>
            </section>
          </div>

          <footer class="poster-footer">
            <span>收藏后慢慢做</span>
            <span>1080 × 1440</span>
          </footer>
        </article>
        </div>
      </section>

      <aside class="panel right-panel">
        <h2>动画</h2>
        <label>
          节奏
          <select data-control="tempo">
            <option value="0.85">轻快</option>
            <option value="1.15" selected>舒缓</option>
            <option value="1.45">慢速</option>
          </select>
        </label>
        <label>
          导出倍率
          <select data-control="scale">
            <option value="2">2x</option>
            <option value="3" selected>3x</option>
            <option value="4">4x</option>
          </select>
        </label>
        <div class="swatches" aria-label="配色">
          <button class="swatch coral active" data-theme="coral" title="珊瑚红"></button>
          <button class="swatch sage" data-theme="sage" title="鼠尾草绿"></button>
          <button class="swatch ink" data-theme="ink" title="墨黑"></button>
        </div>
        <div class="library">
          <h3>CodePen 云端灵感库</h3>
          <a href="https://codepen.io/search/pens?q=gsap%20text%20animation" target="_blank" rel="noreferrer">GSAP 文字动画</a>
          <a href="https://codepen.io/search/pens?q=editorial%20poster%20animation" target="_blank" rel="noreferrer">图文海报动效</a>
          <a href="https://codepen.io/search/pens?q=social%20media%20template" target="_blank" rel="noreferrer">社媒模板排版</a>
        </div>
      </aside>
    </section>
  </main>
`

const poster = document.querySelector('#poster')
const canvasWrap = document.querySelector('.canvas-wrap')
let timeline

const updatePosterScale = () => {
  const availableWidth = Math.max(window.innerWidth - 48, 280)
  const scale = Math.min(1, availableWidth / 540)
  canvasWrap.style.setProperty('--poster-scale', scale.toFixed(4))
}

const animatePoster = () => {
  timeline?.kill()
  const tempo = Number(document.querySelector('[data-control="tempo"]').value)
  gsap.set('.poster-title, .poster-subtitle, .tag, .brand, .hero-photo, .tip, .poster-footer', {
    clearProps: 'all'
  })

  timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
  timeline
    .from('.tag', { y: -20, opacity: 0, duration: 0.5 * tempo })
    .from('.brand', { y: -20, opacity: 0, duration: 0.5 * tempo }, '<0.08')
    .from('.poster-title', { y: 38, opacity: 0, duration: 0.7 * tempo }, '-=0.16')
    .from('.poster-subtitle', { y: 18, opacity: 0, duration: 0.45 * tempo }, '-=0.28')
    .from('.hero-photo', { scale: 0.94, rotate: -1.5, opacity: 0, duration: 0.8 * tempo }, '-=0.18')
    .from('.tip', { y: 28, opacity: 0, stagger: 0.13 * tempo, duration: 0.5 * tempo }, '-=0.3')
    .from('.poster-footer', { opacity: 0, y: 16, duration: 0.4 * tempo }, '-=0.1')

  gsap.to('.sun', {
    y: 12,
    x: -8,
    duration: 3.4 * tempo,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
}

const updateText = (key, value) => {
  document.querySelector(`[data-field="${key}"]`).textContent = value
}

document.querySelectorAll('[data-bind]').forEach((input) => {
  input.addEventListener('input', () => updateText(input.dataset.bind, input.value))
})

document.querySelector('[data-control="tempo"]').addEventListener('change', animatePoster)

document.querySelectorAll('[data-theme]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-theme]').forEach((item) => item.classList.remove('active'))
    button.classList.add('active')
    poster.dataset.theme = button.dataset.theme
    animatePoster()
  })
})

document.querySelector('[data-action="restart"]').addEventListener('click', animatePoster)

document.querySelector('[data-action="export"]').addEventListener('click', async (event) => {
  const button = event.currentTarget
  button.disabled = true
  button.textContent = '正在导出...'
  timeline?.pause(0)
  const scale = Number(document.querySelector('[data-control="scale"]').value)
  const dataUrl = await toPng(poster, {
    cacheBust: true,
    pixelRatio: scale,
    backgroundColor: getComputedStyle(poster).backgroundColor
  })
  const link = document.createElement('a')
  link.download = `xhs-template-${scale}x.png`
  link.href = dataUrl
  link.click()
  button.disabled = false
  button.textContent = '导出高清 PNG'
})

document.querySelector('[data-action="codepen"]').addEventListener('click', () => {
  const data = {
    title: 'XHS Animated 3:4 Template',
    html: poster.outerHTML,
    css: '@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;800&display=swap");\\n/* Paste src/styles.css from the local project for the full design. */',
    js: 'gsap.from(".poster-title", { y: 36, opacity: 0, duration: .8, ease: "power3.out" });',
    js_external: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js'
  }
  const form = document.createElement('form')
  form.action = 'https://codepen.io/pen/define'
  form.method = 'POST'
  form.target = '_blank'
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'data'
  input.value = JSON.stringify(data)
  form.append(input)
  document.body.append(form)
  form.submit()
  form.remove()
})

window.addEventListener('resize', updatePosterScale)
updatePosterScale()
animatePoster()
