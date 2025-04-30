const COUNTDOWN_DURATION = 180; // 3分钟 = 180秒
const timerElement = document.getElementById('timer');
const callButton = document.getElementById('callButton');
let timeLeft;

export function initTimer() {
    const startTime = localStorage.getItem('callButtonStartTime');
    const currentTime = new Date().getTime();
    
    if (!startTime) {
        callButton.disabled = true;
        return;
    }
    
    const elapsedSeconds = Math.floor((currentTime - parseInt(startTime)) / 1000);
    timeLeft = Math.max(0, COUNTDOWN_DURATION - elapsedSeconds);
    
    if (timeLeft === 0) {
        callButton.disabled = false;
        callButton.textContent = '拨打车主电话';
        timerElement.style.display = 'none';
        return;
    }
    
    timerElement.style.display = 'inline';
    updateTimer();
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerElement.textContent = `(${minutes}:${seconds.toString().padStart(2, '0')})`;
    
    if (timeLeft <= 0) {
        callButton.disabled = false;
        callButton.textContent = '拨打车主电话';
        timerElement.style.display = 'none';
        return;
    }
    
    timeLeft--;
    setTimeout(updateTimer, 1000);
}

export function notifyOwner() {
    alert("3分钟内只能通知一次");
    const lastClickTime = localStorage.getItem('lastNotifyTime');
    const currentTime = new Date().getTime();

    if (lastClickTime && currentTime - parseInt(lastClickTime) < 180000) {
        alert("3分钟内只能通知一次");
        return;
    }
    
    localStorage.setItem('lastNotifyTime', currentTime.toString());
    
    fetch("https://wxpusher.zjiecode.com/api/send/message", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            appToken: "",
            content: "您好，有人需要您挪车，请及时处理。",
            contentType: 1,
            uids: [""]
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 1000) {
            alert("通知已发送！");
            localStorage.setItem('callButtonStartTime', currentTime.toString());
            timeLeft = COUNTDOWN_DURATION;
            timerElement.style.display = 'inline';
            updateTimer();
        } else {
            alert("通知发送失败，请稍后重试。");
        }
    })
    .catch(error => {
        console.error("Error sending notification:", error);
        alert("通知发送出错，请检查网络连接。");
    });
}

export function showPhoneInput() { 
    document.getElementById('phoneInputContainer').style.display = 'block';
}

export function submitPhoneNumber() {
    const phoneNumber = document.getElementById('phoneInput').value;
    if (!phoneNumber) {
        alert('请输入电话号码');
        return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
        alert('请输入正确的手机号码');
        return;
    }

    fetch("https://wxpusher.zjiecode.com/api/send/message", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            appToken: "",
            content: `您好，有人需要您挪车，联系电话：${phoneNumber}`,
            contentType: 1,
            uids: [""]
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 1000) {
            alert("通知已发送！");
            document.getElementById('phoneInputContainer').style.display = 'none';
            document.getElementById('phoneInput').value = '';
        } else {
            alert("通知发送失败，请稍后重试。");
        }
    })
    .catch(error => {
        console.error("Error sending notification:", error);
        alert("通知发送出错，请检查网络连接。");
    });
}


/*
$(function(){
    function onBridgeReady() {
        WeixinJSBridge.call('hideOptionMenu');
    }
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
});
*/