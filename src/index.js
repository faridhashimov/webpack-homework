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

const btn = document.querySelectorAll('.btn')
const bg = document.querySelector('.bg')
const volume = document.getElementById('volume')
const summerSvg = document.getElementById('summer')
const rainSvg = document.getElementById('rain')
const winterSvg = document.getElementById('winter')

summerSvg.src = sun
rainSvg.src = rain
winterSvg.src = snow

let audio = new Audio(summerMp3)
let currentSound

function loadSound(id) {
    audio =
        id === 'summer'
            ? new Audio(summerMp3)
            : id === 'rain'
            ? new Audio(rainMp3)
            : new Audio(winterMp3)
}

function playSound() {
    audio.pause()
    audio.play()
}

function pauseSound() {
    audio.pause()
}

function changeBg(id) {
    bg.style.background =
        id === 'summer'
            ? `url(${summerBg}) center center no-repeat`
            : id === 'rain'
            ? `url(${rainyBg}) center center no-repeat`
            : `url(${winterBg}) center center no-repeat`
}

btn.forEach((item) => {
    item.addEventListener('click', (e) => {
        const isPlaying = e.target.classList.contains('play')
        if (isPlaying) {
            e.target.classList.remove('play')
            pauseSound()
            addSvg(e.target.getAttribute('data-id'))
        } else {
            btn.forEach((item) => {
                item.classList.remove('play')
                addSvg(item.getAttribute('data-id'))
            })
            e.target.classList.add('play')
            document.getElementById(e.target.getAttribute('data-id')).src =
                pause
            if (currentSound !== e.target.getAttribute('data-id')) {
                pauseSound()
                loadSound(e.target.getAttribute('data-id'))
            }
            changeBg(e.target.getAttribute('data-id'))
            playSound()
            currentSound = e.target.getAttribute('data-id')
        }
    })
})

function addSvg(id) {
    document.getElementById(id).src =
        id === 'summer' ? sun : id === 'rain' ? rain : snow
}

function changeVolume(e) {
    audio.volume = e.currentTarget.value / 100
}

volume.addEventListener('change', (e) => {
    changeVolume(e)
})
