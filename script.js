/* ============================================================
   script.js – Quality Pharmaceuticals
   ============================================================ */

// ── Loading Screen ──────────────────────────────────────────
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
});

// ── Navbar: scroll effect + mobile toggle ───────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 100);
});

const mobileMenu = document.querySelector('.mobile-menu');
const navLinks   = document.querySelector('.nav-links');
if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── Smooth Scrolling ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (navLinks) navLinks.classList.remove('open');
        }
    });
});

// ── AOS Initialization ───────────────────────────────────────
if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 100 });
}

// ── Stats Counter Animation ──────────────────────────────────
function animateCounters() {
    document.querySelectorAll('[data-target]').forEach(counter => {
        const target    = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current     = 0;
        const suffix    = target > 100 ? '+' : '';

        const update = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(update);
            } else {
                counter.textContent = target + suffix;
            }
        };
        update();
    });
}

// ── Fade-in + Stats Observer ─────────────────────────────────
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.querySelector('[data-target]')) animateCounters();
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// ── Product Cards: staggered appearance ──────────────────────
const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
        }
    });
});
document.querySelectorAll('.product-card').forEach(card => productObserver.observe(card));

// ── Parallax on floating icons ───────────────────────────────
window.addEventListener('scroll', () => {
    const icons = document.querySelector('.floating-icons');
    if (icons) icons.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
});

// ── Testimonial auto-slider ───────────────────────────────────
(function () {
    const slider = document.getElementById('testimonialSlider');
    if (!slider) return;
    const slides = slider.querySelectorAll('.testimonial');
    if (!slides.length) return;
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % slides.length;
        slider.scrollTo({ left: idx * slider.clientWidth, behavior: 'smooth' });
    }, 5000);
})();

// ── Contact Form ──────────────────────────────────────────────
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        e.target.reset();
    });
}

