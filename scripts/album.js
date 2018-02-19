var setSong = function(songNumber) {
    if (currentSoundFile) {
        currentSoundFile.stop();
    }

    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    // #1 assign new buzz sound object and pass the audio file via the audioUrl property on the currentSongFromAlbum object
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        // #2 settings object with properties, formats and preload
        formats: [ 'mp3' ],
        preload: true
    });

    setVolume(currentVolume);
  };

  var seek = function(time) {
      if (currentSoundFile) {
          currentSoundFile.setTime(time);
      }
  }

  var setVolume = function(volume) {
      if (currentSoundFile) {
          currentSoundFile.setVolume(volume);
      }
  };

var getSongNumberCell = function(number) {
    return $('song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
     + '</tr>'
     ;

     var $row = $(template);

     var clickHandler = function() {
<<<<<<< HEAD
=======

>>>>>>> d8dbedc87081c868900ca0ea389f99ad60df6872
             var songNumber = parseInt($(this).attr('data-song-number'));

             if (currentlyPlayingSongNumber !== null) {
     		             // Revert to song number for currently playing song because user started playing new song.
     		             var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
                     currentlyPlayingCell.html(currentlyPlayingSongNumber);
     	       }
<<<<<<< HEAD

     	       if (currentlyPlayingSongNumber !== songNumber) {
                     setSong(songNumber);
                     $(this).html(pauseButtonTemplate);
                     $('.main-controls .play-pause').html(playerBarPauseButton);
                     updatePlayerBarSong();
=======
     	       if (currentlyPlayingSongNumber !== songNumber) {
                     setSong(songNumber);
>>>>>>> d8dbedc87081c868900ca0ea389f99ad60df6872
                     currentSoundFile.play();
                     updateSeekBarWhileSongPlays();
                     currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

                     var $volumeFill = $('.volume .fill');
                     var $volumeThumb = $('.volume .thumb');
                     $volumeFill.width(currentVolume + '%');
                     $volumeThumb.css({left: currentVolume + '%'});

<<<<<<< HEAD
=======
                     $(this).html(pauseButtonTemplate);
                     updatePlayerBarSong();
>>>>>>> d8dbedc87081c868900ca0ea389f99ad60df6872
     	       } else if (currentlyPlayingSongNumber === songNumber) {
                 if (currentSoundFile.isPaused()) {
                     $(this).html(pauseButtonTemplate);
                     $('.main-controls .play-pause').html(playerBarPauseButton);
                     currentSoundFile.play();
                     updateSeekBarWhileSongPlays();
                 } else {
                     $(this).html(playButtonTemplate);
                     $('.main-controls .play-pause').html(playerBarPlayButton);
                     currentSoundFile.pause();
                 }

     	       }
     };

     var onHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = parseInt(songNumberCell.attr('data-song-number'));

         if (songNumber !== currentlyPlayingSongNumber) {
             songNumberCell.html(playButtonTemplate);
         }
     };

     var offHover = function(event) {
         var songNumberCell = $(this).find('.song-item-number');
         var songNumber = parseInt(songNumberCell.attr('data-song-number'));

         if (songNumber !== currentlyPlayingSongNumber) {
             songNumberCell.html(songNumber);
         }
     };

     // #1 similar to querySelector(). using click event listener. clickHandler is not taking an arguemnt here.
     $row.find('.song-item-number').click(clickHandler);
     // #2 hover event listener for row element with arguments for hover on and off
     $row.hover(onHover, offHover);
     // #3 row is returned here with event listeners attached
     return $row;
};

var setCurrentAlbum = function(album) {
    currentAlbum = album;

    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');

    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    $albumSongList.empty();

    for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
    }
};

<<<<<<< HEAD
=======

var setCurrentTimeInPlayerBar = function(currentTime) { //current playing time of song
    var $currentTimeElement = $('.seek-control .current-time');
    $currentTimeElement.text(currentTime);
};

var setTotalTimeInPlayerBar = function(totalTime) { //max/ total time of song
    var $totalTimeElement = $('.seek-control .total-time');
    $totalTimeElement.text(totalTime);
};

var filterTimeCode = function(timeInSeconds) { //converts time (given in total seconds) to 'X:XX' formats, in string
    var seconds = Number.parseFloat(timeInSeconds);
    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);

    var remainingSeconds = wholeSeconds % 60;
    var output = minutes + ':';

    if (remainingSeconds < 10) {
        output += '0';
    }

    output += remainingSeconds;
    return output;
};

