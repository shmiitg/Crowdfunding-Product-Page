let bodyChildren = document.body.children;
let lg = 'linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.1))';
let bright = 'brightness(0.9)';

let backProject = document.querySelector('#back-project');
let modal = document.querySelector('.modal');
let modalClose = document.querySelector('#modal-close');
let modalCard = document.querySelectorAll('.modal-card');
let rewardBtn = document.querySelectorAll('.reward-btn');

let getSelectedRadio = document.querySelectorAll('input[name="card-radio"]');

let pledgeArea = document.querySelectorAll('.pledge-area');
let submitButton = document.querySelectorAll('.submit-button');
let blockedRadio = document.querySelector('input[name="modal-card-block"]');

let mediaBarImg = document.querySelector('.media-bar').children[0];
let mediaNav = document.querySelector('.media-nav');
let mediaSelected = false;

let success = document.querySelector('.success');
let closeSuccess = document.querySelector('#success-close');
let successSelected = false;


// Toggle Navbar for media

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


// Open the modal

let openModal = () => {
    [...bodyChildren].forEach(element => {
        if (!element.classList.contains('modal'))
            element.style.filter = bright;
    });
    document.body.style.backgroundImage = lg;
    mediaSelected = false;
    mediaNav.style.display = 'none';
    mediaBarImg.setAttribute('src', 'images/icon-hamburger.svg');
    mediaBarImg.removeEventListener('click', mediaBarToggle);
    modal.style.display = 'initial';
}
backProject.addEventListener('click', openModal);


// close the modal

let closeModal = () => {
    [...bodyChildren].forEach(element => element.style.filter = 'initial');
    document.body.style.backgroundImage = 'initial';
    modal.style.display = 'none';
    modalCard.forEach(card => {
        [...card.children].forEach(child => {
            if (child.classList.contains('modal-card-bottom')) {
                child.style.display = 'none';
            }
        })
    });
    getSelectedRadio.forEach((radio => {
        radio.checked = false;
    }));
    mediaBarImg.addEventListener('click', mediaBarToggle);
}
modalClose.addEventListener('click', closeModal);


// radio check and submit

let toggleSuccessMsg = (successSelected) => {
    if (successSelected) {
        success.style.display = 'none';
        [...bodyChildren].forEach(element => element.style.filter = 'initial');
        document.body.style.backgroundImage = 'initial';
    }
    else {
        success.style.display = 'flex';
        [...bodyChildren].forEach(element => {
            if (!element.classList.contains('success')) element.style.filter = bright;
        });
        document.body.style.backgroundImage = lg;
    }
}


//get radio from select reward

function cardIsChecked(card) {
    while (!card.classList.contains('modal-card')) {
        card = card.parentElement;
    }
    [...card.children].forEach(child => {
        if (child.classList.contains('modal-card-bottom')) {
            child.style.display = 'flex';
        }
    });
}



// add submit button functionality

function addSubmitButton(index) {
    submitButton[index].addEventListener('click', () => {
        pledgeArea[index].children[0].value = '';
        closeModal();
        toggleSuccessMsg(false);
    }, { once: true });
}


//select a reward from main page

let rewardBtnClicked = rewardBtn.forEach((reward, index) => {
    reward.addEventListener('click', () => {
        openModal();
        let radioIndex = getSelectedRadio[index + 1];
        radioIndex.checked = true;
        cardIsChecked(radioIndex);
        addSubmitButton(index + 1);
    });
});

radioCheck();

function radioCheck() {
    getSelectedRadio.forEach((card, index) => {
        card.addEventListener('click', () => {

            if (card.checked) {
                let ancestor = card;
                while (!ancestor.classList.contains('modal-card'))
                    ancestor = ancestor.parentElement;

                [...ancestor.children].forEach(child => {
                    if (child.classList.contains('modal-card-bottom'))
                        child.style.display = 'flex';
                });

                addSubmitButton(index);
            }

            getSelectedRadio.forEach((element, idx) => {
                if (idx !== index) {
                    let ancestor = element;
                    while (!ancestor.classList.contains('modal-card'))
                        ancestor = ancestor.parentElement;

                    [...ancestor.children].forEach(child => {
                        if (child.classList.contains('modal-card-bottom')) {
                            child.style.display = 'none';
                            child.children[0].children[0].value = '';
                        }
                    })
                }
            });
        });
    });

    blockedRadio.addEventListener('click', () => {
        if (blockedRadio.checked)
            blockedRadio.checked = false;
    });
}

// remove success message
closeSuccess.addEventListener('click', toggleSuccessMsg.bind(true));
