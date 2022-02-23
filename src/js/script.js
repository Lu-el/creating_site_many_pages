export function closePopUp() { 
        document.addEventListener('click', function(event) {
        let target = event.target;
        let closing = target.closest('.close_window');
        if (!closing) { return };
        let closePopUp = target.closest('.pop_up');
        closePopUp.style.display = "none";
    });
}

export function openPopUp() {
    const button = document.querySelector('.leave_request_btn');
    button.addEventListener('click', function(){
        const popUpBkg = document.querySelector('.pop_up_request_first');
        const popUpWindow = document.querySelector('.pop_up_request');
        popUpBkg.style.display = 'block';
        popUpWindow.style.display = 'block';   
    })
}