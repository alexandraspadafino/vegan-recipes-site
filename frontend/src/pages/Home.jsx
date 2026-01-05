import "../styling/Home.css";

export default function Home() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <img
          src="/me.jpeg"
          alt="Alexandra smiling"
          className="about-image"
        />
        <h1>Hi! I'm Alexandra!</h1>
        <p>
          I’m a casual vegan baker from here to there, and figured why not compose all my recipes into one big website for easy access!
        </p>
        <p>
          I have severe allergies to dairy and eggs, but trust me when I say you won't be able to tell the difference!
        </p>
      </div>
    </div>
  );
}