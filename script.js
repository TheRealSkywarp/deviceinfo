async function fetchPublicIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        document.getElementById('ip-wan').textContent = data.ip;
    } catch (error) {
        console.error('Error fetching public IP:', error);
        document.getElementById('ip-wan').textContent = 'Unavailable';
    }
}

async function fetchLocation() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        document.getElementById('location').textContent = `${data.city}, ${data.country_name}`;
    } catch (error) {
        console.error('Error fetching location:', error);
        document.getElementById('location').textContent = 'Unavailable';
    }
}

function detectCPUCores() {
    const cores = navigator.hardwareConcurrency || 'Unknown';
    document.getElementById('cpu-cores').textContent = cores;
}

function detectGPU() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            document.getElementById('gpu').textContent = gpu;
        } else {
            document.getElementById('gpu').textContent = 'Unavailable (No WEBGL_debug_renderer_info)';
        }
    } else {
        document.getElementById('gpu').textContent = 'Unavailable (WebGL not supported)';
    }
}

function detectHardwareAcceleration() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    document.getElementById('hardware-accel').textContent = gl ? 'Enabled' : 'Disabled';
}

function detectOSVersion() {
    const userAgent = navigator.userAgent;
    let osVersion = 'Unknown';

    if (userAgent.includes('Windows')) {
        osVersion = 'Windows';
    } else if (userAgent.includes('Mac')) {
        osVersion = 'macOS';
    } else if (userAgent.includes('Linux')) {
        osVersion = 'Linux';
    } else if (userAgent.includes('Android')) {
        osVersion = 'Android';
    } else if (userAgent.includes('iOS')) {
        osVersion = 'iOS';
    }

    document.getElementById('os-version').textContent = osVersion;
}

async function detectBattery() {
    if ('getBattery' in navigator) {
        try {
            const battery = await navigator.getBattery();
            document.getElementById('battery-level').textContent = `${Math.round(battery.level * 100)}%`;
            document.getElementById('battery-charging').textContent = battery.charging ? 'Yes' : 'No';
        } catch (error) {
            console.error('Error fetching battery info:', error);
            document.getElementById('battery-level').textContent = 'Unavailable';
            document.getElementById('battery-charging').textContent = 'Unavailable';
        }
    } else {
        document.getElementById('battery-level').textContent = 'Not supported';
        document.getElementById('battery-charging').textContent = 'Not supported';
    }
}

function detectDisplayInfo() {
    document.getElementById('resolution').textContent = `${window.screen.width}x${window.screen.height}`;
    document.getElementById('orientation').textContent = window.screen.orientation.type;
    document.getElementById('color-depth').textContent = `${window.screen.colorDepth} bits`;
    document.getElementById('pixel-ratio').textContent = window.devicePixelRatio;

    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.getElementById('dark-mode').textContent = isDarkMode ? 'Enabled' : 'Disabled';

    const isTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    document.getElementById('touch').textContent = isTouchScreen ? 'Yes' : 'No';
}

function detectBrowserInfo() {
    document.getElementById('user-agent').textContent = navigator.userAgent;
    document.getElementById('platform').textContent = navigator.platform;
    document.getElementById('language').textContent = navigator.language;
    document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('cookies').textContent = navigator.cookieEnabled ? 'Enabled' : 'Disabled';
    document.getElementById('webrtc-support').textContent = typeof RTCPeerConnection !== 'undefined' ? 'Supported' : 'Not Supported';

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    document.getElementById('device-type').textContent = isMobile ? 'Mobile' : 'Desktop';
}

function detectAdBlock() {
    const ad = document.createElement('div');
    ad.innerHTML = '&nbsp;';
    ad.className = 'adsbox';
    document.body.appendChild(ad);
    setTimeout(() => {
        const isAdBlocked = ad.offsetHeight === 0;
        document.getElementById('adblock').textContent = isAdBlocked ? 'Detected' : 'Not Detected';
        document.body.removeChild(ad);
    }, 100);
}

async function checkPermissions() {
    try {
        const micPermission = await navigator.permissions.query({ name: 'microphone' });
        document.getElementById('mic-permission').textContent = micPermission.state;

        const cameraPermission = await navigator.permissions.query({ name: 'camera' });
        document.getElementById('camera-permission').textContent = cameraPermission.state;

        const notificationsPermission = await navigator.permissions.query({ name: 'notifications' });
        document.getElementById('notifications-permission').textContent = notificationsPermission.state;
    } catch (error) {
        console.error('Error checking permissions:', error);
    }
}

async function init() {
    fetchPublicIP();
    fetchLocation();
    detectCPUCores();
    detectGPU();
    detectHardwareAcceleration();
    detectOSVersion();
    detectBattery();
    detectDisplayInfo();
    detectBrowserInfo();
    detectAdBlock();
    checkPermissions();
}

init();