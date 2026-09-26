import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC_RO = '/Volumes/KINGSTON/SITE H GEORGESCU/ROMANIA'
const SRC_US = '/Volumes/KINGSTON/SITE H GEORGESCU/SUA'
const OUT_US = path.join(ROOT, 'public/projects/1947-1977')
const OUT_RO = path.join(ROOT, 'public/projects/1933-1947')
const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.gif'])

const LOREM_DESC =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const LOREM_BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'

const CAT_MAP = {
  LOCUIRE: 'housing',
  'EDIFICII PUBLICE': 'public-buildings',
  'EXPOZITII SI CONCURSURI': 'exhibition-competitions',
  DESIGN: 'design',
}

const SECTION_MAP = {
  // Romania / USA housing
  '1 LOCUINTE UNIFAMILIALE': 'single-family',
  UNIFAMILIALA: 'single-family',
  '2 LOCUINTE SEMICOLECTIVE - REZIDENTIALE': 'semi-collective',
  '3 LOCUINTE COLECTIVE': 'collective',
  COLECTIVE: 'collective',
  TEMPORARA: 'temporary',
  // USA public buildings
  'A. centre culturale': 'cultural-centers',
  'B. centre comerciale': 'commercial-centers',
  'C1-centre de sanatate': 'health-centers',
  'C2-centre pt pers in varsta': 'elderly-centers',
  'd-imobil de birouri': 'office-buildings',
  'E-BISERICI': 'churches',
  'F-EDIFICII DE SPORT SI RECREERE': 'sports-recreation',
  // USA design
  'a-interioare': 'interiors',
  'b-exterioare': 'exteriors',
}

