
// Base64 encoded SVG placeholders for development
export const placeholders = {
  hero: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23333'/%3E%3Ctext x='960' y='540' font-family='Arial' font-size='42' fill='%23eee' text-anchor='middle' alignment-baseline='middle'%3EHero Background%3C/text%3E%3C/svg%3E",
  
  teamPhoto: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23555'/%3E%3Ctext x='400' y='300' font-family='Arial' font-size='32' fill='%23eee' text-anchor='middle' alignment-baseline='middle'%3ETeam Photo%3C/text%3E%3C/svg%3E",
  
  testimonialPhoto1: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Ccircle cx='200' cy='200' r='200' fill='%23666'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='24' fill='%23eee' text-anchor='middle' alignment-baseline='middle'%3EClient 1%3C/text%3E%3C/svg%3E",
  
  testimonialPhoto2: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Ccircle cx='200' cy='200' r='200' fill='%23666'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='24' fill='%23eee' text-anchor='middle' alignment-baseline='middle'%3EClient 2%3C/text%3E%3C/svg%3E",
  
  testimonialPhoto3: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Ccircle cx='200' cy='200' r='200' fill='%23666'/%3E%3Ctext x='200' y='200' font-family='Arial' font-size='24' fill='%23eee' text-anchor='middle' alignment-baseline='middle'%3EClient 3%3C/text%3E%3C/svg%3E",
};

export const createImagePlaceholder = (width: number, height: number, backgroundColor: string = "#555", text: string = ""): string => {
  const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'>
      <rect width='${width}' height='${height}' fill='${backgroundColor}'/>
      <text x='${width/2}' y='${height/2}' font-family='Arial' font-size='${Math.min(width, height) / 10}' fill='#eee' text-anchor='middle' alignment-baseline='middle'>${text}</text>
    </svg>
  `;
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
