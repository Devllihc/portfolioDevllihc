class TitleScramble {
  constructor(prefix = '', fps = 30) {
    this.prefix = prefix
    this.text = ''
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.queue = []
    this.frame = 0
    this.fps = fps
    this.state = 'idle' // 'idle' | 'scrambling' | 'holding'
    this.holdTicks = 0
    this.onHoldDone = null

    // Worker chỉ gửi "tick" đều đặn, không bị throttle ở tab nền
    const src = `setInterval(() => postMessage(0), ${Math.round(1000 / fps)})`
    this.worker = new Worker(URL.createObjectURL(new Blob([src])))
    this.worker.onmessage = () => this.tick()
  }

  setText(newText, holdMs = 2500) {
    const oldText = this.text
    const length = Math.max(oldText.length, newText.length)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const start = Math.floor(Math.random() * 20)
      const end = start + Math.floor(Math.random() * 20)
      this.queue.push({ from: oldText[i] || '', to: newText[i] || '', start, end, char: '' })
    }
    this.frame = 0
    this.holdTicks = Math.round((holdMs / 1000) * this.fps)
    this.state = 'scrambling'
    return new Promise((resolve) => (this.onHoldDone = resolve))
  }

  tick() {
    if (this.state === 'scrambling') {
      this.renderFrame()
    } else if (this.state === 'holding') {
      if (--this.holdTicks <= 0) {
        this.state = 'idle'
        this.onHoldDone && this.onHoldDone()
      }
    }
  }

  renderFrame() {
    let output = ''
    let complete = 0
    for (const item of this.queue) {
      const { from, to, start, end } = item
      if (this.frame >= end) { complete++; output += to }
      else if (this.frame >= start) {
        if (!item.char || Math.random() < 0.28) item.char = this.randomChar()
        output += item.char
      } else output += from
    }
    // Trang khác (Archive, 404...) tự đặt title riêng: không ghi đè
    if (document.title.startsWith(this.prefix)) document.title = this.prefix + output

    if (complete === this.queue.length) {
      this.text = this.queue.map((q) => q.to).join('') // chốt chuỗi sạch
      this.state = 'holding'
    } else {
      this.frame++
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

if (
  window.Worker &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  const words = ['Frontend Dev', 'Software Dev', 'Web Developer']
  const fx = new TitleScramble('Devllihc · ')
  fx.text = words[0] // khớp với <title> trong HTML

  let i = 0
  const next = () => {
    i = (i + 1) % words.length
    fx.setText(words[i], 2500).then(next) // xong từ này thì chuyển từ kế
  }

  // Giữ từ đầu tiên 2,5 giây (75 tick ở 30 khung/giây) rồi mới đổi
  fx.state = 'holding'
  fx.holdTicks = 75
  fx.onHoldDone = next
}