const TITLE_EN = {
  'p-h-residence': 'P.H. Residence',
  'residence-h-pelengian': 'Residence H. Pelengian',
  'guy-pauker-residence': 'Guy Pauker Residence',
  'm-g-residence': 'M.G. Residence',
  'residence-marchante-esq': 'Residence Marchante Esq.',
  'pasinetti-house': 'Pasinetti House',
  neidentificate: 'Unidentified',
  'hg-residence': 'H.G. Residence',
  'beach-house': 'Beach House',
  'residence-in-summitridge-drive': 'Residence in Summitridge Drive',
  'locuinta-unifamiliala': 'Single-family house',
  '24-unit-apartment-house': '24 Unit Apartment House',
  'apartment-complex': 'Apartment Complex',
  'carmelina-homes': 'Carmelina Homes',
  'hacienda-apartments': 'Hacienda Apartments',
  'lark-apartments': 'Lark Apartments',
  'six-unit-apartments': 'Six Unit Apartments',
  '30-units-for-nabel': '30 Units for Nabel',
  neidentif: 'Unidentified',
  '30-units-app-calif': '30 Units Apartments — California',
  '24-unit-apartment-house-collective': '24 Unit Apartment House',
  '60-units-apartment-house': '60 Units Apartment House',
  'langdon-apartments': 'Langdon Apartments',
  'six-units-apartment': 'Six Units Apartment',
  'high-rise': 'High Rise',
  'castellammare-apartments': 'Castellammare Apartments',
  'fullerton-apartments': 'Fullerton Apartments',
  'joe-nabel': 'Joe Nabel',
  'kleber-apartments': 'Kleber Apartments',
  'locuinte-colective-insiruite-nabel': 'Row Housing Nabel',
  'roscoe-apartments': 'Roscoe Apartments',
  'imobil-apartamente-tip-duplex': 'Duplex Apartment Building',
  'levering-properties': 'Levering Properties',
  neidentificat: 'Unidentified',
  // public
  'centrul-cultural-uacc': 'UACC Cultural Center',
  'university-of-nebrasca': 'University of Nebraska',
  'washington-university-of-saint-luis': 'Washington University of Saint Louis',
  'bucuresti-restaurant': 'Bucuresti Restaurant',
  'centru-comercial-neidentif': 'Unidentified Commercial Center',
  'golden-triangle-market': 'Golden Triangle Market',
  'kiewit-plaza': 'Kiewit Plaza',
  'tekton-building': 'Tekton Building',
  'wilshire-comstock': 'Wilshire Comstock',
  'chichi-club': 'Chichi Club',
  'rackstrom-reid-building': 'Rackstrom-Reid Building',
  '140-beds-convalescent': '140 Beds Convalescent',
  '95-99-beds-mental-hospital': '95–99 Beds Mental Hospital',
  'care-psychiatric-hospital': 'Care Psychiatric Hospital',
  'casa-contenta-northridge': 'Casa Contenta Northridge',
  'casa-contenta-care-center': 'Casa Contenta Care Center',
  'colonial-manor-convalescent': 'Colonial Manor Convalescent',
  'country-manor-convalescent': 'Country Manor Convalescent',
  fullerton: 'Fullerton',
  'garden-crest-convalescent-hospital': 'Garden Crest Convalescent Hospital',
  'lakeview-hospital': 'Lakeview Hospital',
  'lakeview-terrace': 'Lakeview Terrace',
  'medical-building': 'Medical Building',
  'medicare-psyhiatric-hospital': 'Medicare Psychiatric Hospital',
  'medicare-sanitarium': 'Medicare Sanitarium',
  'millbrae-nursing-home': 'Millbrae Nursing Home',
  'pacific-sanitarium': 'Pacific Sanitarium',
  'rinaldi-convalescent-hospital': 'Rinaldi Convalescent Hospital',
  'santa-monica': 'Santa Monica',
  'studiocity-convalescent-hospital': 'Studio City Convalescent Hospital',
  'woodland-hills': 'Woodland Hills',
  'bernard-hornung-and-partners': 'Bernard Hornung and Partners',
  'california-home-for-aged': 'California Home for the Aged',
  'cheviot-hills-senior-citizens-home': 'Cheviot Hills Senior Citizens Home',
  'harvard-senior-citizens-home': 'Harvard Senior Citizens Home',
  'riverton-home-for-the-aged': 'Riverton Home for the Aged',
  'law-office': 'Law Office',
  'neidentificat-bd-st-monica': 'Unidentified — Blvd St. Monica',
  'st-george-detroit': 'St. George Detroit',
  'st-mary-cleveland': 'St. Mary Cleveland',
  'neidentif-club-de-tenis': 'Unidentified Tennis Club',
  'neidentif-club-in-desert': 'Unidentified Desert Club',
  'club-de-tenis': 'Tennis Club',
  // exhibition
  'city-hall': 'City Hall',
  'drawings-of-past-present-and-future': 'Drawings of Past, Present and Future',
  'mount-olympus': 'Mount Olympus',
  'sky-lots': 'Sky Lots',
  // design
  '4a-b-nabel-residence': 'Nabel Residence',
  '4a-stainless-steel-table-legs': 'Stainless Steel Table Legs',
  'alteration-maruni-restaurant': 'Alteration Maruni Restaurant',
  'amenajare-birou-de-arhitectura-personal': 'Personal Architecture Office',
  'alteration-adition-atkinson-residence': 'Alteration & Addition Atkinson Residence',
  'alteration-adition': 'Alteration & Addition',
  // romania
  coman: 'Coman',
  felbab: 'Felbab',
  konteschweller: 'Konteschweller',
  krammer: 'Krammer',
  'burileanu-malaxa': 'Burileanu–Malaxa',
  dimitrescu: 'Dimitrescu',
  galotti: 'Galotti',
  grofsoreanu: 'Grofsoreanu',
  gross: 'Gross',
  peritz: 'Peritz',
  'sar-telefoane': 'SAR Telefoane',
  schachter: 'Schachter',
  tanasescu: 'Tănăsescu',
  'casa-hurmuzescu-mangalia': 'Casa Hurmuzescu, Mangalia',
  'casa-ing-mateescu-carmen-sylva': 'Casa Ing. Mateescu, Carmen-Sylva',
  'casa-prof-dimitrescu-mangalia': 'Casa Prof. Dimitrescu, Mangalia',
  'ateliere-de-vagonaj-ale-societatii-concordia': 'Concordia Wagon Workshops',
  'barul-melody': 'Melody Bar',
  'casa-de-odihna-pentru-sar-telefoane-pucioasa': 'SAR Telefoane Rest House, Pucioasa',
  'cinematograf-luxor': 'Luxor Cinema',
  'clubul-asociatiei-functionarilor-comunali-restaurant-ratoi':
    'Municipal Employees Club / Restaurant Rățoi',
  'fabrica-de-tesaturi-oltenia': 'Oltenia Textile Factory',
  'fabrici-de-industrializare-a-laptelui': 'Milk Industrialization Factories',
  'halele-obor': 'Obor Halls',
  'hotelul-aro-brasov': 'ARO Hotel Brașov',
  'hotelul-aro-sport': 'ARO Sport Hotel',
  'magazin-provizoriu': 'Provisional Store',
  malaxa: 'Malaxa',
  'restaurant-dorobanti': 'Dorobanți Restaurant',
  'restaurant-pescarus': 'Pescaruș Restaurant',
  'sala-teatrului-cinema-aro': 'ARO Theatre Cinema Hall',
  'sediul-companiei-de-telefoane-sibiu': 'Telephone Company Headquarters, Sibiu',
  'sediul-societatii-asigurarea-romaneasca': 'Asigurarea Românească Headquarters',
  'vitrina-florala': 'Floral Display Window',
  'yacht-club-eforie': 'Yacht Club Eforie',
  'concurs-pentru-banca-de-economii-bucuresti': 'Competition for Savings Bank, Bucharest',
  'concurs-pentru-hotelurile-ont': 'Competition for ONT Hotels',
  'concurs-pentru-manastirea-sambata-de-sus': 'Competition for Sâmbăta de Sus Monastery',
  'concurs-pentru-memorialul-eroilor-de-razboi': 'Competition for War Heroes Memorial',
  'concurs-pentru-palatul-primariei-municipiului-bucuresti':
    'Competition for Bucharest City Hall Palace',
  'concurs-pentru-refacerea-teatrului-national': 'Competition for National Theatre Reconstruction',
  'concurs-pentru-sediul-institutului-national-al-cooperatiei':
    'Competition for National Cooperation Institute',
  'expozitia-luna-bucurestilor': 'Luna Bucureștilor Exhibition',
  'expozitia-munca-si-voe-buna': 'Muncă și Voie Bună Exhibition',
  'expozitia-transnistriei': 'Transnistria Exhibition',
  'pavilionul-floarea-soarelui': 'Sunflower Pavilion',
  'standurile-romaniei-la-targurile-de-mostre-din-lipsca-si-viena':
    'Romania Stands at Leipzig and Vienna Sample Fairs',
  'amenajare-apartament-gomoescu': 'Gomoescu Apartment Interior',
  'amenajare-bucatarie-aro': 'ARO Kitchen Interior',
  'amenajare-interior-dimitrescu': 'Dimitrescu Interior',
}

