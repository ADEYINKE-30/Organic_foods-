import type { Route } from './+types/_index';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FreshMart — Organic Food Store" },
    { name: "description", content: "Shop fresh organic groceries, delivered to your door." },
  ];
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", padding: "2rem" }}>
      <h1>Welcome to FreshMart</h1>
      <p>Your monorepo is successfully set up! 🎉</p>
    </div>
  );
}
