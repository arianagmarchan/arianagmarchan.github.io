"use client";

import { useRouter } from "next/navigation";
import SushiConveyorMenu, { type ConveyorDish } from "@/components/ui/sushi-conveyor-menu";
import { interests } from "@/lib/content";

const plates: ConveyorDish[] = interests.map((i) => ({
  id: i.slug,
  name: i.name,
  price: i.tag,
  tier: i.tier,
  description: i.blurb,
  details: i.details,
  image: i.plate,
}));

export function InterestsBelt() {
  const router = useRouter();
  return (
    <SushiConveyorMenu
      items={plates}
      legend={{}}
      heading="What I do when I'm not in the shop"
      caption="Hover to stop the belt, drag to spin it, and click a plate to take a closer look."
      autoplay
      labels={{ add: "Read more", close: "Close", previous: "Previous plate", next: "Next plate", pause: "Pause belt" }}
      onAdd={(dish) => router.push(`/interests/${dish.id}`)}
    />
  );
}
