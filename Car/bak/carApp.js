import { initTimer, notifyOwner, showPhoneInput, submitPhoneNumber } from './moveCar.js';

document.addEventListener('DOMContentLoaded', () => {
    initTimer();

    document.getElementById('notifyButton').addEventListener('click', notifyOwner);
    document.getElementById('callButton').addEventListener('click', showPhoneInput);
    document.getElementById('submitButton').addEventListener('click', submitPhoneNumber);
});