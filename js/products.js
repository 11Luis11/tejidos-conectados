/* ============================================================
   Tejidos Conectados — Catálogo de productos (datos de ejemplo)
   Reemplaza esta lista por tu base de datos real.
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: { es: "Chal de alpaca tejido a mano", qu: "Alpaka away chalina", ay: "Alpaka away isi" },
    price: 85,
    type: "textiles",
    region: "cusco",
    seller: "Justina Quispe",
    phone: "+51987654321",
    image: "assets/product-1.svg",
  },
  {
    id: 2,
    name: { es: "Miel de abeja nativa", qu: "Sach'a wawaq miski", ay: "Wila jawira misk'i" },
    price: 25,
    type: "miel",
    region: "huancavelica",
    seller: "Familia Mamani",
    phone: "+51987654322",
    image: "assets/product-2.svg",
  },
  {
    id: 3,
    name: { es: "Quinua orgánica 1kg", qu: "Kinuwa allin mikhuna", ay: "Jupha wali manq'a" },
    price: 18,
    type: "granos",
    region: "puno",
    seller: "Cooperativa Sumaq",
    phone: "+51987654323",
    image: "assets/product-3.svg",
  },
  {
    id: 4,
    name: { es: "Vasija de cerámica ceremonial", qu: "T'uru p'uyñu", ay: "Manq'a phuku" },
    price: 60,
    type: "ceramica",
    region: "ayacucho",
    seller: "Taller Inti",
    phone: "+51987654324",
    image: "assets/product-4.svg",
  },
  {
    id: 5,
    name: { es: "Manta tejida en telar de cintura", qu: "Away unkuña", ay: "Away isi" },
    price: 120,
    type: "textiles",
    region: "apurimac",
    seller: "Rosa Huamán",
    phone: "+51987654325",
    image: "assets/product-5.svg",
  },
  {
    id: 6,
    name: { es: "Chullo de lana de oveja", qu: "Ch'ullu qara", ay: "Ch'ullu" },
    price: 35,
    type: "artesania",
    region: "cusco",
    seller: "Familia Condori",
    phone: "+51987654326",
    image: "assets/product-6.svg",
  },
  {
    id: 7,
    name: { es: "Charqui de alpaca", qu: "Ch'arki aycha", ay: "Ch'arki" },
    price: 40,
    type: "alimentos",
    region: "puno",
    seller: "Don Mariano",
    phone: "+51987654327",
    image: "assets/product-7.svg",
  },
  {
    id: 8,
    name: { es: "Aretes de plata artesanal", qu: "Rinri ch'ipana qullqi", ay: "Jinchu p'itaña" },
    price: 30,
    type: "artesania",
    region: "huancavelica",
    seller: "Platería Pukara",
    phone: "+51987654328",
    image: "assets/product-8.svg",
  },
];

const FILTER_TYPES = ["granos", "artesania", "textiles", "miel", "ceramica", "alimentos"];
const FILTER_REGIONS = ["cusco", "puno", "huancavelica", "apurimac", "ayacucho"];

const TYPE_LABELS = {
  es: { granos: "Granos", artesania: "Artesanía", textiles: "Textiles", miel: "Miel", ceramica: "Cerámica", alimentos: "Alimentos" },
  qu: { granos: "Muhu", artesania: "Maki ruwasqa", textiles: "Away", miel: "Miski", ceramica: "T'uru", alimentos: "Mikhuna" },
  ay: { granos: "Jupha", artesania: "Amparan lurata", textiles: "Away", miel: "Misk'i", ceramica: "Manq'a", alimentos: "Manq'a phayata" },
};

const REGION_LABELS = {
  es: { cusco: "Cusco", puno: "Puno", huancavelica: "Huancavelica", apurimac: "Apurímac", ayacucho: "Ayacucho" },
  qu: { cusco: "Qusqu", puno: "Puno", huancavelica: "Wankawillka", apurimac: "Apurimaq", ayacucho: "Ayakuchu" },
  ay: { cusco: "Qusqu", puno: "Puno", huancavelica: "Wankawillka", apurimac: "Apurimaq", ayacucho: "Ayacucho" },
};
