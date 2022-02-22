// let closing = document.querySelectorAll('.close_window');
// console.log(closing);

function closePopUp(event) {
    let target = event.target;
    let closing = target.closest('.close_window');
    if (!closing) { return };
    let closePopUp = target.closest('.pop_up');
    closePopUp.style.display = "none";
}

document.addEventListener('click', closePopUp);