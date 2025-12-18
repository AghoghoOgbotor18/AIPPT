# AIPPT – AI‑Powered Presentation Generator

AIPPT is a full‑stack web application that generates **professional PowerPoint presentations automatically** from a simple topic description. It combines **AI‑generated content**, **auto‑selected images**, a **live slide editor**, and a **browser‑based preview & download flow**.

This project was built with a strong focus on **real‑world engineering challenges**, performance optimization, and browser limitations.

---

## 🚀 What AIPPT Does

1. User enters a presentation topic and preferences
2. AI generates structured slide content
3. Relevant images are automatically fetched
4. User edits slides in a live editor
5. App generates a **PPTX file**
6. User previews the presentation as **PDF** in the browser
7. User downloads the final PowerPoint file

---

## 🧠 Core Technologies

### Frontend

* **React + Vite**
* **Framer Motion** (animations, optimized with LazyMotion)
* **Firebase Authentication** (Email/Password + Google OAuth)
* **Axios** (API communication)
* **Tailwind CSS**

### Backend

* **Node.js / Express**
* **OpenAI API** (content generation)
* **Unsplash API** (image sourcing)
* **PptxGenJS** (PowerPoint generation)

---

## 🧠 How AI Content Generation Works (OpenAI)

Instead of generating plain text, the OpenAI API is used to return **structured JSON** that represents slides:

```json
{
  "slides": [
    {
      "type": "title",
      "title": "Introduction to AI",
      "content": "What artificial intelligence is"
    }
  ]
}
```

### Why JSON instead of text?

* Allows predictable slide layouts
* Makes slides editable in the UI
* Enables deterministic PPTX generation
* Prevents hallucinated formatting

This structure powers both:

* The **live slide editor**
* The **PPTX generation engine**

---

## 🖼️ Image Generation & the Unsplash Challenge

### How images are fetched

* Unsplash API is queried per slide topic
* A relevant image URL is returned

### ❌ The Problem

When generating the PowerPoint file, images:

* Displayed correctly in the browser
* **Did NOT appear in the downloaded PPTX**

### Why this happened

* PPTX files cannot embed **external URLs**
* Images must be **local binary data**

### ✅ The Solution: Image Caching & Embedding

1. Download Unsplash images on the server
2. Store them temporarily in an **image cache list**
3. Convert images to **Base64 / binary buffers**
4. Embed images directly into the PPTX using PptxGenJS

This ensured:

* Images appear correctly offline
* PPTX works on all devices
* No broken image links

---

## 🔐 Firebase Authentication Optimization

Firebase Auth initially added a **large bundle size**.

### Optimizations applied

* Switched to **modular Firebase imports**
* Imported only required auth methods
* Lazy‑loaded auth‑related components

Result:

* Firebase bundle reduced to ~17 KB (gzipped)
* No auth code loaded unless needed

---

## 📄 Why PDF Preview Instead of PPTX Preview

### ❓ Why not preview PPTX directly?

Browsers **cannot render PPTX files** natively.

### ✅ PDF Preview Solution

* Backend converts PPTX → PDF
* PDF is sent as **Base64**
* Browser displays it using an `<embed>` tag

### Benefits

* Instant preview
* No third‑party viewer
* Works on all browsers

---

## 🧱 What Is Base64 & Why It’s Used

Base64 is used to safely transfer **binary files** over JSON APIs.

### Used for:

* PPTX files
* PDF previews
* Embedded images

### Flow

```
Binary File → Base64 → API Response → Blob → Object URL
```

---

## 🌐 Blob, Object URLs & Memory Cleanup

### What is a Blob?

A Blob represents raw binary data in the browser.

### Why Object URLs?

* Allows browser to download or preview files
* Avoids storing large files in memory permanently

### Memory Cleanup (Important)

```js
URL.revokeObjectURL(blobUrl)
```

Cleanup happens when:

* Preview window closes
* User navigates away

This prevents memory leaks.

---

## ✨ Performance Optimization Journey

### Bundle Analysis

* Used `rollup-plugin-visualizer`
* Identified heavy dependencies

### Framer Motion Optimization

* Switched to `LazyMotion` + `domAnimation`
* Reduced unnecessary animation features
* Avoided global motion imports

### Result

* Smaller initial bundle
* Animations loaded only when needed

---

## 🖼️ Image Optimization Strategy

### Initial problem

* Hero image: **~4000 KB PNG**

### Improvements

* Converted to **WebP**
* Reduced to ~1300 KB

### Next steps (planned)

* Responsive images (`srcset`)
* Multiple sizes (mobile / desktop)
* Lazy loading below‑the‑fold images

---

## 🛠️ Slides Editor Architecture

### Key features

* Reorder slides
* Edit content live
* Real‑time preview

### State management

* Slides stored as JSON
* Immutable updates for performance

---

## ⚠️ Real Engineering Challenges Faced

### 1. Images missing in PPTX

✔ Solved with image caching + Base64 embedding

### 2. Large frontend bundle

✔ Solved with lazy loading & modular imports

### 3. Browser preview limitations

✔ Solved with PDF rendering

### 4. Memory leaks from Blob URLs

✔ Solved with cleanup on window unload

---

## 📌 Key Learnings

* Browsers have real limitations (PPTX rendering)
* Binary files require careful handling
* Performance optimization is iterative
* AI output must be structured, not free‑form
* Production apps need memory management

---

## 📦 Installation & Setup

```bash
npm install
npm run dev
```

Backend environment variables:

* `OPENAI_API_KEY`
* `UNSPLASH_ACCESS_KEY`


---

## 📈 Future Improvements

* Server‑side image resizing
* Slide templates marketplace
* User presentation history
* Cloud storage for generated files
* Team collaboration

---

## 🧑‍💻 Author

Built by a frontend‑focused engineer with basic backend integration skills, emphasizing **real‑world problem solving**, **performance**, and **clean architecture**.

---