const TITLE_RO = {
  'p-h-residence': 'Reședința P.H.',
  'residence-h-pelengian': 'Reședința H. Pelengian',
  'guy-pauker-residence': 'Reședința Guy Pauker',
  'm-g-residence': 'Reședința M.G.',
  'residence-marchante-esq': 'Reședința Marchante Esq.',
  'pasinetti-house': 'Casa Pasinetti',
  neidentificate: 'Neidentificate',
  'hg-residence': 'Reședința H.G.',
  'beach-house': 'Beach House',
  'residence-in-summitridge-drive': 'Reședință pe Summitridge Drive',
  'locuinta-unifamiliala': 'Locuință unifamilială',
  '24-unit-apartment-house': 'Imobil cu 24 de apartamente',
  'apartment-complex': 'Complex de apartamente',
  'carmelina-homes': 'Carmelina Homes',
  'hacienda-apartments': 'Hacienda Apartments',
  'lark-apartments': 'Lark Apartments',
  'six-unit-apartments': 'Apartamente cu 6 unități',
  '30-units-for-nabel': '30 unități pentru Nabel',
  neidentif: 'Neidentificat',
  '30-units-app-calif': '30 unități apartamente — California',
  '24-unit-apartment-house-collective': 'Imobil cu 24 de apartamente',
  '60-units-apartment-house': 'Imobil cu 60 de apartamente',
  'langdon-apartments': 'Langdon Apartments',
  'six-units-apartment': 'Apartament cu 6 unități',
  'high-rise': 'High Rise',
  'castellammare-apartments': 'Castellammare Apartments',
  'fullerton-apartments': 'Fullerton Apartments',
  'joe-nabel': 'Joe Nabel',
  'kleber-apartments': 'Kleber Apartments',
  'locuinte-colective-insiruite-nabel': 'Locuințe colective înșiruite Nabel',
  'roscoe-apartments': 'Roscoe Apartments',
  'imobil-apartamente-tip-duplex': 'Imobil apartamente tip duplex',
  'levering-properties': 'Levering Properties',
  neidentificat: 'Neidentificat',
  'centrul-cultural-uacc': 'Centrul cultural UACC',
  'university-of-nebrasca': 'University of Nebraska',
  'washington-university-of-saint-luis': 'Washington University of Saint Louis',
  'bucuresti-restaurant': 'Restaurant București',
  'centru-comercial-neidentif': 'Centru comercial neidentificat',
  'golden-triangle-market': 'Golden Triangle Market',
  'kiewit-plaza': 'Kiewit Plaza',
  'tekton-building': 'Tekton Building',
  'wilshire-comstock': 'Wilshire Comstock',
  'chichi-club': 'Chichi Club',
  'rackstrom-reid-building': 'Rackstrom-Reid Building',
  '140-beds-convalescent': 'Convalescentă 140 paturi',
  '95-99-beds-mental-hospital': 'Spital de psihiatrie 95–99 paturi',
  'care-psychiatric-hospital': 'Care Psychiatric Hospital',
  'casa-contenta-northridge': 'Casa Contenta Northridge',
  'casa-contenta-care-center': 'Casa Contenta Care Center',
  'colonial-manor-convalescent': 'Colonial Manor Convalescent',
  'country-manor-convalescent': 'Country Manor Convalescent',
  fullerton: 'Fullerton',
  'garden-crest-convalescent-hospital': 'Garden Crest Convalescent Hospital',
  'lakeview-hospital': 'Lakeview Hospital',
  'lakeview-terrace': 'Lakeview Terrace',
  'medical-building': 'Medical Building',
  'medicare-psyhiatric-hospital': 'Medicare Psychiatric Hospital',
  'medicare-sanitarium': 'Medicare Sanitarium',
  'millbrae-nursing-home': 'Millbrae Nursing Home',
  'pacific-sanitarium': 'Pacific Sanitarium',
  'rinaldi-convalescent-hospital': 'Rinaldi Convalescent Hospital',
  'santa-monica': 'Santa Monica',
  'studiocity-convalescent-hospital': 'Studio City Convalescent Hospital',
  'woodland-hills': 'Woodland Hills',
  'bernard-hornung-and-partners': 'Bernard Hornung and Partners',
  'california-home-for-aged': 'California Home for the Aged',
  'cheviot-hills-senior-citizens-home': 'Cheviot Hills Senior Citizens Home',
  'harvard-senior-citizens-home': 'Harvard Senior Citizens Home',
  'riverton-home-for-the-aged': 'Riverton Home for the Aged',
  'law-office': 'Cabinet de avocatură',
  'neidentificat-bd-st-monica': 'Neidentificat — Bd. St. Monica',
  'st-george-detroit': 'St. George Detroit',
  'st-mary-cleveland': 'St. Mary Cleveland',
  'neidentif-club-de-tenis': 'Club de tenis neidentificat',
  'neidentif-club-in-desert': 'Club în deșert neidentificat',
  'club-de-tenis': 'Club de tenis',
  'city-hall': 'City Hall',
  'drawings-of-past-present-and-future': 'Drawings of Past, Present and Future',
  'mount-olympus': 'Mount Olympus',
  'sky-lots': 'Sky Lots',
  '4a-b-nabel-residence': 'Reședința Nabel',
  '4a-stainless-steel-table-legs': 'Picioare de masă din oțel inoxidabil',
  'alteration-maruni-restaurant': 'Alterare restaurant Maruni',
  'amenajare-birou-de-arhitectura-personal': 'Amenajare birou de arhitectură personal',
  'alteration-adition-atkinson-residence': 'Alterare & adiție reședința Atkinson',
  'alteration-adition': 'Alterare & adiție',
  coman: 'Coman',
  felbab: 'Felbab',
  konteschweller: 'Konteschweller',
  krammer: 'Krammer',
  'burileanu-malaxa': 'Burileanu–Malaxa',
  dimitrescu: 'Dimitrescu',
  galotti: 'Galotti',
  grofsoreanu: 'Grofsoreanu',
  gross: 'Gross',
  peritz: 'Peritz',
  'sar-telefoane': 'SAR Telefoane',
  schachter: 'Schachter',
  tanasescu: 'Tănăsescu',
  'casa-hurmuzescu-mangalia': 'Casa Hurmuzescu, Mangalia',
  'casa-ing-mateescu-carmen-sylva': 'Casa Ing. Mateescu, Carmen-Sylva',
  'casa-prof-dimitrescu-mangalia': 'Casa Prof. Dimitrescu, Mangalia',
  'ateliere-de-vagonaj-ale-societatii-concordia': 'Ateliere de vagonaj ale societății Concordia',
  'barul-melody': 'Barul Melody',
  'casa-de-odihna-pentru-sar-telefoane-pucioasa': 'Casă de odihnă pentru SAR Telefoane, Pucioasa',
  'cinematograf-luxor': 'Cinematograf Luxor',
  'clubul-asociatiei-functionarilor-comunali-restaurant-ratoi':
    'Clubul Asociației Funcționarilor Comunali / Restaurant Rățoi',
  'fabrica-de-tesaturi-oltenia': 'Fabrica de țesături Oltenia',
  'fabrici-de-industrializare-a-laptelui': 'Fabrici de industrializare a laptelui',
  'halele-obor': 'Halele Obor',
  'hotelul-aro-brasov': 'Hotelul ARO Brașov',
  'hotelul-aro-sport': 'Hotelul ARO Sport',
  'magazin-provizoriu': 'Magazin provizoriu',
  malaxa: 'Malaxa',
  'restaurant-dorobanti': 'Restaurant Dorobanți',
  'restaurant-pescarus': 'Restaurant Pescaruș',
  'sala-teatrului-cinema-aro': 'Sala Teatrului Cinema ARO',
  'sediul-companiei-de-telefoane-sibiu': 'Sediul Companiei de Telefoane Sibiu',
  'sediul-societatii-asigurarea-romaneasca': 'Sediul Societății Asigurarea Românească',
  'vitrina-florala': 'Vitrină florală',
  'yacht-club-eforie': 'Yacht Club Eforie',
  'concurs-pentru-banca-de-economii-bucuresti': 'Concurs pentru Banca de Economii București',
  'concurs-pentru-hotelurile-ont': 'Concurs pentru hotelurile ONT',
  'concurs-pentru-manastirea-sambata-de-sus': 'Concurs pentru Mănăstirea Sâmbăta de Sus',
  'concurs-pentru-memorialul-eroilor-de-razboi': 'Concurs pentru Memorialul Eroilor de Război',
  'concurs-pentru-palatul-primariei-municipiului-bucuresti':
    'Concurs pentru Palatul Primăriei Municipiului București',
  'concurs-pentru-refacerea-teatrului-national': 'Concurs pentru refacerea Teatrului Național',
  'concurs-pentru-sediul-institutului-national-al-cooperatiei':
    'Concurs pentru sediul Institutului Național al Cooperației',
  'expozitia-luna-bucurestilor': 'Expoziția Luna Bucureștilor',
  'expozitia-munca-si-voe-buna': 'Expoziția Muncă și Voie Bună',
  'expozitia-transnistriei': 'Expoziția Transnistriei',
  'pavilionul-floarea-soarelui': 'Pavilionul Floarea Soarelui',
  'standurile-romaniei-la-targurile-de-mostre-din-lipsca-si-viena':
    'Standurile României la Târgurile de mostre din Lipsca și Viena',
  'amenajare-apartament-gomoescu': 'Amenajare apartament Gomoescu',
  'amenajare-bucatarie-aro': 'Amenajare bucătărie ARO',
  'amenajare-interior-dimitrescu': 'Amenajare interior Dimitrescu',
}

