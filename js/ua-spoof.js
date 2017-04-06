function uaSpoof(w,h,os){
    var userAgent = {
        ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.1 (KHTML, like Gecko) Version/10.0 Mobile/14F5065b Safari/602.1',
        android: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 6P Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36'
    };

    // Spoofing Function works locally but the UA is reset before the request is sent 
    function setUserAgent(window, userAgent) {
        if (window.navigator.userAgent != userAgent) {
            var userAgentProp = { get: function () { return userAgent; } };
            try {
                Object.defineProperty(window.navigator, 'userAgent', userAgentProp);
            } catch (e) {
                window.navigator = Object.create(navigator, {
                    userAgent: userAgentProp
                });
            }
        }
    }

    // Change the user agent for the iFrame
    setUserAgent(document.getElementById('frame').contentWindow, userAgent[os]);

    // Update iFrame dimensions before traffic is sent, in case backend detects screen size
    $('#mobile-UI-Test-Wrapper > iframe').attr('width', w);
    $('#mobile-UI-Test-Wrapper > iframe').attr('height', h);   
}