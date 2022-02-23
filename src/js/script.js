export function closePopUp() { 
        document.addEventListener('click', function(event) {
        let target = event.target;
        let closing = target.closest('.close_window');
        if (!closing) { return };
        let closePopUp = target.closest('.pop_up');
        closePopUp.style.display = "none";
    });
}