const TYPE_EN = {
  housing: {
    'single-family': 'Residential',
    'semi-collective': 'Semi-collective',
    collective: 'Collective housing',
    temporary: 'Temporary housing',
  },
  'public-buildings': {
    'cultural-centers': 'Cultural center',
    'commercial-centers': 'Commercial',
    'health-centers': 'Health',
    'elderly-centers': 'Elderly care',
    'office-buildings': 'Office',
    churches: 'Church',
    'sports-recreation': 'Sports & recreation',
    '': 'Public building',
  },
  'exhibition-competitions': { '': 'Exhibition / Competition' },
  design: {
    interiors: 'Interior design',
    exteriors: 'Exterior design',
    '': 'Design',
  },
}

const TYPE_RO = {
  housing: {
    'single-family': 'Rezidențial',
    'semi-collective': 'Semicolectiv',
    collective: 'Locuințe colective',
    temporary: 'Locuire temporară',
  },
  'public-buildings': {
    'cultural-centers': 'Centru cultural',
    'commercial-centers': 'Comercial',
    'health-centers': 'Sănătate',
    'elderly-centers': 'Îngrijire persoane vârstnice',
    'office-buildings': 'Birouri',
    churches: 'Biserică',
    'sports-recreation': 'Sport și recreere',
    '': 'Edificiu public',
  },
  'exhibition-competitions': { '': 'Expoziție / Concurs' },
  design: {
    interiors: 'Amenajare interioară',
    exteriors: 'Amenajare exterioară',
    '': 'Design',
  },
}

