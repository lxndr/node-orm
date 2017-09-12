async function test() {
  await this.playback.formPlaylist({
    artist: 'My little pony',
    album: 'Ok'
  });

  this.playback.play(track.id);
}

