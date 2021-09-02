import { Colors } from "../components/Colors";
import { channel } from "../configurations/ChannelConfigurations";
const { channelTitle, pageBackground, pageFont, VideoRowBackground, videoRowBoxShadow, VideoTitle, VideoSubhead, sectionColor, sectionText, sectionBoxShadow, thumbnailBoxShadow, iconBoxShadow, playListBackgroundColor, btnTxtVideos, btnBGVideos } = Colors;

export const config = `
document.body.style.backgroundColor = '${pageBackground}'
document.body.style.color = '${pageFont}'
document.querySelector('ytm-mobile-topbar-renderer').style.display = 'none'
document.querySelector('ytm-pivot-bar-renderer').style.display = 'none'

setInterval(() => {

  if(document.querySelector("ytm-subscribe-button-renderer")) {
      document.querySelector("ytm-subscribe-button-renderer").style.backgroundColor = '${pageBackground}';
      document.querySelector(".c3-material-button-button").style.color = '${pageFont}';
    }

  if (document.querySelector('.c4-tabbed-header-title')) {
    document.querySelector('.c4-tabbed-header-title').style.color = '${channelTitle}'
    document.querySelector('.c4-tabbed-header-title').style.fontSize = '25px'
  }

  if (document.querySelector('.scbrr-tabs')) {
    document.querySelector('.scbrr-tabs').style.display = 'none'
  }

  if (document.getElementsByClassName('compact-media-item')) {
    var videoItemElement = document.getElementsByClassName('compact-media-item');
    for (let i = 0; i < videoItemElement.length; i++) {
      videoItemElement[i].style.backgroundColor = '${VideoRowBackground}'
      videoItemElement[i].style.borderRadius = '8px'
      videoItemElement[i].style.padding = '15px'
      videoItemElement[i].style.margin = '10px'
      videoItemElement[i].style.boxShadow = '${videoRowBoxShadow}'
    }
  }

  if (document.getElementsByClassName('video-thumbnail-container-compact')) {
    var thumbnailElement = document.getElementsByClassName('video-thumbnail-container-compact');
    for (let i = 0; i < thumbnailElement.length; i++) {
      thumbnailElement[i].style.borderRadius = '10px'
      thumbnailElement[i].style.boxShadow = '${thumbnailBoxShadow}'
    }
  }

  if (document.getElementsByClassName('compact-media-item-metadata')) {
    var videoMetadataElement = document.getElementsByClassName('compact-media-item-metadata');
    for (let i = 0; i < videoMetadataElement.length; i++) {
      videoMetadataElement[i].style.borderRadius = '8px'
      videoMetadataElement[i].style.marginLeft = '5px'

    }
  }

  if (document.getElementsByClassName('compact-media-item-headline')) {
    var videoTitleElement = document.getElementsByClassName('compact-media-item-headline');
    for (let i = 0; i < videoTitleElement.length; i++) {
      videoTitleElement[i].style.color = '${VideoTitle}'
      videoTitleElement[i].style.fontSize = '12px'
    }
  }

  if (document.getElementsByClassName('subhead')) {
    var subHeadElement = document.getElementsByClassName('subhead');
    for (let i = 0; i < subHeadElement.length; i++) {
      subHeadElement[i].style.color = '${VideoSubhead}'
    }
  }

  if (document.querySelector('ytm-select')) {
    var sectionElement = document.getElementsByTagName('ytm-select');
    for (let i = 0; i < sectionElement.length; i++) {
      sectionElement[i].style.borderRadius = '8px'
      sectionElement[i].style.backgroundColor = '${sectionColor}'
      sectionElement[i].style.color = '${sectionText}'
      sectionElement[i].style.boxShadow = '${sectionBoxShadow}'
      sectionElement[i].style.width = '40%'
    }
  }

  if (document.querySelector('ytm-c4-tabbed-header-renderer')) {
    let display_ok = document.querySelector('ytm-c4-tabbed-header-renderer').style.display;

    if (display_ok !== 'none') {
      document.querySelector('ytm-c4-tabbed-header-renderer').style.backgroundColor = '${pageBackground}'
    }
  }

  if (document.querySelector('ytm-item-section-renderer[data-content-type="related"]')) {
    let display_ok = document.querySelector('ytm-item-section-renderer[data-content-type="related"]').style.display;

    if (display_ok !== 'none') {
      document.querySelector('ytm-item-section-renderer[data-content-type="related"]').style.display = 'none'
    }
  }

  if (document.querySelector("ytm-profile-icon")) {
    document.querySelector("ytm-profile-icon").style.boxShadow = "${iconBoxShadow}"
    document.querySelector("ytm-slim-owner-renderer").innerHTML = '<div style="width: 100%"><a href="/channel/${channel}/videos" target = "_self">  <button type="button" style="color:${btnTxtVideos}; font-size: 17px; background-color:${btnBGVideos}; text-align: center;border-radius:10px; padding: 12px; width: 100%;">Back to Videos</button></a></div>';
  }
  if (document.querySelector("ytm-playlist-controls")) {
    document.querySelector(".playlist-controls-secondary").innerHTML = '<div style="width: 100%; margin-left: 5%; margin-right: 5%"><a href="/channel/${channel}/playlists" target = "_self">  <button type="button" style="color:${btnTxtVideos}; font-size: 17px; background-color:${btnBGVideos}; text-align: center;border-radius:5px; padding: 12px; width: 100%;">Back to Playlist</button></a></div>';
    document.querySelector('.playlist-content').style.backgroundColor = "${playListBackgroundColor}"
    document.querySelector('ytm-playlist-panel-video-renderer').style.backgroundColor = "${playListBackgroundColor}"
    document.querySelector('.playlist-panel-header-title').style.textAlign = 'center'
    document.querySelector('.playlist-controls-primary').style.display = 'none'

  }

  if (document.querySelector('button[aria-label="Next video"]')) {
    document.querySelector('button[aria-label="Previous video"]').style.display = 'none'
    document.querySelector('button[aria-label="Next video"]').style.display = 'none'
    document.querySelector('.ytm-autonav-toggle-button-container').style.display = 'none'
  }

  if (document.querySelector('ytm-player-endscreen')) {
    document.querySelector('.endscreen-previous-button[aria-label="Previous video"]').style.display = 'none'
    document.querySelector('.endscreen-next-button[aria-label="Next video"]').style.display = 'none'
    document.querySelector('.autonav-off-controls-top').style.display = 'none'
  }


}, 100)
    `;
