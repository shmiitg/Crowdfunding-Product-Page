//styles to apply to when modal is displayed
let lg = 'linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1))';
let bright = 'brightness(0.9)';

//select childNodes of body
let bodyChildren = document.body.children;

//Back the project button
let backProjectBtn = document.querySelector('#back-project');

//main modal 
let modal = document.querySelector('.modal');
//cross icon of modal
let modalCloseBtn = document.querySelector('#modal-close');
//each card of the modal
let allModalCards = document.querySelectorAll('.modal-card');
let writePledge = document.querySelectorAll('.pledge-area');
//submit pledge and continue
let submitButton = document.querySelectorAll('.submit-button');

//all radios
let allRadios = document.querySelectorAll('input[name="card-radio"]');
let blockedRadio = document.querySelector('input[name="modal-card-block"]');

//select radio from reward button
let handlers = [];
let rewardBtn = document.querySelectorAll('.reward-btn');

//success message box
let successBox = document.querySelector('.success');
let closeSuccessBox = document.querySelector('#success-close');

//take note to current count
let counter = document.querySelectorAll('.count');

//media navbar
let mediaBarImg = document.querySelector('.media-bar').children[0];
let mediaNav = document.querySelector('.media-nav');
let mediaSelected = false;


let mediaBarToggle = () => {
    if (mediaSelected) {
        mediaSelected = false;
        mediaNav.style.display = 'none';
        mediaBarImg.setAttribute('src', 'images/icon-hamburger.svg');
    }
    else {
        mediaSelected = true;
        mediaNav.style.display = 'flex';
        mediaBarImg.setAttribute('src', 'images/icon-close-menu.svg');
    }
}

mediaBarImg.addEventListener('click', mediaBarToggle);


//Open the modal functionality
let openModal = () => {
    mediaSelected = false;
    mediaNav.style.display = 'none';
    mediaBarImg.setAttribute('src', 'images/icon-hamburger.svg');
    mediaBarImg.removeEventListener('click', mediaBarToggle);

    [...bodyChildren].forEach(element => {
        if (!element.classList.contains('modal'))
            element.style.filter = bright;
    })
    document.body.style.backgroundImage = lg;

    modal.style.display = 'initial';

    for (let i = 0; i < rewardBtn.length; i++) {
        rewardBtn[i].removeEventListener('click', handlers[i]);
    }
    handlers = [];
}

backProjectBtn.addEventListener('click', openModal);


//close the modal functionality
let closeModal = () => {
    mediaBarImg.addEventListener('click', mediaBarToggle);

    [...bodyChildren].forEach(element => element.style.filter = 'initial');
    document.body.style.backgroundImage = 'initial';

    modal.style.display = 'none';
    writePledge.forEach(pledge => pledge.children[0].value = '');
    allRadios.forEach(radio => radio.checked = false);
    checkForCheckedRadios();
    rewardBtnCheck();
}

modalCloseBtn.addEventListener('click', closeModal);


//if radio is checked
let radioCheck = allRadios.forEach((radio, index) => {
    radio.addEventListener('click', () => {
        radio.checked = true;
        checkForCheckedRadios();
    })
});

//trying to check blocked radio 
blockedRadio.addEventListener('click', () => {
    if (blockedRadio.checked)
        blockedRadio.checked = false;
});


//check for selected radio
function checkForCheckedRadios() {
    allRadios.forEach((radio, index) => {
        if (radio.checked) {
            pledgeArea(index, true);
        }
        else {
            pledgeArea(index, false);
        }
    })
}


//open the selected pledge area and close the rest
function pledgeArea(index, open) {
    let ancestor = allRadios[index];
    while (!ancestor.classList.contains('modal-card'))
        ancestor = ancestor.parentElement;

    [...ancestor.children].forEach((child, index) => {
        if (child.classList.contains('modal-card-bottom'))
            if (open) child.style.display = 'flex';
            else {
                child.style.display = 'none';
            }
    });
}


//reward button functionality
rewardBtnCheck();

function rewardBtnCheck() {
    for (let i = 0; i < rewardBtn.length; i++) {
        if (rewardBtn[i].innerHTML === 'Out of Stock') continue;
        let wrapper = rewardBtnRadioCheck.bind(this, i);
        handlers.push(wrapper);
        rewardBtn[i].addEventListener('click', wrapper);
    }
}

function rewardBtnRadioCheck(i) {
    openModal();
    allRadios[i + 1].checked = true;
    let yOffset = -100;
    let y = allModalCards[i + 1].getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    checkForCheckedRadios();
}


let toggleSuccessMsg = (successMsgAppears) => {
    if (successMsgAppears) {
        closeModal();
        successBox.style.display = 'none';
        [...bodyChildren].forEach(element => element.style.filter = 'initial');
        document.body.style.backgroundImage = 'initial';
    }
    else {
        closeModal();
        mediaBarImg.removeEventListener('click', mediaBarToggle);
        successBox.style.display = 'flex';
        [...bodyChildren].forEach(element => {
            if (element.classList.contains('success')) element.style.filter = 'initial';
            else element.style.filter = bright;
        });
        document.body.style.backgroundImage = lg;
        let yOffset = -150;
        let y = successBox.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        for (let i = 0; i < rewardBtn.length; i++) {
            rewardBtn[i].removeEventListener('click', handlers[i]);
        }
        handlers = [];
    }
}

//when continue button is pressed
submitButton.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        console.log('clicked');
        toggleSuccessMsg(false);
        if (index === 0) return;
        let card = allModalCards[index];
        let cnt = counter[index - 1].innerHTML;
        cnt--;
        console.log(cnt);
        card.children[2].children[0].innerHTML = cnt;
        card.children[0].children[1].children[0].children[2].children[0].innerHTML = cnt;
        counter[index - 1].innerHTML = cnt;
    })
});

closeSuccessBox.addEventListener('click', toggleSuccessMsg.bind(true));