function slugify(name) {
  let n = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  n = n.replace(/^\d+[_\-\s]+/, '').trim()
  n = n.toLowerCase()
  n = n.replace(/&/g, ' and ')
  n = n.replace(/[()]/g, ' ')
  n = n.replace(/[^a-z0-9]+/g, '-')
  n = n.replace(/-+/g, '-').replace(/^-|-$/g, '')
  const replacements = {
    'p-h-residente': 'p-h-residence',
    'lark-apartaments': 'lark-apartments',
    'six-unit-apartaments': 'six-unit-apartments',
    '24-unit-apartament-house': '24-unit-apartment-house',
    'apartament-complex': 'apartment-complex',
    'alteration-and-adition-atkinson-residence': 'alteration-adition-atkinson-residence',
    'alteration-and-adition': 'alteration-adition',
    '95-99-beds-mental-hospital': '95-99-beds-mental-hospital',
  }
  // handle 95(99) specially before generic
  if (name.toLowerCase().includes('95(99)')) n = '95-99-beds-mental-hospital'
  return replacements[n] || n
}

function titleCaseFromFolder(folder) {
  const base = folder.replace(/^\d+[_\-\s]+/, '').trim()
  return base
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

function collectImages(dir) {
  const files = []
  function walk(d) {
    let entries
    try {
      entries = fs.readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.')) continue
      const full = path.join(d, e.name)
      if (e.isDirectory()) walk(full)
      else if (IMG_EXTS.has(path.extname(e.name).toLowerCase())) files.push(full)
    }
  }
  walk(dir)
  files.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  const heroes = files.filter((f) => path.basename(f).toLowerCase().includes('hero'))
  const gallery = files.filter((f) => !path.basename(f).toLowerCase().includes('hero'))
  return { heroes, gallery }
}

async function convertToJpg(src, dest) {
  await fs.promises.mkdir(path.dirname(dest), { recursive: true })
  await sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(dest)
}

function hasSubdirs(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true }).some((e) => e.isDirectory() && !e.name.startsWith('.'))
  } catch {
    return false
  }
}

function listDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => path.join(dir, e.name))
    .sort((a, b) => path.basename(a).localeCompare(path.basename(b), undefined, { sensitivity: 'base' }))
}

async function importProject({
  projDir,
  slug,
  period,
  category,
  section,
  year,
  publicBase,
  outDir,
  importImages,
  usedSlugs,
}) {
  let finalSlug = slug
  if (usedSlugs.has(finalSlug)) {
    if (section === 'collective' && finalSlug === '24-unit-apartment-house') {
      finalSlug = '24-unit-apartment-house-collective'
    } else {
      finalSlug = `${finalSlug}-${section || category}`
    }
  }
  usedSlugs.add(finalSlug)

  const m = path.basename(projDir).match(/^(\d+)/)
  const index = m ? m[1].padStart(2, '0') : String(usedSlugs.size).padStart(2, '0')

  let hero = ''
  const images = []

  if (importImages) {
    const { heroes, gallery } = collectImages(projDir)
    if (heroes.length) {
      const dest = path.join(outDir, `${finalSlug}-hero.jpg`)
      try {
        await convertToJpg(heroes[0], dest)
        hero = `${publicBase}/${finalSlug}-hero.jpg`
      } catch (err) {
        console.warn('hero fail', finalSlug, err.message)
      }
    }
    let gi = 0
    for (const g of gallery) {
      gi += 1
      const dest = path.join(outDir, `${finalSlug}-${String(gi).padStart(2, '0')}.jpg`)
      try {
        await convertToJpg(g, dest)
        images.push(`${publicBase}/${finalSlug}-${String(gi).padStart(2, '0')}.jpg`)
      } catch (err) {
        console.warn('img fail', finalSlug, path.basename(g), err.message)
      }
    }
  }

  const sectionKey = section || ''
  const typeEn = TYPE_EN[category]?.[sectionKey] || TYPE_EN[category]?.[''] || 'Project'
  const typeRo = TYPE_RO[category]?.[sectionKey] || TYPE_RO[category]?.[''] || 'Proiect'
  const titleEn = TITLE_EN[finalSlug] || titleCaseFromFolder(path.basename(projDir))
  const titleRo = TITLE_RO[finalSlug] || titleEn

  const common = {
    slug: finalSlug,
    index,
    year,
    desc: LOREM_DESC,
    body: LOREM_BODY,
    hero,
    images,
    period,
    category,
  }
  if (section) common.section = section

  return {
    en: { ...common, title: titleEn, type: typeEn },
    ro: { ...common, title: titleRo, type: typeRo },
  }
}

