(function () {
  "use strict";

  window.__BRAND__ = {
    name: "Atmosfera",
    tagline: "Modern Building Makers",
    yearsActive: 18,
    site: "atmosferamakers.com",

    contact: {
      person: "Arq. Daniel Velázquez Rivera",
      email: "daniel.velazquez@atmosferamakers.com",
      phone: "+52 55 1700 9288",
      phoneDisplay: "52 1 55 1700 9288",
      facebook: "https://www.facebook.com/atmosferamakers",
      instagram: "https://www.instagram.com/atmosferamakers/",
      area: "Ciudad de México · Querétaro · Aguascalientes · Nacional"
    },

    stats: [
      { n: 18, suffix: "+", label: "Años de experiencia" },
      { n: 30, suffix: "+", label: "Proyectos entregados" },
      { n: 6, suffix: "", label: "Estados de la República" },
      { n: 12, suffix: "+", label: "Marcas y despachos aliados" }
    ],

    collaborators: [
      "Sordo Madaleno Arquitectos",
      "Kababie Arquitectos",
      "Esrawe Studio",
      "Niz + Chauvet",
      "Construtech",
      "Desarrollos Confianza"
    ],

    clientMarquee: [
      "Chanel", "Grupo Herdez", "Nutrisa", "Waldo's", "Truper", "Fix Ferreterías",
      "Euronet", "IZZI", "Megacable", "Totalplay", "Redit", "Telecable", "Rotoplas"
    ],

    services: [
      {
        id: "construccion",
        title: "Construcción y remodelación",
        blurb: "Obra nueva y reacondicionamiento integral — comercial y habitacional.",
        items: [
          "Proyectos ejecutivos y renders",
          "Diseño de interiores",
          "Obra civil y estructura metálica",
          "Demoliciones y desmantelamientos"
        ]
      },
      {
        id: "acabados",
        title: "Acabados finos",
        blurb: "Especialistas en carpintería, piedra y superficies de autor.",
        items: [
          "Carpintería general (closets, libreros, plafones, celosías)",
          "Mármol, granito y cuarzo en pisos, muros y barras",
          "Pisos de madera, porcelanato y paneles PVC",
          "Tablaroca, pasta y pintura"
        ]
      },
      {
        id: "instalaciones",
        title: "Instalaciones e ingeniería",
        blurb: "Todo lo que hace funcionar un espacio, resuelto con precisión.",
        items: [
          "Instalaciones electromecánicas",
          "Aire acondicionado",
          "Impermeabilizaciones",
          "Cancelería y herrería"
        ]
      },
      {
        id: "telecom",
        title: "Fibra óptica y telecomunicaciones",
        blurb: "Más de 8 años construyendo la red que conecta al país.",
        items: [
          "Instalación aérea y subterránea de fibra óptica",
          "Obra civil para apertura de calles y banquetas",
          "Conexión de equipos activos y pasivos CATV",
          "Balanceo de señal de RF"
        ]
      },
      {
        id: "urbanizacion",
        title: "Urbanización y logística",
        blurb: "Proyectos de infraestructura pública y comunitaria a escala nacional.",
        items: [
          "Reacondicionamiento de calles y plazas cívicas",
          "Rehabilitación de espacios deportivos y religiosos",
          "Logística de instalación en comunidades rurales",
          "Sistemas de captación pluvial y saneamiento"
        ]
      }
    ],

    categories: [
      { id: "retail", label: "Retail & Restaurantes" },
      { id: "corporativo", label: "Corporativo & Residencial" },
      { id: "infraestructura", label: "Infraestructura & Telecom" }
    ],

    projects: [
      {
        id: "chanel-artz",
        name: "Chanel Artz",
        category: "retail",
        location: "Plaza Artz, San Ángel, CDMX",
        design: "SMA",
        year: "2025",
        desc: "Construcción de local a base de estructura metálica, cancelería de cristal y techumbre de madera, para la apertura de la boutique Chanel en Plaza Artz.",
        tags: ["Construcción", "Cancelería", "Techumbre"],
        images: ["chanel-artz-1.webp", "chanel-artz-2.webp", "chanel-artz-3.webp"],
        featured: true
      },
      {
        id: "costanza-polanco",
        name: "Costanza Polanco",
        category: "retail",
        location: "Isaac Newton 53, Polanco, CDMX",
        design: "Kababie Arquitectos",
        year: "2024",
        desc: "Aplicación de acabados y decoración, iluminación e instalaciones electromecánicas para el restaurante y mercado Costanza, en colaboración con Construtech.",
        tags: ["Acabados", "Iluminación", "Restaurante"],
        images: ["costanza-polanco-1.webp", "costanza-polanco-2.webp", "costanza-polanco-3.webp"],
        featured: true
      },
      {
        id: "la-nonna",
        name: "La Nonna Polanco",
        category: "retail",
        location: "Emilio Castelar 135, Polanco, CDMX",
        design: "Esrawe Studio",
        year: "2024",
        desc: "Reacondicionamiento integral de local comercial para el restaurante italiano La Nonna: obra general, instalaciones, acabados, iluminación y carpintería.",
        tags: ["Reacondicionamiento", "Carpintería", "Restaurante"],
        images: ["la-nonna-1.webp", "la-nonna-2.webp"],
        featured: true
      },
      {
        id: "piacevole",
        name: "Piacevole Santa Fe",
        category: "retail",
        location: "Juan Salvador Agraz 130, Lomas de Santa Fe, CDMX",
        design: "Atmosfera / Arq. Paulina Olivares",
        year: "2023",
        desc: "Diseño y reacondicionamiento integral de restaurante: obra general, instalaciones, acabados, iluminación y carpintería de autor.",
        tags: ["Diseño", "Obra general", "Restaurante"],
        images: ["piacevole-1.webp", "piacevole-2.webp"],
        featured: true
      },
      {
        id: "bar-bf",
        name: "Bar BF Santa Fe",
        category: "retail",
        location: "Juan Salvador Agraz 130, Lomas de Santa Fe, CDMX",
        design: "Atmosfera / Arq. Paulina Olivares",
        year: "2023",
        desc: "Diseño y reacondicionamiento de dinner club: obra general, instalaciones, acabados, iluminación y carpintería a medida.",
        tags: ["Diseño", "Carpintería", "Dinner club"],
        images: ["bar-bf-1.webp", "bar-bf-2.webp"]
      },
      {
        id: "sonora-asador",
        name: "Sonora Asador Añejo",
        category: "retail",
        location: "Hacienda de Valle Escondido, Atizapán de Zaragoza, Edo. Méx.",
        design: "Atmosfera / Arq. Paulina Olivares",
        year: "2023",
        desc: "Diseño y reacondicionamiento de restaurante: obra general, instalaciones, acabados, iluminación y carpintería.",
        tags: ["Diseño", "Restaurante", "Iluminación"],
        images: ["sonora-asador-1.webp", "sonora-asador-2.webp"]
      },
      {
        id: "penny-lane",
        name: "Penny Lane Bosques",
        category: "retail",
        location: "Paseo Tamarindos 90, Plaza Arcos Bosques, CDMX",
        design: "Niz + Chauvet",
        year: "2022",
        desc: "Reacondicionamiento de boliche restaurante-bar en colaboración con Desarrollos Confianza / Grupo Hunan: obra general, instalaciones, acabados, carpintería, herrería y cancelería.",
        tags: ["Herrería", "Cancelería", "Bar"],
        images: ["penny-lane-1.webp", "penny-lane-2.webp"]
      },
      {
        id: "la-3ra-ronda",
        name: "La 3ra Ronda Nápoles",
        category: "retail",
        location: "Louisiana 4, Nápoles, CDMX",
        design: "Atmosfera",
        year: "2023",
        desc: "Creación completa de restaurante bar: albañilerías, instalaciones electromecánicas, acabados, cancelería, carpintería y herrería.",
        tags: ["Diseño propio", "Restaurante bar"],
        images: ["la-3ra-ronda-1.webp", "la-3ra-ronda-2.webp", "la-3ra-ronda-3.webp"]
      },
      {
        id: "cielito-querido",
        name: "Cielito Querido Café",
        category: "retail",
        location: "Av. Popocatépetl (Eje 8 Sur) #488, Benito Juárez, CDMX",
        design: "Grupo Herdez",
        year: "2022",
        desc: "Creación de cafetería de acceso público: albañilerías, instalaciones electromecánicas, acabados, cancelería y herrería.",
        tags: ["Cafetería", "Acabados"],
        images: ["cielito-querido-1.webp", "cielito-querido-2.webp"]
      },
      {
        id: "la-parroquia",
        name: "La Parroquia Santa Fe",
        category: "retail",
        location: "Juan Salvador Agraz #44, Santa Fe, CDMX",
        design: "Atmosfera / Arq. Pilar Fernández",
        year: "2022",
        desc: "Reacondicionamiento de local comercial: demoliciones, instalaciones electromecánicas, aire acondicionado, herrería, obra en general, acabados e iluminación.",
        tags: ["Reacondicionamiento", "Herrería"],
        images: ["la-parroquia-1.webp", "la-parroquia-2.webp"]
      },
      {
        id: "el-ganso",
        name: "El Ganso Plaza Antara",
        category: "retail",
        location: "Plaza Antara, Polanco, CDMX",
        design: "El Ganso",
        year: "2021",
        desc: "Reacondicionamiento de tienda de ropa en colaboración con Construtech: obra general, instalaciones, acabados, iluminación y carpintería.",
        tags: ["Tienda", "Carpintería"],
        images: ["el-ganso-1.webp", "el-ganso-2.webp"]
      },
      {
        id: "la-europea",
        name: "La Europea",
        category: "retail",
        location: "Plaza Carso · Nima Bay, CDMX / Vallarta",
        design: "Arq. Miguel Díaz",
        year: "2021",
        desc: "Reacondicionamiento de tienda de licores en colaboración con Desarrollos Confianza: desarrollo de instalaciones, acabados, iluminación e instalaciones electromecánicas.",
        tags: ["Retail", "Instalaciones"],
        images: ["la-europea-1.webp", "la-europea-2.webp"]
      },
      {
        id: "nutrisa-antea",
        name: "Nutrisa Antea y Galerías Querétaro",
        category: "retail",
        location: "Av. 5 de Mayo, Querétaro",
        design: "Grupo Herdez",
        year: "2024",
        desc: "Creación de heladería de acceso público: albañilerías, instalaciones electromecánicas, acabados, cancelería y herrería.",
        tags: ["Heladería", "Cancelería"],
        images: ["nutrisa-antea-1.webp", "nutrisa-antea-2.webp", "nutrisa-antea-3.webp"]
      },
      {
        id: "nutrisa-eje8",
        name: "Nutrisa Eje 8",
        category: "retail",
        location: "Av. Popocatépetl (Eje 8 Sur) #488, Benito Juárez, CDMX",
        design: "Grupo Herdez",
        year: "2024",
        desc: "Creación de heladería de acceso público: albañilerías, instalaciones electromecánicas, acabados, cancelería y herrería.",
        tags: ["Heladería", "Retail"],
        images: ["nutrisa-eje8-1.webp", "nutrisa-eje8-2.webp"]
      },
      {
        id: "waldos-galerias",
        name: "Waldo's Plaza Galerías Aguascalientes",
        category: "retail",
        location: "Av. Independencia 2351, Trojes de Alonso, Aguascalientes",
        design: "Waldo's",
        year: "2025",
        desc: "Reacondicionamiento de local con estructura metálica para fabricar mezzanine, cancelería, herrería, instalaciones electromecánicas y acabados en general.",
        tags: ["Mezzanine", "Estructura metálica"],
        images: ["waldos-galerias-1.webp", "waldos-galerias-2.webp", "waldos-galerias-3.webp"]
      },
      {
        id: "waldos-nopalera",
        name: "Waldo's Nopalera",
        category: "retail",
        location: "Av. Tláhuac 5570, Col. Santa Ana Pte., CDMX",
        design: "Waldo's",
        year: "2025",
        desc: "Reacondicionamiento de local con estructura metálica para fabricar mezzanine, cancelería, herrería, instalaciones electromecánicas y acabados en general.",
        tags: ["Mezzanine", "Retail"],
        images: ["waldos-nopalera-1.webp", "waldos-nopalera-2.webp"]
      },
      {
        id: "ledvance",
        name: "Corporativo Ledvance",
        category: "corporativo",
        location: "Av. Tepalcapa 8, Tultitlán, Edo. Méx.",
        design: "Atmosfera",
        year: "2024",
        desc: "Diseño de espacios y reorganización de colaboradores: áreas de coffee break, coworking, phonebooths, cancelería en cristal templado, plafones reticulares, alfombras y remodelación de baños en 3 niveles.",
        tags: ["Oficinas", "Diseño de espacios"],
        images: ["ledvance-1.webp"]
      },
      {
        id: "la-herradura",
        name: "Residencia La Herradura",
        category: "corporativo",
        location: "Av. Paseo de la Herradura 303, Fracc. Galardón",
        design: "Atmosfera",
        year: "2023",
        desc: "Remodelación de residencia: cambio de pisos, carpintería (closets, vestidores, libreros a medida), cancelería plegadiza, domo de jardín, cocina integral y acabados en piedra.",
        tags: ["Residencial", "Carpintería"],
        images: ["la-herradura-1.webp", "la-herradura-2.webp", "la-herradura-3.webp"]
      },
      {
        id: "rotoplas",
        name: "Rotoplas — Baños ecológicos",
        category: "infraestructura",
        location: "Chiapas · Oaxaca · Michoacán · Guerrero",
        design: "Rotoplas / Construtech",
        year: "2022",
        desc: "Instalación y logística de 2,493 sistemas de baño ecológico basados en biodigestor y 892 sistemas de captación pluvial en comunidades rurales de varios municipios del país.",
        tags: ["Infraestructura rural", "Sustentabilidad"],
        images: ["rotoplas-1.webp", "rotoplas-2.webp"]
      },
      {
        id: "granja-americas",
        name: "La Granja de las Américas",
        category: "infraestructura",
        location: "Blvd. Pípila s/n, Col. Lomas de Sotelo, CDMX",
        design: "Granja de las Américas / Desarrollos Confianza",
        year: "2021",
        desc: "Circuito vial de 350 metros en miniauto, pasando por túneles, glorietas y segundos pisos viales, con monumentos emblemáticos de la CDMX trabajados a escala.",
        tags: ["Circuito vial", "Obra a escala"],
        images: ["granja-americas-1.webp", "granja-americas-2.webp"]
      },
      {
        id: "monteon-nayarit",
        name: "El Monteón, Nayarit",
        category: "infraestructura",
        location: "Pueblo El Monteón, Nayarit",
        design: "Obra pública / Construtech",
        year: "2020",
        desc: "Reacondicionamiento de calles, fabricación de motivo de acceso, rehabilitación de plaza cívica, iglesia y canchas deportivas del pueblo.",
        tags: ["Obra pública", "Urbanización"],
        images: ["monteon-nayarit-1.webp", "monteon-nayarit-2.webp"]
      }
    ]
  };
})();
