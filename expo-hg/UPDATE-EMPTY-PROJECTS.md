# Update empty projects

Instructions for filling archive projects that exist as routes but have no images yet.

All **50 empty projects** are currently **Romania** (`period: "a"`). They already have slugs, titles, categories, and sections in `src/assets/en.json` and `src/assets/ro.json`. Do **not** recreate them — only add media and keep both locale files in sync.

---

## When the user asks to update empty projects

1. Confirm the source folder (usually an external drive), e.g.  
   `/Volumes/KINGSTON/SITE H GEORGESCU/ROMANIA`
2. Find which project folders now contain images.
3. Convert / copy images into `public/projects/1933-1947/`.
4. Set `hero` + `images` on the matching entries in **both** `en.json` and `ro.json`.
5. Leave title / type / section / slug unchanged unless the user asks to rename.

---

## Source ↔ app mapping

| Archive folder | Route category | `period` |
|----------------|----------------|----------|
| `ROMANIA/LOCUIRE` | `housing` | `a` |
| `ROMANIA/EDIFICII PUBLICE` | `public-buildings` | `a` |
| `ROMANIA/EXPOZITII SI CONCURSURI` | `exhibition-competitions` | `a` |
| `ROMANIA/DESIGN` | `design` | `a` |
| `SUA/...` | same category names | `b` |

### Romania housing sections (subfolders)

| Archive subfolder | `section` value | Label key (`workSections`) |
|-------------------|-----------------|----------------------------|
| `UNIFAMILIALA` | `single-family` | `singleFamily` |
| `COLECTIVE` | `collective` | `collective` |
| `TEMPORARA` | `temporary` | `temporary` |

Public buildings, exhibition/competitions, and design are **flat** (no `section`).

Section order and labels live in:

- `src/lib/workSections.ts`
- `src/assets/en.json` → `workSections`
- `src/assets/ro.json` → `workSections`

Work listing UI: `src/pages/WorkPage.tsx` (groups by `section` when present).

---

## Empty project checklist (Romania)

An entry is empty when `hero` is `""` and `images` is `[]`.

### Housing — single-family (`/work/romania/housing`)

| Slug | EN title | Expected source folder |
|------|----------|------------------------|
| `coman` | Coman | `ROMANIA/LOCUIRE/UNIFAMILIALA/COMAN` |
| `felbab` | Felbab | `ROMANIA/LOCUIRE/UNIFAMILIALA/FELBAB` |
| `konteschweller` | Konteschweller | `ROMANIA/LOCUIRE/UNIFAMILIALA/KONTESCHWELLER` |
| `krammer` | Krammer | `ROMANIA/LOCUIRE/UNIFAMILIALA/KRAMMER` |

### Housing — collective

| Slug | EN title | Expected source folder |
|------|----------|------------------------|
| `burileanu-malaxa` | Burileanu–Malaxa | `.../COLECTIVE/BURILEANU-MALAXA` |
| `dimitrescu` | Dimitrescu | `.../COLECTIVE/DIMITRESCU` |
| `galotti` | Galotti | `.../COLECTIVE/GALOTTI` |
| `grofsoreanu` | Grofsoreanu | `.../COLECTIVE/GROFSOREANU` |
| `gross` | Gross | `.../COLECTIVE/GROSS` |
| `peritz` | Peritz | `.../COLECTIVE/PERITZ` |
| `sar-telefoane` | SAR Telefoane | `.../COLECTIVE/SAR TELEFOANE` |
| `schachter` | Schachter | `.../COLECTIVE/SCHACHTER` |
| `tanasescu` | Tănăsescu | `.../COLECTIVE/TANASESCU` |

### Housing — temporary

