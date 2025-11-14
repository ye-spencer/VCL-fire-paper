export default function RandomDisplay() {
  return (
      <div className="overflow-hidden">
          <video
              autoPlay
              loop
              muted
              disablePictureInPicture
              style={{ clipPath: 'inset(1px 1px)' }}
          >
              <source src="Example.mov" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
      </div>
  );
}