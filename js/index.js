'use strict'

//STORE contains tiles info for <a> links tiles, it does not contain the about-us tile, that one is appended separately
const STORE = [
    {
        id: 0,
        title: 'Flooent Legal',
        href: 'http://www.flooentlegal.com/',
        tileIcon: 'img/FlooentLegal-Icon.svg',
        tileText: 'img/FlooentLegal-Text.svg'
    },
    {
        id: 1,
        title: 'Flooent MD',
        href: 'http://flooentmd.com/',
        tileIcon: 'img/FlooentMD-Icon.svg',
        tileText: 'img/FlooentMD-Text.svg'
    },
    {
        id: 2,
        title: 'About Us',
        href: '',
        tileIcon: 'img/FlooentGray.svg',
        tileText: 'img/AboutUs.svg'
    },
    {
        id: 3,
        title: 'Flooent Edu',
        href: '',
        tileIcon: 'img/FlooentEdu-Icon.svg',
        tileText: 'img/FlooentEdu-Text.svg'
    },
    {
        id: 4,
        title: 'Flooent Fin',
        href: '',
        tileIcon: 'img/FlooentFin-Icon.svg',
        tileText: 'img/FlooentFin-Text.svg'
    },

]  

//change the address of the animation to wherever your animation is hosted. Right now they point to the same movie, but the dimensions should hold so that a 1x1 aspect ration works in mobile and 16x9 works in desktop.  Change the aboutUsText to say whatever copy you'd like in that element.
const videoData = {
    mp4LinkMobile: 'img/video/Flooent-Technology-480p.mp4',
    mp4LinkDesktop: 'img/video/Flooent-Technology-720p.mp4',
    aboutUsText: 'This is Flooent Technical Translation in action'
}

//the two video tags hold the info for your videos (desktop & mobile). You may need some configuration depending on your video type (is it mp4 as stated here? do you want it muted?). If you want a still image to show while the video is downloading it can go in the poster attribute.
const aboutUsModalHTML =  `
    <video autoplay="autoplay" class="about-us-video about-us-video-desktop-view" playsinline="playsinline" muted="muted" poster="" loop>
        <source src="${videoData.mp4LinkDesktop}" type="video/mp4">
    </video> 
    <video autoplay="autoplay" class="about-us-video about-us-video-mobile-view" playsinline="playsinline" muted="muted" poster="" loop>
        <source src="${videoData.mp4LinkMobile}" type="video/mp4">
    </video> 
    <h2 class="about-us-modal-text">${videoData.aboutUsText}</h2>
    <button class="close-this-modal" aria-label="Close">
        &#10005;
    </button>
    `
const flEduModalInner = `
    <img src="img/FlooentEdu-Icon.svg" alt="Flooent Edu education translation services">
    <img src="img/FlooentEdu-Text.svg" alt="Flooent Edu is coming soon">
    <h2 class="sr-only">FlooentEDU</h2>
    <p>Is Coming Soon</p>
    <button class="close-this-modal" aria-label="Close">
            &#10005;
    </button>
`
const flFinModalInner = `
    <img src="img/FlooentFin-Icon.svg" alt="Flooent Financial translation services">
    <img src="img/FlooentFin-Text.svg" alt="Flooent Financial is under construction">
    <h2 class="sr-only">FlooentFin</h2>
    <p>Is Under Construction</p>
    <button class="close-this-modal" aria-label="Close">
            &#10005;
    </button>
`

// Don't touch the stuff below unless you know what you're doing! Mostly jQuery below, some vanilla JS.
let modalIsActive = false;

function closeAboutUs(){
    $('.about-us-tile').on('click', 'button', event => {
        event.stopPropagation();
        modalIsActive = false;
        $('.about-us-modal > *').fadeOut(550).delay(800)
        $('.about-us-modal').addClass('shrink').delay(800)
        setTimeout(() => {
            $('.tile-container').empty(500);
            loadLinkTiles()
            // $('.tile-container').fadeOut(500);
            // $('.about-us-tile').fadeOut(500);
        }, 300)
    })
}

//About Us tile needs to have the {id: 2} in the STORE array
function aboutUsDisplay(){
    $('#tile-2').addClass('about-us-tile').removeClass('tile-link');
    $('.about-us-tile').on('click', () => {
        modalIsActive = true;
        setTimeout(() => {
            $('.about-us-tile').addClass('about-us-modal');
            $('.tile-link').hide(500);
            // $('.about-us-tile > *').hide()
            $('.about-us-modal').html(
                `
                    ${aboutUsModalHTML}
                `);
        }, 145);
    })
    closeAboutUs()
}


function onCloseModalClick(){
    $('.close-this-modal').click(() => {
        modalIsActive = false;
        $('.modal').fadeOut(500)
        $('.tile-container').fadeIn(200)
    })
}

function onFlooentEDUClick(){
    $('.tile-container').on('click', '#tile-3', () => {
        $('.modal-inner').html(`
            ${flEduModalInner}
        `)
        modalIsActive = true;
        $('.tile-container').fadeOut(500)
        $('.modal').fadeIn(500)
        onCloseModalClick();
    })
}
function onFlooentFINClick(){
    $('.tile-container').on('click', '#tile-4', () => {
        $('.modal-inner').html(`
            ${flFinModalInner}
        `)
        modalIsActive = true;
        $('.tile-container').fadeOut(500)
        $('.modal').fadeIn(500)
        onCloseModalClick();
    })
}

function loadLinkTiles(){
    $('.tile-container').fadeIn(600).css('display', 'flex');
    STORE.forEach(tile => {
        const { id, href, title, tileIcon, tileText } = tile;
        const linkAttr = href.length ? 'href' : 'name';
        $(".tile-container").append(
            `<a style="order: ${id}" class="tile-link card" id="tile-${id}" ${linkAttr}="${href}" title="${title}"  target="_blank">
                <div class="tile tile-hover-fx tile-box-shadow" id="${id}">
                    <img class="tile-icon" src=${tileIcon} alt=${title}/>
                    <img class="tile-text" src=${tileText} alt=${title}/>
                </div>
            </a>`
        )
    })

    aboutUsDisplay();
    onFlooentEDUClick();
    onFlooentFINClick();
}


$(loadLinkTiles);