| Slug | EN title | Expected source folder |
|------|----------|------------------------|
| `casa-hurmuzescu-mangalia` | Casa Hurmuzescu, Mangalia | `.../TEMPORARA/CASA HURMUZESCU MANGALIA` |
| `casa-ing-mateescu-carmen-sylva` | Casa Ing. Mateescu, Carmen-Sylva | `.../TEMPORARA/CASA ING MATEESCU CARMEN-SYLVA` |
| `casa-prof-dimitrescu-mangalia` | Casa Prof. Dimitrescu, Mangalia | `.../TEMPORARA/CASA PROF DIMITRESCU MANGALIA` |

### Public buildings (`/work/romania/public-buildings`)

| Slug | Expected source folder under `EDIFICII PUBLICE/` |
|------|--------------------------------------------------|
| `ateliere-de-vagonaj-ale-societatii-concordia` | `ATELIERE DE VAGONAJ ALE SOCIETATII CONCORDIA` |
| `barul-melody` | `BARUL MELODY` |
| `casa-de-odihna-pentru-sar-telefoane-pucioasa` | `CASA DE ODIHNA PENTRU SAR TELEFOANE PUCIOASA` |
| `cinematograf-luxor` | `CINEMATOGRAF LUXOR` |
| `clubul-asociatiei-functionarilor-comunali-restaurant-ratoi` | `CLUBUL ASOCIATIEI FUNCTIONARILOR COMUNALI_RESTAURANT RATOI` |
| `fabrica-de-tesaturi-oltenia` | `FABRICA DE TESATURI OLTENIA` |
| `fabrici-de-industrializare-a-laptelui` | `FABRICI DE INDUSTRIALIZARE A LAPTELUI` |
| `halele-obor` | `HALELE OBOR` |
| `hotelul-aro-brasov` | `HOTELUL ARO BRASOV` |
| `hotelul-aro-sport` | `HOTELUL ARO SPORT` |
| `magazin-provizoriu` | `MAGAZIN PROVIZORIU` |
| `malaxa` | `MALAXA` |
| `restaurant-dorobanti` | `RESTAURANT DOROBANTI` |
| `restaurant-pescarus` | `RESTAURANT PESCARUS` |
| `sala-teatrului-cinema-aro` | `SALA TEATRULUI CINEMA ARO` |
| `sediul-companiei-de-telefoane-sibiu` | `SEDIUL COMPANIEI DE TELEFOANE SIBIU` |
| `sediul-societatii-asigurarea-romaneasca` | `SEDIUL SOCIETATII ASIGURAREA ROMANEASCA` |
| `vitrina-florala` | `VITRINA FLORALA` |
| `yacht-club-eforie` | `YACHT CLUB EFORIE` |

### Exhibition & competitions (`/work/romania/exhibition-competitions`)

| Slug | Expected source folder under `EXPOZITII SI CONCURSURI/` |
|------|--------------------------------------------------------|
| `concurs-pentru-banca-de-economii-bucuresti` | `CONCURS PENTRU BANCA DE ECONOMII BUCURESTI` |
| `concurs-pentru-hotelurile-ont` | `CONCURS PENTRU HOTELURILE ONT` |
| `concurs-pentru-manastirea-sambata-de-sus` | `CONCURS PENTRU MANASTIREA SAMBATA DE SUS` |
| `concurs-pentru-memorialul-eroilor-de-razboi` | `CONCURS PENTRU MEMORIALUL EROILOR DE RAZBOI` |
| `concurs-pentru-palatul-primariei-municipiului-bucuresti` | `CONCURS PENTRU PALATUL PRIMARIEI MUNICIPIULUI BUCURESTI` |
| `concurs-pentru-refacerea-teatrului-national` | `CONCURS PENTRU REFACEREA TEATRULUI NATIONAL` |
| `concurs-pentru-sediul-institutului-national-al-cooperatiei` | `CONCURS PENTRU SEDIUL INSTITUTULUI NATIONAL AL COOPERATIEI` |
| `expozitia-luna-bucurestilor` | `EXPOZITIA LUNA BUCURESTILOR` |
| `expozitia-munca-si-voe-buna` | `EXPOZITIA MUNCA SI VOE BUNA` |
| `expozitia-transnistriei` | `EXPOZITIA TRANSNISTRIEI` |
| `pavilionul-floarea-soarelui` | `PAVILIONUL FLOAREA SOARELUI` |
| `standurile-romaniei-la-targurile-de-mostre-din-lipsca-si-viena` | `Standurile României la Târgurile...` |

