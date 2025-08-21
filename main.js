// data (عدل النصوص هنا بسهولة)
const programs = [
  { title: 'بكالوريوس العلاج الوظيفي', desc: 'برنامج شامل: نظري وعملي وتدريب ميداني.' },
  { title: 'دبلوم التكامل الحسي', desc: 'التركيز على التدخلات الحسية والتأهيل الحركي.' },
  { title: 'ماجستير علوم التأهيل', desc: 'دراسات عليا بحثية ومهنية.' },
];
const services = [
  { title:'العيادات التعليمية', desc:'تقييم وعلاج طلابي سريري.' },
  { title:'التدريب الميداني', desc:'شبكة تدريب بالمستشفيات والمراكز.' },
  { title:'الاستشارات', desc:'خدمات للمدارس والمستشفيات والجهات.' },
];
const news = [
  { title:'فتح باب التقديم', date:'2025-09-01' },
  { title:'مؤتمر الذكاء الاصطناعي', date:'2025-10-12' },
];

// small helper to fill grids
function fillGrid(id, items, mapper){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = items.map(mapper).join('');
}
fillGrid('programsGrid', programs, p=>`<article class="card reveal"><h3>${p.title}</h3><p>${p.desc}</p></article>`);
fillGrid('servicesGrid', services, s=>`<article class="card reveal"><h3>${s.title}</h3><p>${s.desc}</p></article>`);
fillGrid('newsGrid', news, n=>`<article class="card reveal"><h3>${n.title}</h3><p>التاريخ: ${n.date}</p></article>`);

// NAV mobile toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if(menuToggle){
  menuToggle.addEventListener('click', ()=> navLinks.classList.toggle('open'));
}

// CONTACT FORM (demo + Formspree option)
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const FORM_ENDPOINT = ''; // لو عندك Formspree حط اللينك هنا 'https://formspree.io/f/xxxx'
if(contactForm){
  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    formMsg.textContent = 'جاري الإرسال...';
    const data = new FormData(contactForm);
    if(FORM_ENDPOINT){
      try{
        const res = await fetch(FORM_ENDPOINT, { method:'POST', body: data, headers:{ 'Accept':'application/json' }});
        if(res.ok){
          formMsg.textContent = 'تم الإرسال بنجاح.';
          contactForm.reset();
        } else {
          formMsg.textContent = 'فشل الإرسال - تحقق من الإعدادات.';
        }
      } catch(err){ formMsg.textContent = 'خطأ في الاتصال.' }
    } else {
      // demo fallback
      setTimeout(()=>{ formMsg.textContent = 'تم إرسال الرسالة (وهو توضيحي).'; contactForm.reset(); }, 700);
    }
  });
}

// ===== GSAP animations =====
gsap.registerPlugin(ScrollTrigger);

// hero intro timeline
const tl = gsap.timeline();
tl.to('.hero-title', { y: 0, opacity: 1, duration: .9, ease: 'power3.out' })
  .to('.hero-sub', { y: 0, opacity: 1, duration: .8, ease: 'power3.out' }, '-=.45')
  .to('.hero-cta', { y: 0, opacity: 1, duration: .8, ease: 'power3.out' }, '-=.45')
  .to('.card-3d', { y: 0, opacity: 1, duration: 1, ease: 'elastic.out(1,0.6)' }, '-=.5');

// reveal on scroll
gsap.utils.toArray('.reveal').forEach(el=>{
  gsap.fromTo(el, {y:20, opacity:0}, {
    y:0, opacity:1, duration:.9, ease:'power3.out',
    scrollTrigger:{ trigger: el, start:'top 85%', toggleActions: 'play none none none' }
  });
});

// subtle parallax on hero blob
gsap.to('#blob', {
  y: 30, rotation: 6, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut'
});

// 3D parallax on card-3d mouse move
const card = document.querySelector('.card-3d');
if(card){
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, { rotationY: px * 10, rotationX: -py * 8, transformPerspective:700, transformOrigin:'center', duration:.4 });
  });
  card.addEventListener('mouseleave', ()=> gsap.to(card, { rotationY:0, rotationX:0, duration:.5 }));
}

// adjust SVG size on resize (just in case)
window.addEventListener('resize', ()=> {
  // nothing heavy; GSAP ScrollTrigger updates automatically
});