async function walkPeriod(srcRoot, period, year, publicBase, outDir, importImages, onlyMissingHousingSlugs) {
  const usedSlugs = new Set()
  const projectsEn = []
  const projectsRo = []

  // For USA housing we keep existing and only add missing — handled by caller
  const categories = listDirs(srcRoot)
  for (const catDir of categories) {
    const catName = path.basename(catDir)
    const category = CAT_MAP[catName]
    if (!category) {
      console.warn('unknown category', catName)
      continue
    }

    const children = listDirs(catDir)
    for (const child of children) {
      const childName = path.basename(child)
      const mappedSection = SECTION_MAP[childName]

      if (mappedSection && hasSubdirs(child)) {
        // section with projects
        for (const projDir of listDirs(child)) {
          const slug = slugify(path.basename(projDir))
          if (onlyMissingHousingSlugs && category === 'housing') {
            if (!onlyMissingHousingSlugs.has(slug)) continue
          }
          if (!onlyMissingHousingSlugs && category === 'housing' && period === 'b') {
            // skip all existing housing when importing non-housing only? handled by flags
          }
          const result = await importProject({
            projDir,
            slug,
            period,
            category,
            section: mappedSection,
            year,
            publicBase,
            outDir,
            importImages,
            usedSlugs,
          })
          projectsEn.push(result.en)
          projectsRo.push(result.ro)
          console.log(
            `OK ${period}/${category}/${mappedSection}/${result.en.slug} hero=${result.en.hero ? 'y' : 'n'} imgs=${result.en.images.length}`,
          )
        }
      } else if (hasSubdirs(child) && !mappedSection) {
        // unexpected nested — treat children as projects without section
        for (const projDir of listDirs(child)) {
          const slug = slugify(path.basename(projDir))
          const result = await importProject({
            projDir,
            slug,
            period,
            category,
            section: null,
            year,
            publicBase,
            outDir,
            importImages,
            usedSlugs,
          })
          projectsEn.push(result.en)
          projectsRo.push(result.ro)
          console.log(`OK ${period}/${category}/_/${result.en.slug}`)
        }
      } else {
        // project at category root (possibly empty)
        if (onlyMissingHousingSlugs && category === 'housing') continue
        const slug = slugify(childName)
        const result = await importProject({
          projDir: child,
          slug,
          period,
          category,
          section: null,
          year,
          publicBase,
          outDir,
          importImages,
          usedSlugs,
        })
        projectsEn.push(result.en)
        projectsRo.push(result.ro)
        console.log(
          `OK ${period}/${category}/_/${result.en.slug} hero=${result.en.hero ? 'y' : 'n'} imgs=${result.en.images.length}`,
        )
      }
    }
  }

  return { projectsEn, projectsRo }
}

