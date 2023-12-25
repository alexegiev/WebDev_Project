export function initButtonFunctionality(){

    // Find the button element
    const button = document.querySelector('button');

    // Add onclick event listener
    button.addEventListener('click', handleClick);

    // Define the function to be called
    function handleClick() {
        console.log('Button clicked');
    }
}