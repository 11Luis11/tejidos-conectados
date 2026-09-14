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
    image: "https://images.unsplash.com/photo-1594736797933-d0c6c4b6e5b5?w=600&q=80",
  },
  {
    id: 2,
    name: { es: "Miel de abeja nativa", qu: "Sach'a wawaq miski", ay: "Wila jawira misk'i" },
    price: 25,
    type: "miel",
    region: "huancavelica",
    seller: "Familia Mamani",
    phone: "+51987654322",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&q=80",
  },
  {
    id: 3,
    name: { es: "Quinua orgánica 1kg", qu: "Kinuwa allin mikhuna", ay: "Jupha wali manq'a" },
    price: 18,
    type: "granos",
    region: "puno",
    seller: "Cooperativa Sumaq",
    phone: "+51987654323",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
  },
  {
    id: 4,
    name: { es: "Vasija de cerámica ceremonial", qu: "T'uru p'uyñu", ay: "Manq'a phuku" },
    price: 60,
    type: "ceramica",
    region: "ayacucho",
    seller: "Taller Inti",
    phone: "+51987654324",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&q=80",
  },
  {
    id: 5,
    name: { es: "Manta tejida en telar de cintura", qu: "Away unkuña", ay: "Away isi" },
    price: 120,
    type: "textiles",
    region: "apurimac",
    seller: "Rosa Huamán",
    phone: "+51987654325",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
  },
  {
    id: 6,
    name: { es: "Chullo de lana de oveja", qu: "Ch'ullu qara", ay: "Ch'ullu" },
    price: 35,
    type: "artesania",
    region: "cusco",
    seller: "Familia Condori",
    phone: "+51987654326",
    image: "https://images.unsplash.com/photo-1610030181087-540a4409f9fd?w=600&q=80",
  },
  {
    id: 7,
    name: { es: "Charqui de alpaca", qu: "Ch'arki aycha", ay: "Ch'arki" },
    price: 40,
    type: "alimentos",
    region: "puno",
    seller: "Don Mariano",
    phone: "+51987654327",
    image: "https://images.unsplash.com/photo-1626200926749-59527ccb0e9e?w=600&q=80",
  },
  {
    id: 8,
    name: { es: "Aretes de plata artesanal", qu: "Rinri ch'ipana qullqi", ay: "Jinchu p'itaña" },
    price: 30,
    type: "artesania",
    region: "huancavelica",
    seller: "Platería Pukara",
    phone: "+51987654328",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
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
