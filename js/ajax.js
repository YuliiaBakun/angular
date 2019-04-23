const ajax = (function() {
    function send(settings) {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', function() {
           settings.error(xhr.responseText);
        });
        xhr.addEventListener('load', function() {
            if (xhr.status >= 200 && xhr.status < 300) return settings.success(xhr.responseText);

            switch(xhr.status) {
                case 401: window.location.assign('login.html'); break;
                case 400: errFunc(xhr); break;
                case 403: errFunc(xhr); break;
                default: errFunc(xhr);
            }
        });
        xhr.open(settings.method, settings.url);
        if (settings.headers) {
           for ( let headerName in settings.headers) {
               xhr.setRequestHeader(headerName, settings.headers[headerName]);
           }
        }
        xhr.send(settings.data);
    }
    return {
        send: send
    }
})();













