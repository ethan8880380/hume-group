import { Reviews } from "@/components/sections/home/reviews";

const reviews = [
  {
    text: "The Hume Group made our home sale quick and stress-free! Highly recommended!",
    name: "Sarah & Mike J.",
    location: "North End, Tacoma",
    image: "https://placekitten.com/120/120",
  },
  {
    text: "Professional, knowledgeable, and got us $50k over asking. We couldn&apos;t be happier!",
    name: "Jennifer K.",
    location: "Proctor District",
    image: "https://placekitten.com/121/121",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <Reviews reviews={reviews} />
    </section>
  );
}

