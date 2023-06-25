import axios from "axios"
import ClipboardJS from "clipboard";

const mobileNav = document.querySelector('.navigation')
const navToggle = document.querySelector('.mobile-navigation-toggle');

// LISTEN FOR A CLICK EVENT ON MOBILE MENU TOGGLE
navToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
})

const form = document.querySelector('#form')
let userInputField = document.querySelector('.input');
let parent = document.querySelector('#parent');
let urlList = document.querySelector('.url-list');

const shortenUrlLink  = async () => {
    try{
        let originalLink = userInputField.value;
        if (originalLink === "") {
            errorMessage();
        }else {
            let urlLink = `https://api.shrtco.de/v2/shorten?url=${originalLink}`;
            const response = await axios.get(urlLink)
            createListElement(response, originalLink);
        }
    }

    catch(e) {
        console.log('Error:', e)
    }
}

const errorMessage = () => {
     userInputField.setAttribute('placeholder', 'Input field is empty!');
}

const createListElement = (response, originalLink) => {
    let newLi = document.createElement('li');
    newLi.className = 'new-list';

    let div = document.createElement('div');
    div.className = 'list-copy-container';
    div.innerHTML = `<a href="${response.data.result.full_short_link}" target="_blank">
    ${response.data.result.full_short_link}</a><button class="copy-button" data-clipboard-text="${response.data.result.full_short_link}</">copy</button>`

    newLi.append(originalLink, div);
    parent.prepend(newLi);
    userInputField.value = '';

    let copyButton = document.querySelector('.copy-button');
    copyShortenedUrl(copyButton)
}

//copy url to users clipboard when copyButton is clicked
const copyShortenedUrl = (copyButton) => {
    copyButton.addEventListener('click', () => {
        new ClipboardJS('copybutton');
        copyButton.innerText = 'copied!';
    })
}

//when user clicks on submit button, shorten provided url
form.addEventListener('submit', (e) => {
    e.preventDefault()
    shortenUrlLink();
})
