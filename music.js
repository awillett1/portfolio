window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const element = document.getElementById('embed-iframe');
    
    const options = {
        uri: 'spotify:track:2PV4Xn0Jy9Z5uz7akQUhdg', // Spotify track without ?si= query
        width: '420',  // Adjust to fill the container
        height: '240' // Adjust to fill the container
    };

    const callback = (EmbedController) => {
        console.log('Spotify embed successfully loaded');
    };

    // Create the Spotify embed controller
    IFrameAPI.createController(element, options, callback);
};
