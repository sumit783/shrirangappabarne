// ======= Data (Manual Arrays) =======
const postsByYear = {
  2024: {
    "शैक्षणिक सहाय्य": [
      {
        caption:
          "शालेय विद्यार्थ्यांसाठी नवीन शैक्षणिक सहाय्य योजना जाहीर केली गेली.",
        img: "images/image-101.webp",
        url: "",
      },
      {
        caption:
          "विद्यार्थ्यांच्या विकासासाठी अतिरिक्त अभ्यास साहित्य वितरण केले गेले.",
        img: "images/image-102.webp",
        url: "",
      },
    ],
    "संसदीय समित्यांची सदस्यता – राजभाषा समिती": [
      {
        caption: "मुंबईत संसदीय राजभाषा समितीची महत्त्वपूर्ण बैठक संपन्न!",
        img: "images/image-99.webp",
        url: "",
      },
      {
        caption: "गुजरातच्या भूज येथे राजभाषा समितीची बैठक पार पडली.",
        img: "https://drive.google.com/file/d/1a_rDDY_cKS2TKa8mka9xbxi85RUWJyHn/view?usp=sharing",
        url: "",
      },
    ],
    "संसदीय समित्यांची सदस्यता – ऊर्जा स्थायी समिती": [],
    "मेट्रो विकास / मेट्रो मार्ग प्रस्ताव व विस्तार": [],
    "पायाभूत सुविधा सुधारणा (पूल, सार्वजनिक जागा इ.)": [],
    "सण-उत्सव व धार्मिक कार्यक्रम": [],
    "संसद रत्न पुरस्कार": [],
    "दैनंदिन कार्य व लोकसंपर्क": [],
    "जनकल्याण व सामाजिक उपक्रम": [],
    "पक्ष बांधणी व राजकीय उपक्रम": [],
    "समाज व सांस्कृतिक कार्यक्रम": [],
    "राजकारण व शासन": [],
    "संसदीय व विधिमंडळीन कार्य": [],
  },
  2025: {
    "शैक्षणिक सहाय्य": [],
    "संसदीय समित्यांची सदस्यता – राजभाषा समिती": [],
    "संसदीय समित्यांची सदस्यता – ऊर्जा स्थायी समिती": [],
    "मेट्रो विकास / मेट्रो मार्ग प्रस्ताव व विस्तार": [],
    "पायाभूत सुविधा सुधारणा (पूल, सार्वजनिक जागा इ.)": [
      {
        caption:
          "खासदार स्थानिक विकास निधीतून सांगवडे गावातील विठ्ठल मंदीर सभा मंडप व PMRDA च्या माध्यमातून सांगवडे ते नेरे या क्रॅाक्रिट रस्त्याचे भूमिपूजन काल माझ्या हस्ते करण्यात आले या प्रसंगी गावचे सरपंच रोहन जगताप,भाऊसाहेब पानमंद,किसन आमले,रामभाऊ सावंत,नामदेव आमले,पोपट राक्षे व ग्रामस्थ उपस्थित होते.",
        img: "https://instagram.fpnq16-1.fna.fbcdn.net/v/t51.293…ep8Rq7Y_L8O5snjKr7ME2w&oe=68CD6C28&_nc_sid=22de04.jpg",
        url: "https://www.instagram.com/p/C1ttONdA-ZV/?utm_source=ig_web_copy_link&igsh=NnQ0azZvYW00OWs5",
      },
    ],
    "सण-उत्सव व धार्मिक कार्यक्रम": [],
    "संसद रत्न पुरस्कार": [],
    "दैनंदिन कार्य व लोकसंपर्क": [],
    "जनकल्याण व सामाजिक उपक्रम": [],
    "पक्ष बांधणी व राजकीय उपक्रम": [],
    "समाज व सांस्कृतिक कार्यक्रम": [],
    "राजकारण व शासन": [],
    "संसदीय व विधिमंडळीन कार्य": [],
  },
};

// ======= DOM Elements =======
const yearButtonsDiv = document.getElementById("year-buttons");
const categoryButtonsDiv = document.getElementById("category-buttons");
const postContainer = document.getElementById("post-container");

let selectedYear = null;
let selectedCategory = null;

// ======= Display Year Buttons =======
Object.keys(postsByYear).forEach((year) => {
  const btn = document.createElement("button");
  btn.textContent = year;
  btn.addEventListener("click", () => {
    selectedYear = year;
    selectedCategory = null; // reset category
    highlightActiveButtons();
    showCategories(year);
  });
  yearButtonsDiv.appendChild(btn);
});

// ======= Show Categories for Selected Year =======
function showCategories(year) {
  categoryButtonsDiv.innerHTML = "";
  postContainer.innerHTML = "";

  Object.keys(postsByYear[year]).forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.addEventListener("click", () => {
      selectedCategory = category;
      highlightActiveButtons();
      showPosts(year, category);
    });
    categoryButtonsDiv.appendChild(btn);
  });

  highlightActiveButtons();
}

// ======= Highlight Active Buttons =======
function highlightActiveButtons() {
  Array.from(yearButtonsDiv.children).forEach((btn) => {
    btn.classList.toggle("active", btn.textContent === selectedYear);
  });

  Array.from(categoryButtonsDiv.children).forEach((btn) => {
    btn.classList.toggle("active", btn.textContent === selectedCategory);
  });
}

// ======= Show Posts =======
function showPosts(year, category) {
  postContainer.innerHTML = "";
  const posts = postsByYear[year][category];

  if (posts.length === 0) {
    postContainer.textContent = "अद्याप पोस्ट उपलब्ध नाहीत.";
    return;
  }

  posts.forEach((post) => {
    const card = document.createElement("div");
    card.className = "post-item";

    const img = document.createElement("img");
    img.src = post.img;
    img.alt = post.caption;

    const cap = document.createElement("div");
    cap.className = "post-caption";
    cap.textContent = post.caption;

    const viewBtn = document.createElement("button");
    viewBtn.textContent = "पोस्ट पहा";
    viewBtn.addEventListener("click", () => {
      if (post.url) {
        window.open(post.url, "_blank");
      } else {
        alert("इंस्टाग्राम पोस्ट लिंक उपलब्ध नाही.");
      }
    });

    card.appendChild(img);
    card.appendChild(cap);
    card.appendChild(viewBtn);
    postContainer.appendChild(card);
  });
}