// ── Products Data ─────────────────────────────────────────────
const products = [
    {
        "name": "QuasoCOL",
        "price": "₹100",
        "desc": "This proprietary Ayurvedic medicine is a comprehensive herbal formula primarily indicated for addressing menstrual disorders, including painful, irregular, or delayed cycles. Enriched with a potent blend of traditional ingredients such as Ashoka Bark, Kala Jeera, and Arjuna Bark, the syrup is formulated to alleviate physical weakness, anemia, and pelvic pain. Designed for Improved Quality, this health tonic serves as a restorative supplement to support reproductive health and overall vitality.",
        "icon": "fas fa-capsules",
        "images": [
            "images/QuasoCOL1.png",
            "images/QuasoCOL2.png",
            "images/QuasoCOL3.png",
            "images/QuasoCOL4.png"
        ],
        "ingredients": [
            {
                "name": "Ashoka Bark",
                "img": "images/Ashoka Bark.jpg",
                "desc": "Ashoka bark is a highly valued Ayurvedic ingredient traditionally used to support women's wellness and reproductive health. It may help promote hormonal balance, comfort, and overall vitality."
            },
            {
                "name": "Kala Jeera Seed",
                "img": "images/Kala Jeera Seed.jpg",
                "desc": "Kala Jeera seeds are traditionally used in Ayurveda for their digestive and wellness-supporting properties. They may help support digestion, metabolism, and overall body balance."
            },
            {
                "name": "Daru Haldi Rhizome",
                "img": "images/Daru Haldi Rhizome.jpg",
                "desc": "Daru Haldi rhizome is known in Ayurveda for its cleansing and anti-inflammatory properties. It may help support skin health, digestion, immunity, and overall wellness."
            },
            {
                "name": "Lal Chandan Powder",
                "img": "images/Lal Chandan Powder.jpg",
                "desc": "Lal Chandan powder, also known as Red Sandalwood, is valued for its cooling and soothing properties. It may help support skin wellness, relaxation, and overall natural balance."
            },
            {
                "name": "Chansoor Seed",
                "img": "images/Chansoor Seed.jpg",
                "desc": "Chansoor seeds are rich in nutrients and traditionally used in Ayurveda to support strength, digestion, and overall wellness. They may also help promote energy and nourishment."
            },
            {
                "name": "Konch Seed",
                "img": "images/Konch Seed.jpg",
                "desc": "Konch seeds, also known as Mucuna Pruriens, are valued in Ayurveda for supporting strength, stamina, nervous system health, and overall vitality."
            },
            {
                "name": "Arjuna Bark",
                "img": "images/Arjuna Bark.jpg",
                "desc": "Arjuna bark is a respected Ayurvedic ingredient traditionally used to support heart health and circulation. It may help promote cardiovascular wellness, stamina, and overall vitality."
            },
            {
                "name": "Punarnava Root",
                "img": "images/Punarnava Root.jpg",
                "desc": "Punarnava root is widely used in Ayurveda for its rejuvenating and cleansing properties. It may help support kidney health, digestion, fluid balance, and overall body wellness."
            },
            {
                "name": "Palash Flowers",
                "img": "images/Palash Flowers.jpg",
                "desc": "Palash flowers are traditionally used in Ayurveda for their cleansing and wellness-supporting properties. They may help support digestion, skin wellness, and overall natural health."
            }
        ],
        "quantities": [
            {
                "label": "225ML",
                "price": "₹100"
            },
            {
                "label": "450ML",
                "price": "₹175"
            }
        ]
    },
    {
        "name": "Femina",
        "price": "₹50",
        "desc": "Boosts immunity and overall health. Our Femina capsules contain 500mg of ascorbic acid with added bioflavonoids for enhanced absorption. This powerful antioxidant supports immune system function, collagen synthesis, and protects cells from oxidative stress. Ideal for daily wellness and immune defense.",
        "icon": "fas fa-capsules",
        "images": [
            "images/Femina1.PNG.png",
            "images/Femina2.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Ashoka Bark",
                "img": "images/Ashoka Bark.jpg",
                "desc": "Ashoka bark is a revered Ayurvedic herb traditionally used to support women's reproductive health and menstrual wellness."
            },
            {
                "name": "Lodhra Bark",
                "img": "data:image/jpeg;base64,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7HwZJaqtSVYKcA4GwPsMeRJOp0pVfVpGVcAlSP7+8htpC9KWpZzOPtA2PKOuCfMp/LefpQoamdlJI3ztg49/cd5gNPNbz8vMBtgbfBmZm5MLZnIOObtnoBn3kzRaC7WXLpqtySGDEYCjofiRq7TemTu3P0Nwc2WHXW1ZRXP6fPnoWx/aepUIVrAM1nA+GjSaKmvJfkUAMepm8VQBPV4sOjHTw+fk+pnclgSXBZdyy4CasVoWXYlQJXEC3EriVxK4gUxGJXEYgAJXERAREQEREBERAREQEREBERAREQEREBERAREQKSsRAREQgiUlYSREQgiIhJERCFjGRrcnOJJaYmGZIichJ3MyqoEv5Jcq4gAsu5JcBLsQMfIJXlEvCy7lhLHyyuJfiMbwLOWOWX4giQLMSnLMmIxJGLllOSZcRiBi5JaUmfEtIgYuSU5ZmxKcsDDyynJ7TPyynLAwemPEt9MSRyynLIEVq89pDuoBB2m1KTC9YOYHMa7RB1O04nWaG/g3E34hoqWsru21lCnGVx/Oo8gdR3E9QvoDA7TS63QhskDcbiU5OOZ46rTj5Lx5bji7fRWutqMPp9QOalu2MZwD79pHesLQWU8pVyCewHQbdpvn4UiA10oldbZLVgYGc5yD2Oevaa6/RNUwR67LFIwwXJyD39x5nl8nFlx3vOz1+Lnx5J2vdptRUecuVDKQQQg6jsR/rO6+leEGjSo7rh7cMRnPKOw379zNPwzhJfXIj1/w1BI2IwO2Pk9p6Jw7T8qhiNzOn43FN9dcvzOe6+nP/wBTqKwqAATPiFXAl2J3POUxGJXErApiVxEQGIxEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERASkrEIIiISREQggxEC0iWkS+MSRj5ZULL8QBAoFlZWJAYiIhJERAREQEREBGIiBTEYlYgUxKYl2JTECmIxK4MYgWYjEvxGIFhWY2WZsShWBEevIO0hX0A52m1ZZgevPaBzWq0eCWAkVUKnE6S7T82dpCbQAtuI0MGhqLMCd50dCcqiQ9JpxWAAJsUG0DJERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREB3iIhBEpKwESkrAREYgU6mVxEQGIiISREZgIiICIiAiIgIiICIiAiIgIiICIiAiIgMSmJWIFpEsZfaZZQiBgZB4lnpA9pIKwEkjEqYmZRge0AS6QEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQESn9ZXvCDvBlJWBSViIFJWIgIiISREQEREBERAR3iICIiAiIgIiICIiAiIgIiICIiAiIgIiIDEYiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgf/9k=",
                "desc": "Lodhra bark is widely valued in Ayurveda for its cooling and astringent properties. It may help support women's wellness and promote healthy skin."
            },
            {
                "name": "Konch Seed",
                "img": "images/Konch Seed.jpg",
                "desc": "Konch seed is a powerful Ayurvedic ingredient known for supporting strength, stamina, and nervous system health."
            },
            {
                "name": "Sonth Rhizome",
                "img": "images/Sonth Rhizome.jpg",
                "desc": "Sonth rhizome, or dried ginger, is highly valued in Ayurveda for its warming and digestive properties."
            },
            {
                "name": "Ashwagandha Root",
                "img": "images/Ashwagandha Root.jpg",
                "desc": "Ashwagandha root is a renowned Ayurvedic herb known for its adaptogenic and rejuvenating properties."
            },
            {
                "name": "Shatavari Root",
                "img": "images/Shatavari Root.jpg",
                "desc": "Shatavari root is a highly respected Ayurvedic herb traditionally used to support women's health and hormonal balance."
            },
            {
                "name": "Gokhru Fruit",
                "img": "images/Gokhru Fruit.jpg",
                "desc": "Gokhru fruit is valued in Ayurveda for supporting urinary health, stamina, and vitality."
            }
        ],
        "quantities": [
            {
                "label": "10CAPS",
                "price": "₹50"
            }
        ]
    },
    {
        "name": "Liv-top",
        "price": "₹100.00",
        "desc": "Liv-top Syrup is marketed as a Liver Stimulant & Tonic and is intended to be a dietary supplement. Enriched with powerful Ayurvedic herbs including Bhringraj, Arjun bark, Makoi, and Tulsi, it is formulated to support healthy liver function and overall wellness. GMP-certified and trusted since 1967.",
        "icon": "fas fa-lungs",
        "images": [
            "images/Liv-top 1.PNG.png",
            "images/Liv-top 2.PNG.png",
            "images/Liv-top 3.PNG.png",
            "images/Liv-top 4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Bhringraj Plant",
                "img": "images/Bhringraj plant.PNG.jpg",
                "desc": "Bhringraj is a medicinal herb widely used in Ayurveda, known for supporting liver health and hair growth."
            },
            {
                "name": "Arjun Bark",
                "img": "images/Arjun Bark.PNG.jpg",
                "desc": "Arjuna bark contains natural antioxidants that may help strengthen heart muscles and improve blood circulation."
            },
            {
                "name": "Makoi Fruit",
                "img": "images/Makoi fruit.PNG",
                "desc": "Makoi, also known as Black Nightshade, may help reduce inflammation and support liver function."
            },
            {
                "name": "Tulsi Leaf",
                "img": "images/Tulsi leaf.PNG",
                "desc": "Tulsi, Holy Basil, is known for boosting immunity and supporting respiratory health."
            },
            {
                "name": "Pittapapda Plant",
                "img": "images/Pittapapda plant.PNG",
                "desc": "Pittapapda is an Ayurvedic herb traditionally used for liver health, skin problems, and body cooling."
            },
            {
                "name": "Sarpunkha Panchang",
                "img": "images/Sarpunkha Panchang.PNG.PNG",
                "desc": "Sarpunkha is traditionally known for supporting liver and spleen health, improving digestion, and body detoxification."
            },
            {
                "name": "Vidanga Seed",
                "img": "images/Vidanga seed.PNG",
                "desc": "Vidanga seeds are widely used for digestive and detox support, with anti-parasitic and antimicrobial properties."
            },
            {
                "name": "Ghritkumari Sap",
                "img": "images/Ghritkumari sap.PNG",
                "desc": "Ghritkumari sap (Aloe Vera) may help improve digestion, support liver health, and boost hydration."
            }
        ],
        "quantities": [
            {
                "label": "110ML Syrup",
                "price": "₹70"
            },
            {
                "label": "220ML Syrup",
                "price": "₹100"
            },
            {
                "label": "30ML Drops",
                "price": "₹50",
                "images": [
                    "images/LivtopDrops1.PNG.png",
                    "images/LivtopDrops2.PNG.png"
                ]
            },
            {
                "label": "10 CAPS",
                "price": "₹50",
                "images": [
                    "images/Liv-top 7.PNG.png",
                    "images/Liv-top 8.PNG.png"
                ]
            }
        ]
    },
    {
        "name": "QoughSOL",
        "price": "₹50",
        "desc": "QoughSol is an herbal cough syrup that provides quick relief from various cough symptoms. As a GMP-certified product established in 1967, it blends long-standing tradition with certified manufacturing standards to support respiratory health.",
        "icon": "fas fa-bacteria",
        "images": [
            "images/Qoughsol 1.PNG.png",
            "images/Qoughsol 2.PNG.png",
            "images/Qoughsol 3.PNG.png",
            "images/Qoughsol 4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Vasika Leaves",
                "img": "images/Vasika leaf.jpg",
                "desc": "Vasika leaves are a well-known Ayurvedic herb traditionally used to support respiratory and lung health."
            },
            {
                "name": "Tulsi Leaf",
                "img": "images/Tulsi leaf.PNG",
                "desc": "Tulsi, Holy Basil, is a popular Ayurvedic herb known for boosting immunity and supporting respiratory health."
            },
            {
                "name": "Mulethi Rhizome",
                "img": "images/Mulethi rhizome.jpg",
                "desc": "Mulethi (Licorice root) is used in Ayurveda for soothing throat irritation and respiratory support."
            },
            {
                "name": "Khareti",
                "img": "images/Khareti.jpg",
                "desc": "Khareti is a traditional Ayurvedic herb known for its strengthening and rejuvenating properties."
            },
            {
                "name": "Amaltas Pulp",
                "img": "images/Amaltas pulp.jpg",
                "desc": "Amaltas pulp is a widely used Ayurvedic ingredient known for its gentle cleansing and digestive-supporting properties."
            },
            {
                "name": "Neelophar",
                "img": "images/Neelophar.jpg",
                "desc": "Neelophar (Blue Lotus) may help promote relaxation, reduce stress, and support restful sleep."
            },
            {
                "name": "Unnab",
                "img": "images/Unnab.jpg",
                "desc": "Unnab (Jujube) may help support respiratory health, improve digestion, and strengthen immunity."
            },
            {
                "name": "Banafsha",
                "img": "images/Banafsha.jpg",
                "desc": "Banafsha (Sweet Violet) may help support respiratory health and relieve cough and throat irritation."
            },
            {
                "name": "Peppermint",
                "img": "images/Peppermint.jpg",
                "desc": "Peppermint is a refreshing herb known for its cooling and digestive-supporting properties."
            }
        ],
        "quantities": [
            {
                "label": "60ML",
                "price": "₹50"
            },
            {
                "label": "110ML",
                "price": "₹70"
            }
        ]
    },
    {
        "name": "Infantol (Babies Tonic)",
        "price": "₹55",
        "desc": "Infantol (Babies Tonic) is a gentle health tonic specially formulated for babies to support healthy growth, digestion, immunity, and overall development. Made with carefully selected ingredients, it helps promote strength, appetite, and daily wellness in growing children.",
        "icon": "fas fa-bone",
        "images": [
            "images/Infantol (Babies Tonic)1.PNG.png",
            "images/Infantol (Babies Tonic)2.PNG.png",
            "images/Infantol (Babies Tonic)3.PNG.png",
            "images/Infantol (Babies Tonic)4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Javitri Leaves",
                "img": "images/Javitri leaves.jpg",
                "desc": "Javitri leaves are valued for their aromatic and wellness-supporting properties."
            },
            {
                "name": "Pushkarmool Root",
                "img": "images/Pushkarmool root.jpg",
                "desc": "Pushkarmool root is used to support respiratory and heart health."
            },
            {
                "name": "Atis Root",
                "img": "images/Atis root.jpg",
                "desc": "Atis root is valued for its digestive and wellness-supporting properties."
            },
            {
                "name": "Black Pepper Seeds",
                "img": "images/Black Pepper seeds.jpg",
                "desc": "Black Pepper seeds may help improve digestion and boost immunity."
            },
            {
                "name": "Unnab",
                "img": "images/Unnab.jpg",
                "desc": "Unnab (Jujube) supports respiratory health, digestion, and immunity."
            },
            {
                "name": "Nagarmotha Root",
                "img": "images/Nagarmotha root.jpg",
                "desc": "Nagarmotha root is known for its digestive and detoxifying properties."
            },
            {
                "name": "Kantkari",
                "img": "images/Kantkari.jpg",
                "desc": "Kantkari is widely used for respiratory health support."
            },
            {
                "name": "Baheda Root",
                "img": "images/Baheda root.jpg",
                "desc": "Baheda root is valued for its detoxifying and rejuvenating properties."
            },
            {
                "name": "Tulsi Leaf",
                "img": "images/Tulsi leaf.PNG",
                "desc": "Tulsi boosts immunity and supports respiratory health."
            }
        ],
        "quantities": [
            {
                "label": "60ML Syrup",
                "price": "₹55"
            },
            {
                "label": "30ML Drops",
                "price": "₹45",
                "images": [
                    "images/Infantol Drops1.PNG.png",
                    "images/Infantol Drops2.PNG.png",
                    "images/Infantol Drops3.PNG.png",
                    "images/Infantol Drops4.PNG.png"
                ]
            }
        ]
    },
    {
        "name": "Infantol (Family Tonic)",
        "price": "₹70",
        "desc": "Infantol (Family Tonic) is a nourishing family health tonic formulated to support overall wellness, immunity, digestion, and daily energy levels. Enriched with beneficial herbal ingredients, it helps maintain strength and vitality for all age groups as part of a healthy lifestyle.",
        "icon": "fas fa-heart",
        "images": [
            "images/Infantol1.PNG.png",
            "images/Infantol2.PNG.png",
            "images/Infantol3.PNG.png",
            "images/Infantol4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Pokharmool Root",
                "img": "images/Pokharmool root.jpg",
                "desc": "Pokharmool root is valued for supporting respiratory and heart health."
            },
            {
                "name": "Atees Root",
                "img": "images/Atees root.jpg",
                "desc": "Atees root supports digestion, appetite, and overall wellness."
            },
            {
                "name": "Pepper Seed",
                "img": "images/pepper seed.jpg",
                "desc": "Pepper seeds support digestion, metabolism, and immunity."
            },
            {
                "name": "Unnab",
                "img": "images/Unnab.jpg",
                "desc": "Unnab (Jujube) supports respiratory health and immunity."
            },
            {
                "name": "Nagarmotha Root",
                "img": "images/Nagarmotha root.jpg",
                "desc": "Nagarmotha root supports digestion and detoxification."
            },
            {
                "name": "Kantkari Herb",
                "img": "images/Kantkari herb.jpg",
                "desc": "Kantkari supports respiratory wellness."
            },
            {
                "name": "Baheda Root",
                "img": "images/Baheda root.jpg",
                "desc": "Baheda root supports detoxification and respiratory health."
            },
            {
                "name": "Tulsi Leaf",
                "img": "images/Tulsi leaf.PNG",
                "desc": "Tulsi boosts immunity and supports respiratory health."
            },
            {
                "name": "Bhringraj Seed",
                "img": "images/Bhringraj seed.jpg",
                "desc": "Bhringraj seeds support hair health, liver function, and overall wellness."
            }
        ],
        "quantities": [
            {
                "label": "100ML",
                "price": "₹70"
            },
            {
                "label": "200ML",
                "price": "₹100"
            }
        ]
    },
    {
        "name": "Energyon",
        "price": "₹110",
        "desc": "EnergyOn Syrup is a proprietary Ayurvedic restorative tonic designed to support overall physical and mental well-being. Formulated with Ashwagandha, Shatavari, Kesar (Saffron), and Amla, this syrup is indicated for addressing poor stamina, malnutrition, and lack of appetite.",
        "icon": "fas fa-bolt",
        "images": [
            "images/Energyon1.png",
            "images/Energyon2.png",
            "images/Energyon3.png",
            "images/Energyon4.png"
        ],
        "ingredients": [
            {
                "name": "Ashwagandha Root",
                "img": "images/Ashwagandha Root.jpg",
                "desc": "Ashwagandha root is known for its adaptogenic and rejuvenating properties."
            },
            {
                "name": "Shatawari Root",
                "img": "images/Shatawari Root.jpg",
                "desc": "Shatawari root supports vitality, hormonal balance, and overall wellness."
            },
            {
                "name": "Kavach Seed",
                "img": "images/Kavach Seed.jpg",
                "desc": "Kavach seed supports strength, stamina, and nervous system health."
            },
            {
                "name": "Vidarikand Root",
                "img": "images/Vidarikand Root.jpg",
                "desc": "Vidarikand root supports energy, physical strength, and immunity."
            },
            {
                "name": "Shankhpushpi Herb",
                "img": "images/Shankhpushpi Herb.jpg",
                "desc": "Shankhpushpi supports memory, focus, and mental wellness."
            },
            {
                "name": "Brahmi Booti",
                "img": "images/Brahmi Booti.jpg",
                "desc": "Brahmi supports memory, concentration, and nervous system wellness."
            },
            {
                "name": "Amla Fruit",
                "img": "images/Amla Fruit.jpg",
                "desc": "Amla is rich in antioxidants and Vitamin C, supporting immunity and digestion."
            },
            {
                "name": "Punarnava Root",
                "img": "images/Punarnava Root.jpg",
                "desc": "Punarnava root supports kidney health, digestion, and overall body wellness."
            },
            {
                "name": "Arjuna Bark",
                "img": "images/Arjuna Bark.jpg",
                "desc": "Arjuna bark supports heart health, circulation, and overall vitality."
            }
        ],
        "quantities": [
            {
                "label": "100ML Syrup",
                "price": "₹70"
            },
            {
                "label": "200ML Syrup",
                "price": "₹100"
            },
            {
                "label": "10CAPS",
                "price": "₹110",
                "images": [
                    "images/Energyoncaps1.png",
                    "images/Energyoncaps2.png"
                ]
            }
        ]
    },
    {
        "name": "M.C Plus",
        "price": "₹60",
        "desc": "M.C Plus is a specialized Ayurvedic proprietary medicine formulated to support women's reproductive wellness. Designed for menstrual irregularities, these capsules leverage a traditional blend of botanical extracts to help regulate and restore a healthy monthly cycle.",
        "icon": "fas fa-female",
        "images": [
            "images/M.C Plus syrup1.PNG.png",
            "images/M.C Plus syrup2.PNG.png",
            "images/M.C Plus syrup3.PNG.png",
            "images/M.C Plus syrup4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Kalaunji",
                "img": "images/Kalaunji.PNG.png",
                "desc": "Kalonji (Black Seed) may help support immunity, digestion, and heart health."
            },
            {
                "name": "Kapasmool",
                "img": "images/Kapasmool.PNG.png",
                "desc": "Kapasmool supports women's health, digestion, and pain relief."
            },
            {
                "name": "Olatkambal",
                "img": "images/Olatkambal.PNG.png",
                "desc": "Olatkambal root supports women's reproductive health and healthy menstrual cycles."
            },
            {
                "name": "Gajar Seed",
                "img": "images/Gajar seed.PNG.png",
                "desc": "Gajar seeds support digestion, urinary health, and body balance."
            },
            {
                "name": "Indrayan",
                "img": "images/Indrayan.PNG.png",
                "desc": "Indrayan supports detoxification and digestive health."
            },
            {
                "name": "Soya",
                "img": "images/Soya.PNG.png",
                "desc": "Soya seeds are rich in protein, fiber, vitamins, and antioxidants."
            },
            {
                "name": "Kala Til",
                "img": "images/Kala Til.PNG.jpg",
                "desc": "Kala Til (Black Sesame) supports bone strength, heart health, and digestion."
            },
            {
                "name": "Muli",
                "img": "images/Muli.PNG.png",
                "desc": "Muli seeds support digestion and liver function."
            },
            {
                "name": "Sonth",
                "img": "images/Sonth.PNG.png.jpg",
                "desc": "Sonth (Dry Ginger) improves digestion and reduces inflammation."
            }
        ],
        "quantities": [
            {
                "label": "100ML Syrup",
                "price": "₹80"
            },
            {
                "label": "200ML Syrup",
                "price": "₹125"
            },
            {
                "label": "6CAPS",
                "price": "₹60",
                "images": [
                    "images/M.E Plus1.PNG.png",
                    "images/M.E Plus2.PNG.png"
                ]
            }
        ]
    },
    {
        "name": "Quality LAL TEL",
        "price": "₹50",
        "desc": "Quality Lal Tel is a premium baby massage oil specially formulated to strengthen bones and improve muscle tone. Enriched with Till Oil (Sesame) and traditional herbs like Shankhapushpi and Arjuna Bark, this GMP-certified oil deeply nourishes delicate skin while promoting physical development.",
        "icon": "fas fa-baby",
        "images": [
            "images/Quality lal tel1.PNG.png",
            "images/Quality lal tel2.PNG.png",
            "images/Quality lal tel3.PNG.png",
            "images/Quality lal tel4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Shankhapushpi",
                "img": "images/Shankhapushpi.jpg",
                "desc": "Shankhapushpi supports brain and nervous system health."
            },
            {
                "name": "Manjistha Root",
                "img": "images/Manjistha root.jpg",
                "desc": "Manjistha root supports healthy skin and natural body cleansing."
            },
            {
                "name": "Daruharidra Root",
                "img": "images/Daruharidra root.jpg",
                "desc": "Daruharidra root supports liver health, healthy skin, and immunity."
            },
            {
                "name": "Arjun Bark",
                "img": "images/Arjun Bark.PNG.jpg",
                "desc": "Arjuna bark supports heart health and blood circulation."
            },
            {
                "name": "Urad Seeds",
                "img": "images/Urad seeds.jpg",
                "desc": "Urad seeds are highly nutritious, supporting strength and digestion."
            },
            {
                "name": "Ratanjot",
                "img": "images/Ratanjot.jpg",
                "desc": "Ratanjot supports skin health with cooling and anti-inflammatory properties."
            },
            {
                "name": "Karpoor",
                "img": "images/Karpoor.jpg",
                "desc": "Karpoor (Camphor) supports respiratory comfort and relaxation."
            },
            {
                "name": "Neem Oil",
                "img": "images/Neem oil.jpg",
                "desc": "Neem oil supports healthy skin and protection from infections."
            },
            {
                "name": "Kala Til Oil",
                "img": "images/Til tel.jpg",
                "desc": "Sesame oil supports joint and bone health and promotes overall strength."
            }
        ],
        "quantities": [
            {
                "label": "50ML",
                "price": "₹50"
            },
            {
                "label": "100ML",
                "price": "₹80"
            }
        ]
    },
    {
        "name": "Quality Gripe Water",
        "price": "₹43",
        "desc": "Quality Gripe Water is a trusted Ayurvedic formulation designed to provide gentle relief for babies from common digestive discomforts including colic, gas, and indigestion. Made with time-tested herbal ingredients, it supports healthy digestion and comfort in infants.",
        "icon": "fas fa-baby",
        "images": [],
        "ingredients": [
            {
                "name": "Bhringraj Plant",
                "img": "images/Bhringraj plant.PNG.jpg",
                "desc": "Bhringraj supports liver health and overall wellness."
            },
            {
                "name": "Arjun Bark",
                "img": "images/Arjun Bark.PNG.jpg",
                "desc": "Arjuna bark supports heart health and blood circulation."
            },
            {
                "name": "Makoi Fruit",
                "img": "images/Makoi fruit.PNG",
                "desc": "Makoi supports liver function and improves digestion."
            },
            {
                "name": "Tulsi Leaf",
                "img": "images/Tulsi leaf.PNG",
                "desc": "Tulsi boosts immunity and supports respiratory health."
            },
            {
                "name": "Pittapapda Plant",
                "img": "images/Pittapapda plant.PNG",
                "desc": "Pittapapda supports liver health, skin wellness, and body cooling."
            },
            {
                "name": "Sarpunkha Panchang",
                "img": "images/Sarpunkha Panchang.PNG.PNG",
                "desc": "Sarpunkha supports liver and spleen health and body detoxification."
            },
            {
                "name": "Vidanga Seed",
                "img": "images/Vidanga seed.PNG",
                "desc": "Vidanga seeds support gut health and natural body cleansing."
            },
            {
                "name": "Ghritkumari Sap",
                "img": "images/Ghritkumari sap.PNG",
                "desc": "Aloe Vera sap supports liver health, digestion, and hydration."
            }
        ],
        "quantities": [
            {
                "label": "100ML",
                "price": "₹43"
            }
        ]
    },
    {
        "name": "DADOL Skin Ointment",
        "price": "₹45",
        "desc": "This Ayurvedic skin ointment is a specialized herbal formula enriched with Neem to effectively treat various fungal and inflammatory skin conditions. It is specifically indicated for the relief of ringworm, scabies, eczema, and itchy skin.",
        "icon": "fas fa-spray-can",
        "images": [
            "images/DADOL1.png",
            "images/DADOL2.png"
        ],
        "ingredients": [
            {
                "name": "Gandhak",
                "img": "images/Gandhak.jpg",
                "desc": "Gandhak (purified Sulphur) supports healthy skin and reduces itching."
            },
            {
                "name": "Babchi Oil",
                "img": "images/Babchi Oil.jpg",
                "desc": "Babchi Oil supports healthy skin texture and skin balance."
            },
            {
                "name": "Coaltar Solution",
                "img": "images/Coaltar Solution.jpg",
                "desc": "Coaltar Solution soothes dry and irritated skin conditions."
            },
            {
                "name": "Neem Oil",
                "img": "images/Neem Oil.jpg",
                "desc": "Neem Oil supports skin health and reduces irritation."
            },
            {
                "name": "Samudraphene",
                "img": "images/Samudraphene.jpg",
                "desc": "Samudraphene supports skin comfort and wellness."
            },
            {
                "name": "Maulshri Flowers",
                "img": "images/Maulshri Flowers.jpg",
                "desc": "Maulshri Flowers support skin nourishment and freshness."
            },
            {
                "name": "Babool Flowers",
                "img": "images/Babool Flowers.jpg",
                "desc": "Babool Flowers support healthy skin and natural balance."
            },
            {
                "name": "Paraffin Base",
                "img": "images/Paraffin Base.jpg",
                "desc": "Paraffin Base keeps skin soft and supports hydration."
            }
        ],
        "quantities": [
            {
                "label": "10GM",
                "price": "₹45"
            }
        ]
    },
    {
        "name": "Joint Pain Relieve Oil",
        "price": "₹25",
        "desc": "This Joint Pain Reliever Oil is a premium Ayurvedic formulation designed to provide fast and effective relief from chronic discomfort. Enriched with Ashwagandha, Shatavari, and Maha Haldi, it targets inflammation at the source to ease joint pains, arthritis, and muscle stiffness.",
        "icon": "fas fa-bone",
        "images": [
            "images/Zoint oil1.PNG.png",
            "images/Zoint oil2.PNG.png",
            "images/Zoint oil3.PNG.png",
            "images/Zoint oil4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Ashwagandha Root",
                "img": "images/Ashwagangha root.jpg",
                "desc": "Ashwagandha root supports energy, stamina, and overall wellness."
            },
            {
                "name": "Karpoor Crystal",
                "img": "images/Karpoor Crystal.jpg",
                "desc": "Karpoor crystal supports respiratory comfort and relaxation."
            },
            {
                "name": "Mash (Urad) Seed",
                "img": "images/Mash Urad Seed.jpg",
                "desc": "Urad seeds are rich in protein and support strength and digestion."
            },
            {
                "name": "Jatamansi Plant",
                "img": "images/Jatamansi Plant.jpg",
                "desc": "Jatamansi supports calming, restful sleep, and mental clarity."
            },
            {
                "name": "Kuchala Seed",
                "img": "images/Kuchala Seed.jpg",
                "desc": "Kuchala seeds support nervous system function and joint comfort."
            },
            {
                "name": "Dhatura Leaf",
                "img": "images/Dhatura Leaf.jpg",
                "desc": "Dhatura leaves support pain and respiratory relief."
            },
            {
                "name": "Aama Haldi Root",
                "img": "images/Aama Haldi Root.jpg",
                "desc": "Aama Haldi root supports digestion and reduces inflammation."
            },
            {
                "name": "Shatawari Root",
                "img": "images/Shatawari Root.jpg",
                "desc": "Shatawari root supports hormonal balance and overall rejuvenation."
            }
        ],
        "quantities": [
            {
                "label": "10ML",
                "price": "₹25"
            },
            {
                "label": "30ML",
                "price": "₹75"
            },
            {
                "label": "60ML",
                "price": "₹120"
            }
        ]
    },
    {
        "name": "EAROL",
        "price": "₹45",
        "desc": "Earol Ear Drops is a proprietary Ayurvedic formulation designed to provide fast-acting and comprehensive relief from common ear discomforts including ear-ache, itching, ear wax buildup, and decreased hearing clarity.",
        "icon": "fas fa-seedling",
        "images": [
            "images/Earoil1.PNG.png",
            "images/Earoil2.PNG.png",
            "images/Earoil3.PNG.png",
            "images/Earoil4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Sonapatha",
                "img": "images/Sonapatha.jpg",
                "desc": "Sonapatha supports joint health, digestion, and respiratory wellness."
            },
            {
                "name": "Ankol",
                "img": "images/Ankol.jpg",
                "desc": "Ankol supports skin health, joint comfort, and digestion."
            },
            {
                "name": "Kakjangha",
                "img": "images/Kakjangha.jpg",
                "desc": "Kakjangha supports joint health and overall physical wellness."
            },
            {
                "name": "Nagdaun",
                "img": "images/Nagdaun.jpg",
                "desc": "Nagdaun supports digestion, respiratory comfort, and detoxification."
            },
            {
                "name": "Arjuna",
                "img": "images/Arjuna.jpg",
                "desc": "Arjuna supports healthy blood circulation and heart wellness."
            },
            {
                "name": "Surajmukhi",
                "img": "images/Surajmukhi.jpg",
                "desc": "Surajmukhi (Sunflower) supports heart health and energy levels."
            },
            {
                "name": "Nirgundi",
                "img": "images/Nirgundi.jpg",
                "desc": "Nirgundi supports joint comfort and respiratory wellness."
            },
            {
                "name": "Lahsun",
                "img": "images/Lahsun.jpg",
                "desc": "Lahsun (Garlic) supports heart health, digestion, and immunity."
            }
        ],
        "quantities": [
            {
                "label": "5ML",
                "price": "₹45"
            }
        ]
    },
    {
        "name": "Mangal Prabhat (Laxative Churan)",
        "price": "₹16",
        "desc": "Mangal Prabhat Churn is a time-tested Ayurvedic remedy formulated to combat chronic constipation, hyperacidity, and heartburn. This GMP-certified, Saunf-flavored churan promotes healthy bowel movements and regulates acid levels.",
        "icon": "fas fa-hand-holding-medical",
        "images": [
            "images/Mangal Prabhat1.PNG.png",
            "images/Mangal Prabhat2.PNG.png",
            "images/Mangal Prabhat3.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Senna Leaf",
                "img": "images/Senna Leaf.jpg",
                "desc": "Senna leaves support natural cleansing and digestive health."
            },
            {
                "name": "Ajwain Seed",
                "img": "images/Ajwain Seed.jpg",
                "desc": "Ajwain seeds relieve indigestion, bloating, and gas."
            },
            {
                "name": "Kala Namak",
                "img": "images/Kala Namak.jpg",
                "desc": "Kala Namak (Black Salt) supports digestion and appetite."
            },
            {
                "name": "Nisoth",
                "img": "images/Nisoth.jpg",
                "desc": "Nisoth supports detoxification and healthy bowel function."
            },
            {
                "name": "Amaltash Pulp",
                "img": "images/Amaltash Pulp.jpg",
                "desc": "Amaltash pulp supports constipation relief and bowel health."
            },
            {
                "name": "Gulab Flowers",
                "img": "images/Gulab Flowers.jpg",
                "desc": "Gulab flowers support skin health and relaxation."
            },
            {
                "name": "Saunf",
                "img": "images/Saunf.jpg",
                "desc": "Saunf (Fennel) improves digestion, freshens breath, and reduces acidity."
            },
            {
                "name": "Sentha Namak",
                "img": "images/Sentha Namak.jpg",
                "desc": "Sentha Namak (Rock Salt) supports digestion and mineral balance."
            },
            {
                "name": "Yastimadhu",
                "img": "images/Yastimadhu.jpg",
                "desc": "Yastimadhu (Mulethi/Licorice) supports respiratory health and digestion."
            }
        ],
        "quantities": [
            {
                "label": "10GM",
                "price": "₹16"
            },
            {
                "label": "50GM",
                "price": "₹55"
            }
        ]
    },
    {
        "name": "Amrit (Anti Dycentrical)",
        "price": "₹40",
        "desc": "Amrit Anti-Diarrheal Tablets provide a trusted, natural approach to digestive health. This Ayurvedic remedy is specifically formulated to manage diarrhea and dysentery, helping to soothe the digestive tract and restore normal function quickly and effectively.",
        "icon": "fas fa-pills",
        "images": [
            "images/Amrit.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Bhringraj Plant",
                "img": "images/Bhringraj plant.PNG.jpg",
                "desc": "Bhringraj supports liver health and overall wellness."
            },
            {
                "name": "Arjun Bark",
                "img": "images/Arjun Bark.PNG.jpg",
                "desc": "Arjuna bark supports heart health and blood circulation."
            },
            {
                "name": "Makoi Fruit",
                "img": "images/Makoi fruit.PNG",
                "desc": "Makoi supports liver function and improves digestion."
            },
            {
                "name": "Tulsi Leaf",
                "img": "images/Tulsi leaf.PNG",
                "desc": "Tulsi boosts immunity and supports respiratory health."
            },
            {
                "name": "Pittapapda Plant",
                "img": "images/Pittapapda plant.PNG",
                "desc": "Pittapapda supports liver health and body cooling."
            },
            {
                "name": "Sarpunkha Panchang",
                "img": "images/Sarpunkha Panchang.PNG.PNG",
                "desc": "Sarpunkha supports liver and spleen health and detoxification."
            },
            {
                "name": "Vidanga Seed",
                "img": "images/Vidanga seed.PNG",
                "desc": "Vidanga seeds support gut health and natural body cleansing."
            },
            {
                "name": "Ghritkumari Sap",
                "img": "images/Ghritkumari sap.PNG",
                "desc": "Aloe Vera sap supports liver health, digestion, and hydration."
            }
        ],
        "quantities": [
            {
                "label": "25 Tabs",
                "price": "₹40"
            },
            {
                "label": "500 Tabs",
                "price": "₹500"
            }
        ]
    },
    {
        "name": "Woemol (Antiwarm)",
        "price": "₹29",
        "desc": "Woemol is an Ayurvedic formulation designed to address common digestive concerns including worm-related issues. Made with time-tested herbal ingredients, it supports healthy gut function and digestive wellness.",
        "icon": "fas fa-thermometer-half",
        "images": [],
        "ingredients": [
            {
                "name": "Bhringraj Plant",
                "img": "images/Bhringraj plant.PNG.jpg",
                "desc": "Bhringraj supports liver health and overall wellness."
            },
            {
                "name": "Arjun Bark",
                "img": "images/Arjun Bark.PNG.jpg",
                "desc": "Arjuna bark supports heart health and blood circulation."
            },
            {
                "name": "Makoi Fruit",
                "img": "images/Makoi fruit.PNG",
                "desc": "Makoi supports liver function and improves digestion."
            },
            {
                "name": "Tulsi Leaf",
                "img": "images/Tulsi leaf.PNG",
                "desc": "Tulsi boosts immunity and supports respiratory health."
            },
            {
                "name": "Pittapapda Plant",
                "img": "images/Pittapapda plant.PNG",
                "desc": "Pittapapda supports liver health and body cooling."
            },
            {
                "name": "Sarpunkha Panchang",
                "img": "images/Sarpunkha Panchang.PNG.PNG",
                "desc": "Sarpunkha supports liver and spleen health and detoxification."
            },
            {
                "name": "Vidanga Seed",
                "img": "images/Vidanga seed.PNG",
                "desc": "Vidanga seeds support gut health and natural body cleansing."
            },
            {
                "name": "Ghritkumari Sap",
                "img": "images/Ghritkumari sap.PNG",
                "desc": "Aloe Vera sap supports liver health, digestion, and hydration."
            }
        ],
        "quantities": [
            {
                "label": "30ML",
                "price": "₹29"
            }
        ]
    },
    {
        "name": "Mal Mix",
        "price": "₹32",
        "desc": "MALMIX Syrup is a proprietary Ayurvedic medicine formulated to act as an effective anti-malarial and anti-pyretic treatment. This time-tested remedy, with a heritage dating back to 1967, is crafted in a GMP-certified facility.",
        "icon": "fas fa-dumbbell",
        "images": [
            "images/Mal Mix.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Agnihas Herb",
                "img": "images/Agnihas Herb.jpg",
                "desc": "Agnihas Herb supports digestion, metabolism, and natural detoxification."
            },
            {
                "name": "Bindal Fruit",
                "img": "images/Bindal Fruit.jpg",
                "desc": "Bindal Fruit supports digestive health and body strength."
            },
            {
                "name": "Kanchana",
                "img": "images/Kanchana.jpg",
                "desc": "Kanchana supports glandular health and healthy metabolism."
            },
            {
                "name": "Guduchi Root",
                "img": "images/Guduchi Root.jpg",
                "desc": "Guduchi (Giloy) supports immunity, digestion, and energy levels."
            },
            {
                "name": "Chiretta Fruit",
                "img": "images/Chiretta Fruit.jpg",
                "desc": "Chiretta Fruit supports liver wellness and natural detoxification."
            },
            {
                "name": "Nagpheni",
                "img": "images/Nagpheni.jpg",
                "desc": "Nagpheni supports digestion, body hydration, and skin wellness."
            },
            {
                "name": "Shankhauli",
                "img": "images/Shankhauli.jpg",
                "desc": "Shankhauli supports digestion, body strength, and overall wellness."
            }
        ],
        "quantities": [
            {
                "label": "30ML",
                "price": "₹32"
            },
            {
                "label": "60ML",
                "price": "₹45"
            }
        ]
    },
    {
        "name": "Gas Q",
        "price": "₹70",
        "desc": "Gas-Q Gastric Syrup is a premium Ayurvedic digestive aid designed to provide rapid relief from gastric problems, acidity, and flatulence. Utilizing Saunf, Podina, Ajmoda, and Jeera, this GMP-certified syrup soothes the digestive tract and improves overall gut health.",
        "icon": "fas fa-leaf",
        "images": [
            "images/Gas Q1.PNG.png",
            "images/Gas Q2.PNG.png",
            "images/Gas Q3.PNG.png",
            "images/Gas Q4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Saunf Big",
                "img": "images/Saunf Big.jpg",
                "desc": "Saunf (Fennel) improves digestion, reduces bloating, and freshens breath."
            },
            {
                "name": "Jeera Black",
                "img": "images/Jeera Black Seed.jpg",
                "desc": "Black Jeera supports healthy digestion and reduces gas."
            },
            {
                "name": "Podina Leaf",
                "img": "images/Podina Leaf.jpg",
                "desc": "Podina (Mint) supports digestion and relieves nausea."
            },
            {
                "name": "Dhania Seed",
                "img": "images/Dhania Seed.jpg",
                "desc": "Dhania seeds support healthy digestion and reduce acidity."
            },
            {
                "name": "Harad Small",
                "img": "images/Harad Small Fruit.jpg",
                "desc": "Harad Small Fruit supports digestion, gut health, and detoxification."
            },
            {
                "name": "Makoy Fruit",
                "img": "images/Makoy Fruit.jpg",
                "desc": "Makoy fruit supports liver function and natural detoxification."
            },
            {
                "name": "Baheda Fruit",
                "img": "images/Baheda Fruit.jpg",
                "desc": "Baheda fruit supports digestion, respiratory health, and immunity."
            },
            {
                "name": "Ajmoda Seed",
                "img": "images/Ajmoda Seed.jpg",
                "desc": "Ajmoda seeds support digestion and reduce bloating."
            },
            {
                "name": "Guduch Root",
                "img": "images/Guduch Root.jpg",
                "desc": "Guduch (Giloy) supports immunity, energy, and overall health."
            }
        ],
        "quantities": [
            {
                "label": "110ML",
                "price": "₹70"
            },
            {
                "label": "220ML",
                "price": "₹100"
            }
        ]
    },
    {
        "name": "Dige Q",
        "price": "₹70",
        "desc": "Dige-Q Digestive Syrup is an Ayurvedic medicine formulated over 51 years in healthcare. This GMP-certified syrup is an effective remedy for indigestion, lack of appetite, and various gastric and stomach troubles.",
        "icon": "fas fa-heartbeat",
        "images": [
            "images/Dige Q1.PNG.png",
            "images/Dige Q2.PNG.png",
            "images/Dige Q3.PNG.png",
            "images/Dige Q4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Harad Fruit",
                "img": "images/Harad Fruit.jpg",
                "desc": "Harad (Haritaki) supports healthy digestion and natural body cleansing."
            },
            {
                "name": "Baheda Fruit",
                "img": "images/Baheda Fruit.jpg",
                "desc": "Baheda supports respiratory health, digestion, and detoxification."
            },
            {
                "name": "Amla Fruit",
                "img": "images/Amla Fruit.jpg",
                "desc": "Amla is rich in Vitamin C and antioxidants, supporting immunity."
            },
            {
                "name": "Sonth Rhizome",
                "img": "images/Sonth Rhizome.jpg",
                "desc": "Sonth (Dry Ginger) improves digestion and reduces bloating."
            },
            {
                "name": "Pippli Seed",
                "img": "images/Pippli Seed.jpg",
                "desc": "Pippli (Long Pepper) supports digestion and respiratory health."
            },
            {
                "name": "Methi Seed",
                "img": "images/Methi Seed.jpg",
                "desc": "Methi seeds support digestion and healthy metabolism."
            },
            {
                "name": "Jeera Seed",
                "img": "images/Jeera Seed.jpg",
                "desc": "Jeera seeds improve appetite and support digestive comfort."
            },
            {
                "name": "Ajmoda Seed",
                "img": "images/Ajmoda Seed.jpg",
                "desc": "Ajmoda seeds support digestion and reduce bloating."
            },
            {
                "name": "Guduch Root",
                "img": "images/Guduch Root.jpg",
                "desc": "Guduch (Giloy) supports immunity, digestion, and energy."
            }
        ],
        "quantities": [
            {
                "label": "110ML",
                "price": "₹70"
            },
            {
                "label": "220ML",
                "price": "₹100"
            }
        ]
    },
    {
        "name": "Memory Q",
        "price": "₹100",
        "desc": "Memory-Q Syrup is a premium Ayurvedic brain tonic and memory booster designed to enhance cognitive function and mental clarity. Enriched with Ashwagandha, Brahmi, Shankhapushpi, and Saffron, it supports peak mental performance and focus.",
        "icon": "fas fa-brain",
        "images": [
            "images/Memory Q1.PNG.png",
            "images/Memory Q2.PNG.png",
            "images/Memory Q3.PNG.png",
            "images/Memory Q4.PNG.png"
        ],
        "ingredients": [
            {
                "name": "Ashwagandha Root",
                "img": "images/Ashwagandha Root.jpg",
                "desc": "Ashwagandha root supports energy, stamina, and overall wellness."
            },
            {
                "name": "Shatawari Root",
                "img": "images/Shatawari Root.jpg",
                "desc": "Shatawari root supports nourishment, strength, and wellness."
            },
            {
                "name": "Kavach Seed",
                "img": "images/Kavach Seed.jpg",
                "desc": "Kavach seed supports strength, vitality, and nervous system health."
            },
            {
                "name": "Vidarikand Root",
                "img": "images/Vidarikand Root.jpg",
                "desc": "Vidarikand root supports energy and physical wellness."
            },
            {
                "name": "Shankhapushpi Herb",
                "img": "images/Shankhapushpi Herb.jpg",
                "desc": "Shankhapushpi supports memory, concentration, and mental clarity."
            },
            {
                "name": "Brahmi Booti",
                "img": "images/Brahmi Booti.jpg",
                "desc": "Brahmi supports memory, focus, and nervous system health."
            },
            {
                "name": "Amla Fruit",
                "img": "images/Amla Fruit.jpg",
                "desc": "Amla supports immunity, digestion, and overall wellness."
            },
            {
                "name": "Punarnava Root",
                "img": "images/Punarnava Root.jpg",
                "desc": "Punarnava root supports kidney and liver health."
            },
            {
                "name": "Arjuna Bark",
                "img": "images/Arjuna Bark.jpg",
                "desc": "Arjuna bark supports heart health and blood circulation."
            }
        ],
        "quantities": [
            {
                "label": "220ML",
                "price": "₹100"
            }
        ]
    },
    {
        "name": "wsv",
        "price": "sdvz",
        "desc": "gwesvdzx wgsvdzx",
        "icon": "fas fa-capsules",
        "images": [],
        "ingredients": [
            {
                "name": "sefdz",
                "img": "",
                "desc": ""
            }
        ],
        "quantities": [
            {
                "label": "f",
                "price": "f",
                "images": [
                    "f"
                ]
            }
        ]
    }
];

