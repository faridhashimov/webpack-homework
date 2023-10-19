import './main.scss'
import sun from './assets/icons/sun.svg'
import rain from './assets/icons/cloud-rain.svg'
import snow from './assets/icons/cloud-snow.svg'
import pause from './assets/icons/pause.svg'
import rainyBg from './assets/rainy-bg.jpg'
import summerBg from './assets/summer-bg.jpg'
import winterBg from './assets/winter-bg.jpg'
import summerMp3 from './assets/sounds/summer.mp3'
import rainMp3 from './assets/sounds/rain.mp3'
import winterMp3 from './assets/sounds/winter.mp3'

const btn = document.querySelectorAll('.btn') as NodeListOf<Element>
const bg = document.querySelector('.bg') as HTMLElement
const volume = document.getElementById('volume') as HTMLInputElement
const summerSvg = document.getElementById('summer') as HTMLImageElement
const rainSvg = document.getElementById('rain') as HTMLImageElement
const winterSvg = document.getElementById('winter') as HTMLImageElement

summerSvg.src = sun
rainSvg.src = rain
winterSvg.src = snow

let audio = new Audio(summerMp3) as HTMLAudioElement
let currentSound: string

function loadSound(id: string): void {
    audio =
        id === 'summer'
            ? new Audio(summerMp3)
            : id === 'rain'
            ? new Audio(rainMp3)
            : new Audio(winterMp3)
}

function playSound(): void {
    audio.pause()
    audio.play()
}

function pauseSound(): void {
    audio.pause()
}

function changeBg(id: string): void {
    bg.style.background =
        id === 'summer'
            ? `url(${summerBg}) center center no-repeat`
            : id === 'rain'
            ? `url(${rainyBg}) center center no-repeat`
            : `url(${winterBg}) center center no-repeat`
}

btn.forEach((item) => {
    item.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement
        const attribute = target.getAttribute('data-id') as string
        const aduioEl = document.getElementById(attribute) as HTMLAudioElement
        const isPlaying: boolean = target.classList.contains('play')
        if (isPlaying) {
            target.classList.remove('play')
            pauseSound()
            addSvg(attribute)
        } else {
            btn.forEach((item) => {
                const attribute = item.getAttribute('data-id') as string
                item.classList.remove('play')
                addSvg(attribute)
            })
            target.classList.add('play')
            aduioEl.src = pause
            if (currentSound !== target.getAttribute('data-id')) {
                pauseSound()
                loadSound(attribute)
            }
            changeBg(attribute)
            playSound()
            currentSound = attribute
        }
    })
})

function addSvg(id: string): void {
    const img = document.getElementById(id) as HTMLImageElement
    img!.src = id === 'summer' ? sun : id === 'rain' ? rain : snow
}

function changeVolume(e: Event): void {
    const target = e.currentTarget as HTMLInputElement
    const value: number = Number(target.value)
    audio.volume = value / 100
}

volume.addEventListener('change', (e: Event) => {
    changeVolume(e)
})
