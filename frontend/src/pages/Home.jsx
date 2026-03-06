import Banner from "./public/landing/Banner";
import Hero from "./public/landing/Hero";
import Features from "./public/landing/Features";
import ProductDemo from "./public/landing/ProductDemo";
import CTA from "./public/landing/CTA";
import Team from "./public/landing/Team";
import ContactForm from "./public/landing/ContactForm";
import "./public/landing/landing.css";

export default function Home() {
  return (
    <>
      <Banner />
      <Hero />
      <Features />
      <ProductDemo />
      <CTA />
      <Team />
      <ContactForm />
    </>
  );
}
