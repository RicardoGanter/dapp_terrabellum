// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }


export async function getCatImage() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search');
  const data = await response.json();
  return data[0].url;
}
