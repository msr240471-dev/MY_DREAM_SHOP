const sizes = [38, 39, 40, 41, 42, 43, 44, 45]
const photos = [
  'photo-1542291026-7eec264c27ff',
  'photo-1542291026-7eec264c27ff',
  'photo-1600185365483-26d7a4cc7519',
  'photo-1608231387042-66d1773070a5',
  'photo-1600185365926-3a2ce3cdb9eb',
  'photo-1552346154-21d32810aba3',
  'photo-1495555961986-6d4c1ecb7be3',
  'photo-1460353581641-37baddab0fa2',
]
const imageUrl = (id, w = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`
const seeds = [
  ['Aero Pulse 90', 'NORTHSTAR', 'Sneakers', 12490, 'Cloud white / Volt', true, true],
  ['Velocity Knit Pro', 'STRIDE', 'Running Shoes', 8990, 'Graphite / Orange', true, false],
  ['Courtline Classic', 'COURT & CO.', 'Casual Shoes', 7490, 'Chalk / Forest', false, true],
  ['Rally High Street', 'NORTHSTAR', 'Sneakers', 10990, 'Black / Bone', false, false],
  ['Cloudstep Runner', 'STRIDE', 'Running Shoes', 9990, 'Mist / Coral', true, true],
  ['Metro Canvas Low', 'DAYFORM', 'Casual Shoes', 5290, 'Natural / Ink', false, false],
  ['SprintForm Elite', 'STRIDE', 'Sports Shoes', 13990, 'Ice / Electric', true, true],
  ['Baseline Court 2', 'COURT & CO.', 'Sports Shoes', 11990, 'White / Cobalt', false, false],
  ['Everyday Drift', 'DAYFORM', 'Casual Shoes', 6590, 'Sand / Clay', false, false],
  ['Terra Trail X', 'STRIDE', 'Running Shoes', 15490, 'Olive / Stone', true, false],
  ['Solemate Slide', 'DAYFORM', 'Sandals', 3290, 'Black / Smoke', false, false],
  ['Coastline Sport', 'DAYFORM', 'Sandals', 4290, 'Sage / Cream', true, false],
  ['Retro Loop 84', 'NORTHSTAR', 'Sneakers', 9490, 'White / Red', false, true],
  ['Comet Flex', 'STRIDE', 'Running Shoes', 7990, 'Lilac / Ink', false, false],
  ['Pace Setter V2', 'STRIDE', 'Sports Shoes', 12990, 'Lime / Charcoal', true, true],
  ['Mono Court Hi', 'COURT & CO.', 'Casual Shoes', 8490, 'Black / White', false, false],
  ['Weekend Low Pro', 'DAYFORM', 'Casual Shoes', 6990, 'Blue / Chalk', false, true],
  ['Apex Hoops One', 'COURT & CO.', 'Sports Shoes', 16990, 'Crimson / Black', true, true],
  ['Glide Mesh 5', 'STRIDE', 'Running Shoes', 9290, 'Cloud / Sky', false, false],
  ['Harbor Slide', 'DAYFORM', 'Sandals', 2890, 'Stone / Black', false, false],
  ['Studio Runner', 'NORTHSTAR', 'Sneakers', 11490, 'Silver / White', true, false],
  ['Tracksmith Retro', 'STRIDE', 'Sports Shoes', 9990, 'Navy / Gold', false, true],
  ['Canvas Club 70', 'COURT & CO.', 'Casual Shoes', 7790, 'Ecru / Black', false, false],
  ['Airloom 200', 'NORTHSTAR', 'Sneakers', 13990, 'White / Mint', true, true],
  ['Dune Trek Sandal', 'DAYFORM', 'Sandals', 4590, 'Khaki / Stone', false, false],
  ['FlexRun Everyday', 'STRIDE', 'Running Shoes', 8490, 'Black / Lime', false, false],
  ['City Hiker Lite', 'NORTHSTAR', 'Sneakers', 12990, 'Taupe / Rust', true, false],
  ['Pivot Court Low', 'COURT & CO.', 'Sports Shoes', 10490, 'White / Maroon', false, true],
  ['Afterhours Mule', 'DAYFORM', 'Sandals', 3990, 'Espresso / Cream', false, false],
  ['Future Pace 01', 'STRIDE', 'Running Shoes', 14490, 'Silver / Volt', true, true],
]

export const products = seeds.map(([name, brand, category, price, color, featured, bestSeller], index) => {
  const discount = [10, 15, 0, 20, 12, 0, 15, 0, 10, 0][index % 10]
  const previousPrice = discount ? Math.round(price / (1 - discount / 100) / 10) * 10 : price
  const id = `sh-${String(index + 1).padStart(3, '0')}`
  const photo = photos[index % photos.length]
  return {
    id, name, brand, category, price, previousPrice, discount,
    images: [imageUrl(photo), imageUrl(photos[(index + 2) % photos.length])],
    description: `${name} brings considered comfort and confident everyday style. Designed with a breathable upper, cushioned step and durable outsole for all-day movement.`,
    sizes, colors: color.split(' / '), stock: 8 + ((index * 7) % 35),
    rating: Number((4.1 + ((index * 7) % 9) / 10).toFixed(1)),
    reviewCount: 18 + index * 13, featured, bestSeller, created: index < 8,
  }
})

export const categories = [
  { name: 'Sneakers', slug: 'sneakers', image: imageUrl(photos[0], 800), count: '12 styles' },
  { name: 'Running', slug: 'running-shoes', image: imageUrl(photos[2], 800), count: '08 styles' },
  { name: 'Casual', slug: 'casual-shoes', image: imageUrl(photos[4], 800), count: '06 styles' },
  { name: 'Sandals', slug: 'sandals', image: imageUrl(photos[6], 800), count: '04 styles' },
]

export const money = (amount) => `৳${Number(amount || 0).toLocaleString('en-BD')}`