>>>>>>> d8dbedc87081c868900ca0ea389f99ad60df6872
var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
      currentSoundFile.bind('timeupdate', function(event) { //buzz's method timeupdate, eventListener. Something about binding them?
          var currentTime = this.getTime(); //buzz's getTime method (current time). The result will be displayed and upated periodically!
          var songLength = this.getDuration(); //total duration
          var seekBarFillRatio = currentTime / songLength; //gives the ratio of seek-bar based on current time vs total time
          var $seekBar = $('.seek-control .seek-bar'); //gets seek bar
          updateSeekPercentage($seekBar, seekBarFillRatio); //calls te updateSeekPercentage function
          setCurrentTimeInPlayerBar(filterTimeCode(currentTime)); //sets up the time in player bar
        });
    }
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
   var offsetXPercent = seekBarFillRatio * 100;
   // #1
   offsetXPercent = Math.max(0, offsetXPercent);
   offsetXPercent = Math.min(100, offsetXPercent);

   // #2
   var percentageString = offsetXPercent + '%';
   $seekBar.find('.fill').width(percentageString);
   $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
    var $seekBars = $('.player-bar .seek-bar');

    $seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;

        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);
        }

        updateSeekPercentage($(this), seekBarFillRatio);
    });

    $seekBars.find('.thumb').mousedown(function(event) {

        var $seekBar = $(this).parent();

        $(document).bind('mousemove.thumb', function(event){
            var offsetX = event.pageX - $seekBar.offset().left;
            var barWidth = $seekBar.width();
            var seekBarFillRatio = offsetX / barWidth;

            if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());
            } else {
                setVolume(seekBarFillRatio);
            }

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
        // #10
        $(document).bind('mouseup.thumb', function() {
            $(document).unbind('mousemove.thumb');
            $(document).unbind('mouseup.thumb');
        });
    });
};

<<<<<<< HEAD
var filterTimeCode = function(timeInSeconds) { //converts time (given in total seconds) to 'X:XX' formats, in string
    var seconds = Number.parseFloat(timeInSeconds);
    var wholeSeconds = Math.floor(seconds);
    var minutes = Math.floor(wholeSeconds / 60);

    var remainingSeconds = wholeSeconds % 60;
    var output = minutes + ':';

    if (remainingSeconds < 10) {
        output += '0';
    }

    output += remainingSeconds;
    return output;
};

var setCurrentTimeInPlayerBar = function(currentTime) { //current playing time of song
    if (currentSoundFile) {
        filterTimeCode
        $('.current-time').text(filterTimeCode(currentTime));
  }
};

var setTotalTimeInPlayerBar = function(totalTime) { //max/ total time of song
    if (currentSoundFile) {
        $('.total-time').text(filterTimeCode(totalTime));
    }
=======
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);

    setTotalTimeInPlayerBar(filterTimeCode(currentSongFromAlbum.length));
>>>>>>> d8dbedc87081c868900ca0ea389f99ad60df6872
};

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

<<<<<<< HEAD
var togglePlayFromPlayerBar = function() { //switches button between play/pause

    var $currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber); //fetch what song number it is playing now

    if (currentSoundFile.isPaused()) { //if paused, then do this:
        $currentlyPlayingCell.html(pauseButtonTemplate); //there is a song playing, then it was paused. When clicked again, it plays. Now when a song is playing, it displays pause button
        $(this).html(playerBarPauseButton); //also updates player bar's to display pause button for the same reason above
        currentSoundFile.play(); //because it is paused, clicking it again will play it
    } else { //if song is playing (if song is playing, currentSoundFile is true! Does that mean it is false if it isPaused()?)
        $currentlyPlayingCell.html(playButtonTemplate); //opposite of above
        $(this).html(playerBarPlayButton);
        currentSoundFile.pause();
    }
};

var nextSong = function() {

    var getLastSongNumber = function(index) {
        return index === 0?currentAlbum.songs.length : index;
    };

=======
var nextSong = function() {
>>>>>>> d8dbedc87081c868900ca0ea389f99ad60df6872
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

<<<<<<< HEAD
    setSong(currentSongIndex + 1);

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);

    currentSoundFile.play();
    updatePlayerBarSong();
    updateSeekBarWhileSongPlays();
};

var previousSong = function() {
  var getLastSongNumber = function(index) {
      return index === (currentAlbum.songs.length - 1) ? 1 : index + 2;
  };

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
  currentSongIndex--;

  if (currentSongIndex < 0) {
      currentSongIndex = currentAlbum.songs.length - 1;
  }

  setSong(currentSongIndex + 1);

  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
  $('main-controls .play-pause').html(playerBarPauseButton);

  var lastSongNumber = getLastSongNumber(currentSongIndex);
  var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
  var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

  $previousSongNumberCell.html(pauseButtonTemplate);
  $lastSongNumberCell.html(lastSongNumber);

  currentSoundFile.play();
  updatePlayerBarSong();
  updateSeekBarWhileSongPlays();
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    setTotalTimeInPlayerBar(filterTimeCode(currentSongFromAlbum.duration));
=======
    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);

    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var togglePlayFromPlayerBar = function() { //switches button between play/pause
    var $currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber); //fetch what song number it is playing now

    if (currentSoundFile.isPaused()) { //if paused, then do this:
        $currentlyPlayingCell.html(pauseButtonTemplate); //there is a song playing, then it was paused. When clicked again, it plays. Now when a song is playing, it displays pause button
        $(this).html(playerBarPauseButton); //also updates player bar's to display pause button for the same reason above
        currentSoundFile.play(); //because it is paused, clicking it again will play it
    } else if (currentSoundFile) { //if song is playing (if song is playing, currentSoundFile is true! Does that mean it is false if it isPaused()?)
        $currentlyPlayingCell.html(playButtonTemplate); //opposite of above
        $(this).html(playerBarPlayButton);
        currentSoundFile.pause();
    }
>>>>>>> d8dbedc87081c868900ca0ea389f99ad60df6872
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerBar);
});
