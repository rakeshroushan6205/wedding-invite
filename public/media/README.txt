Drop your real media here and the site will pick it up automatically:

/media/video/hero-bg.mp4              -> fullscreen hero background video
/media/video/films/save-the-date.mp4  -> "Save The Date" film (Wedding Films section)
/media/video/films/pre-wedding.mp4    -> "Pre-Wedding Shoot" film
/media/video/films/proposal.mp4       -> "The Proposal" film
/media/couple/story-1.jpg ...         -> couple story timeline photos (5 expected)
/media/gallery/photo-1.jpg ...        -> masonry gallery photos
/media/gallery/video-1.mp4 ...        -> short gallery video clips (optional)
/media/family/bride-1.jpg ...         -> bride's family photos
/media/family/groom-1.jpg ...         -> groom's family photos
/media/venue.jpg                      -> venue photo
/media/qr-code.png                    -> UPI QR code image
/audio/wedding-theme.mp3              -> background music track (place in /public/audio/)

To add or rename films, edit the `films` array in src/data/weddingData.js —
each entry just needs a title, description, thumbnail image, and video path.

Until you add your own files, the site uses elegant placeholder thumbnail
images from Unsplash so the Wedding Films section still looks complete; the
video players will simply show that thumbnail as a poster until a real
.mp4 is added at the matching path.