### Design (`/work/romania/design`)

| Slug | Expected source folder under `DESIGN/` |
|------|----------------------------------------|
| `amenajare-apartament-gomoescu` | `AMENAJARE APARTAMENT GOMOESCU` |
| `amenajare-bucatarie-aro` | `AMENAJARE BUCATARIE ARO` |
| `amenajare-interior-dimitrescu` | `AMENAJARE INTERIOR DIMITRESCU` |

---

## Image rules

### Hero

- Prefer any file whose name contains **`hero`** (case-insensitive), e.g. `HERO_....tif`, `HERO_....jpg`.
- If none exists, leave `hero` empty **or** ask the user whether to use the first gallery image as hero.
- Output file: `public/projects/1933-1947/{slug}-hero.jpg`
- JSON: `"hero": "/projects/1933-1947/{slug}-hero.jpg"`

### Gallery

- All other image files in the project folder (recursive): `.jpg`, `.jpeg`, `.png`, `.webp`, `.tif`, `.tiff`, `.gif`
- Exclude hero files from `images[]`
- Output: `public/projects/1933-1947/{slug}-01.jpg`, `-02.jpg`, …
- JSON: absolute site paths, same pattern

### USA images (reference)

USA media already lives under `public/projects/1947-1977/`. Same naming convention.

### Compression (required for large archives)

Use **sharp** (already a devDependency):

- Max edge: **1600px**
- JPEG quality: **78**, `mozjpeg: true`
- `rotate()` for EXIF orientation
- `failOn: 'none'` for quirky TIFFs

Example approach: see `scripts/import-archive.mjs` (prior bulk import). Reuse or adapt it; do not commit huge uncompressed TIFs into `public/`.

---

## JSON project shape

Update the **existing** object in both locales. Fields:

```json
{
  "slug": "coman",
  "index": "01",
  "title": "Coman",
  "year": "1933–1947",
  "type": "Residential",
  "desc": "...",
  "body": "...",
  "hero": "/projects/1933-1947/coman-hero.jpg",
  "images": [
    "/projects/1933-1947/coman-01.jpg"
  ],
  "period": "a",
  "category": "housing",
  "section": "single-family"
}
```

Notes:

- `section` is optional — omit for flat categories.
- Keep `slug` stable (URLs depend on it).
- Update **en.json and ro.json** together (`hero` / `images` are identical; titles may differ).
- Empty projects intentionally keep placeholder `desc` / `body` until real text is provided.

---

## Adding a brand-new project (not just filling an empty one)

1. Add folder under the correct archive category / section.
2. Create matching entries in `en.json` + `ro.json`.
3. Import images as above.
4. If a **new section** is needed:
   - Add key to `src/lib/workSections.ts` (`WorkSectionKey`, `WORK_SECTION_LABEL_KEYS`, `WORK_SECTIONS_BY_CATEGORY`)
   - Add labels under `workSections` in both locale files
5. No new React routes — `/work/{romania|usa}/{category}/{slug}` already covers it.

---

## Display behaviour (do not regress)

- **Work list cards**: `object-fit: cover` (fill thumbnail).
- **Project detail + gallery**: `object-fit: contain` (full drawing visible).
- **Fullscreen gallery**: image at ~75vw × 75vh, contain.
- Empty projects show a placeholder frame on cards and on the detail page until `hero` / `images` are set.

---

## Quick verification

After updating a project:

```bash
# hero/images files exist
ls public/projects/1933-1947/{slug}*

# no broken paths in JSON
# (optional) open /work/romania/{category}/{slug}
```

Confirm both EN and RO locale files list the same `hero` and `images` arrays for that slug.
