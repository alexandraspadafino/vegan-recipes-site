import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "../styling/Order.css";

const SERVICE_ID = "service_msxfrzj";
const TEMPLATE_ID = "template_cmhv7l5";
const PUBLIC_KEY = "kfim4Zqw5aSOmhXDo";

export default function Order() {
  const { recipeId } = useParams();
  const [cookies, setCookies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cookie: "",
    quantity: 1,
    notes: "",
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        setCookies(data);
        const defaultCookie = recipeId && data.find((c) => c.id === recipeId)
          ? recipeId
          : data[0]?.id || "";
        setForm((f) => ({ ...f, cookie: defaultCookie }));
      });
  }, [recipeId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    const selectedCookie = cookies.find((c) => c.id === form.cookie);

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        customer_name: form.name,
        customer_email: form.email,
        customer_phone: form.phone || "Not provided",
        cookie_type: selectedCookie?.title || form.cookie,
        quantity: form.quantity,
        notes: form.notes || "None",
      },
      PUBLIC_KEY
    )
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }

  if (status === "success") {
    return (
      <div className="order-page">
        <div className="order-success">
          <h1>Order Received!</h1>
          <p>Thanks for your order! I'll be in touch soon to confirm details and arrange payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <div className="order-container">
        <h1 className="order-title">Place an Order</h1>
        <p className="order-subtitle">Fill out the form below and I'll get back to you to confirm your order!</p>

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="order-section-label">Your Info</div>

          <div className="order-field">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="order-field">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="order-field">
            <label>Phone <span className="optional">(optional)</span></label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your phone number"
            />
          </div>

          <div className="order-section-label">Your Order</div>

          <div className="order-field">
            <label>Item *</label>
            <select name="cookie" value={form.cookie} onChange={handleChange} required>
              {cookies.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="order-field">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
          </div>

          <div className="order-field">
            <label>Special Requests <span className="optional">(optional)</span></label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Allergies, delivery preferences, pickup location, etc."
              rows={4}
            />
          </div>

          {status === "error" && (
            <p className="order-error">Something went wrong. Please try again or reach out directly!</p>
          )}

          <button type="submit" className="order-submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
