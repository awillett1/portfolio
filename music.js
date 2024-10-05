window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    
    const options = {
        uri: 'spotify:track:2PV4Xn0Jy9Z5uz7akQUhdg',
        width: '420',  
        height: '240'
    };

    const callback = (EmbedController) => {
        console.log('Spotify embed successfully loaded');
    };

   
    IFrameAPI.createController(element, options, callback);
};