async function main() {
  fs.mkdirSync(OUT_US, { recursive: true })
  fs.mkdirSync(OUT_RO, { recursive: true })

  // 1) Romania — all empty, no image import
  console.log('\n=== ROMANIA (empty routes) ===')
  const ro = await walkPeriod(SRC_RO, 'a', '1933–1947', '/projects/1933-1947', OUT_RO, false, null)

  // 2) USA — non-housing + 2 missing housing
  console.log('\n=== USA missing housing ===')
  const missingHousing = new Set(['residence-in-summitridge-drive', 'locuinta-unifamiliala'])
  const usHousing = await walkPeriod(
    SRC_US,
    'b',
    '1947–1977',
    '/projects/1947-1977',
    OUT_US,
    true,
    missingHousing,
  )

  console.log('\n=== USA other categories ===')
  // Walk again but skip housing entirely for "other"
  const used = new Set(usHousing.projectsEn.map((p) => p.slug))
  const usOtherEn = []
  const usOtherRo = []

  for (const catDir of listDirs(SRC_US)) {
    const catName = path.basename(catDir)
    const category = CAT_MAP[catName]
    if (!category || category === 'housing') continue

    for (const child of listDirs(catDir)) {
      const childName = path.basename(child)
      const mappedSection = SECTION_MAP[childName]

      if (mappedSection && hasSubdirs(child)) {
        for (const projDir of listDirs(child)) {
          const slug = slugify(path.basename(projDir))
          const result = await importProject({
            projDir,
            slug,
            period: 'b',
            category,
            section: mappedSection,
            year: '1947–1977',
            publicBase: '/projects/1947-1977',
            outDir: OUT_US,
            importImages: true,
            usedSlugs: used,
          })
          usOtherEn.push(result.en)
          usOtherRo.push(result.ro)
          console.log(
            `OK b/${category}/${mappedSection}/${result.en.slug} hero=${result.en.hero ? 'y' : 'n'} imgs=${result.en.images.length}`,
          )
        }
      } else {
        const slug = slugify(childName)
        const result = await importProject({
          projDir: child,
          slug,
          period: 'b',
          category,
          section: null,
          year: '1947–1977',
          publicBase: '/projects/1947-1977',
          outDir: OUT_US,
          importImages: true,
          usedSlugs: used,
        })
        usOtherEn.push(result.en)
        usOtherRo.push(result.ro)
        console.log(
          `OK b/${category}/_/${result.en.slug} hero=${result.en.hero ? 'y' : 'n'} imgs=${result.en.images.length}`,
        )
      }
    }
  }

  const payload = {
    romaniaEn: ro.projectsEn,
    romaniaRo: ro.projectsRo,
    usaNewHousingEn: usHousing.projectsEn,
    usaNewHousingRo: usHousing.projectsRo,
    usaOtherEn: usOtherEn,
    usaOtherRo: usOtherRo,
  }

  const outPath = path.join(ROOT, 'scripts/import-result.json')
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2))
  console.log('\nWrote', outPath)
  console.log({
    romania: ro.projectsEn.length,
    usaNewHousing: usHousing.projectsEn.length,
    usaOther: usOtherEn.length,
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
