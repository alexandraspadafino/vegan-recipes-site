import "../styling/Home.css";

export default function Home() {
  return (
    <div className="about-wrapper">
      <div className="about-container">
        <img
          src="/IMG_5743.jpeg"
          alt="Alexandra smiling"
          className="about-image"
        />
        <h1>Hello! I'm Alexandra ☀️</h1>
        <p>
          I’m a passionate vegan baker from Hillsdale, New Jersey. I bake 100% vegan because I’m
          allergic to milk and eggs—but trust me, you won’t miss them one bit! 💕
        </p>
        <p>
          From cookies to cakes, I’m here to prove that allergy-friendly baking can
          be delicious, beautiful, and joyful 🍰✨
        </p>
      </div>
    </div>
  );
}