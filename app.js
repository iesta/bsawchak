var sp = getSpotifyApi(1);

function updatePageWithTrackDetails() {
    // This will be null if nothing is playing.
    var playerTrackInfo = sp.trackPlayer.getNowPlayingTrack();
    if (playerTrackInfo == null) {
        $('#track').html( "non" );
    } else {
         var track = playerTrackInfo.track;
        $('#track').html( track.name );
        $('#artist').html( track.album.artist.name );
        $('#album').html( track.album.name );
    }
}

function playTrack(uri) {
     sp.trackPlayer.playTrackFromUri(uri, {
        onSuccess: function() { console.log("success");} ,
        onFailure: function () { console.log("failure");},
        onComplete: function () { console.log("complete"); }
    });
}

function goNext(){
   sp.trackPlayer.skipToNextTrack();
}
function goPrev(){
   sp.trackPlayer.skipToPreviousTrack();
}

$(function() {
	console.log( sp );
   console.log( sp.trackPlayer );
   updatePageWithTrackDetails();
   sp.trackPlayer.addEventListener("playerStateChanged", function (event) {
        // Only update the page if the track changed
        if (event.data.curtrack == true) {
            updatePageWithTrackDetails();
        }
   });
   $('#playbutton').click(function() {
      playTrack( $('#playuri').val() );
   });
   $('#nextButton').click(function() {
      goNext();
   });
   $('#previousButton').click(function() {
      goPrev();
   });

});

