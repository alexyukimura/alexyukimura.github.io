// 定义视频源数组
const videoSources = [
    "../guide/unity/resources/1725802329169.mp4",
    "video2.mp4",
    "video3.mp4",
    "video4.mp4"
];

// 获取视频元素和按钮元素
const videoPlayer = document.getElementById("videoPlayer");
const videoSource = document.getElementById("videoSource");
const randomButton = document.getElementById("randomButton");
const resetButton = document.getElementById("resetButton");

// 确保元素存在且类型正确
if (videoPlayer && videoSource && randomButton && resetButton) {
    // 随机选择视频源的函数
    function randomVideo() {
        const randomIndex = Math.floor(Math.random() * videoSources.length);
        videoSource.src = videoSources[randomIndex];
        videoPlayer.load(); // 重新加载视频
    }

    // 重置视频源的函数
    function resetVideo() {
        videoSource.src = videoSources[0];
        videoPlayer.load(); // 重新加载视频
    }

    // 为按钮添加点击事件处理函数
    randomButton.addEventListener("click", randomVideo);
    resetButton.addEventListener("click", resetVideo);
} else {
    console.error("某些元素未正确加载，请检查 HTML 结构。");
}