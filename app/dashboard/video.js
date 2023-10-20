export default function Video() {
  return (
    <iframe
      title="video tennis"
      src="https://player.cloudinary.com/embed/?public_id=shoes_video&cloud_name=demo"
      width="640"
      height="360"
      style={{ height: 'auto', width: '100%', aspectRatio: '16/9' }}
      allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
      sandbox
    />
  );
}