// ── Modal Logic ───────────────────────────────────────────────
const productModal = document.getElementById('productModal');
if (productModal) {
    const modalClose   = document.getElementById('modalClose');
    const mainImage    = document.getElementById('mainImage');
    const galleryImgEls = [
        document.getElementById('galleryImage1'),
        document.getElementById('galleryImage2'),
        document.getElementById('galleryImage3')
    ];

    function setGalleryImages(images, productName) {
        galleryImgEls.forEach((el, i) => {
            el.innerHTML = '<i class="fas fa-image" style="font-size:1.5rem;color:var(--gray);"></i>';
            el.onclick = null;
            el.classList.remove('active');
            el.style.display = 'none';
        });
        galleryImgEls.forEach((el, i) => {
            if (images[i + 1]) {
                el.style.display = 'flex';
                el.innerHTML = `<img src="${images[i+1]}" alt="${productName} ${i+2}">`;
                el.onclick = () => {
                    const prev = mainImage.querySelector('img').src;
                    mainImage.innerHTML = `<img src="${images[i+1]}" alt="${productName}">`;
                    el.innerHTML = `<img src="${prev}" alt="${productName} ${i+2}">`;
                    galleryImgEls.forEach(g => g.classList.remove('active'));
                    el.classList.add('active');
                };
            }
        });
    }

    function openProductModal(product) {
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductDesc').textContent = product.desc;

        const quantitySection  = document.getElementById('modalQuantitySection');
        const quantityOptions  = document.getElementById('quantityOptions');
        const priceElement     = document.getElementById('modalProductPrice');

        const defaultImages = product.images && product.images.length ? product.images : [''];

        if (product.quantities && product.quantities.length) {
            quantitySection.style.display = 'block';
            quantityOptions.innerHTML = '';
            product.quantities.forEach((qty, idx) => {
                const btn = document.createElement('div');
                btn.className = 'quantity-option' + (idx === 0 ? ' active' : '');
                btn.innerHTML = `<span class="qty-label">${qty.label}</span>`;
                btn.onclick = () => {
                    priceElement.textContent = qty.price;
                    document.querySelectorAll('.quantity-option').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const imgs = qty.images && qty.images.length ? qty.images : defaultImages;
                    mainImage.innerHTML = imgs[0] ? `<img src="${imgs[0]}" alt="${product.name}">` : '<i class="fas fa-image" style="font-size:4rem;color:var(--gray);"></i>';
                    setGalleryImages(imgs, product.name);
                };
                quantityOptions.appendChild(btn);
            });
            priceElement.textContent = product.quantities[0].price;
        } else {
            quantitySection.style.display = 'none';
            priceElement.textContent = product.price;
        }

        mainImage.innerHTML = defaultImages[0]
            ? `<img src="${defaultImages[0]}" alt="${product.name}">`
            : '<i class="fas fa-image" style="font-size:4rem;color:var(--gray);"></i>';
        setGalleryImages(defaultImages, product.name);

        const grid = document.getElementById('ingredientsGridFull');
        grid.innerHTML = '';
        if (product.ingredients && product.ingredients.length) {
            const container = document.createElement('div');
            container.className = 'ingredients-table';
            product.ingredients.forEach(ing => {
                const item = document.createElement('div');
                item.className = 'ingredient-item';
                const imgHtml = ing.img
                    ? `<img src="${ing.img}" alt="${ing.name}">`
                    : `<div class="ingredient-icon"><i class="${ing.icon || 'fas fa-leaf'}"></i></div>`;
                item.innerHTML = `${imgHtml}<div><p><strong>${ing.name}</strong></p><p class="ingredient-desc">${ing.desc || ''}</p></div>`;
                container.appendChild(item);
            });
            grid.appendChild(container);
        }

        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
        productModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (modalClose) modalClose.addEventListener('click', closeProductModal);
    productModal.addEventListener('click', e => { if (e.target === productModal) closeProductModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProductModal(); });

    const grid = document.getElementById('productsGrid');
    if (grid) {
        products.forEach((product, i) => {
            const card = document.createElement('div');
            card.className = 'product-card fade-in';
            const imgSrc = product.images && product.images.length ? product.images[0] : '';
            card.innerHTML = `
                <div class="product-image" style="background:linear-gradient(135deg,var(--light-gray),var(--white));">
                    ${imgSrc ? `<img src="${imgSrc}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:1rem;">` : `<i class="${product.icon}" style="font-size:3rem;color:var(--primary-teal);"></i>`}
                </div>
                <div class="product-info">
                    <div class="product-price">${product.price}</div>
                    <h4>${product.name}</h4>
                    <p>${product.desc.substring(0,60)}...</p>
                </div>
            `;
            card.addEventListener('click', () => openProductModal(product));
            grid.appendChild(card);
            productObserver.observe(card);
        });
    }
}
