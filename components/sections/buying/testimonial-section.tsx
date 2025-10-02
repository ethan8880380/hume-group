import { Reviews } from "@/components/sections/home/reviews";

const reviews = [
  {
    text: "The Hume Group helped us find our dream home in just 3 weeks. Their knowledge of the market was invaluable!",
    name: "David & Emily R.",
    location: "Stadium District",
    image: "https://placekitten.com/110/110",
  },
  {
    text: "Professional, patient, and got us an amazing deal on our new home. We couldn't ask for better agents!",
    name: "Marcus T.",
    location: "North End",
    image: "https://placekitten.com/111/111",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <Reviews reviews={reviews} />
    </section>
  );
}

