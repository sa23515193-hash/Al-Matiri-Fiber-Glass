import React,{useMemo,useState}from'react'
import{createRoot}from'react-dom/client'
import'./style.css'

const A='./assets/'
const MAP='https://www.google.com/search?kgmid=%2Fg%2F11tx5kzs7l&hl=en-PK&q=%D8%A7%D9%84%D9%85%D8%B7%D9%8A%D8%B1%D9%8A%20%D9%84%D9%84%D9%81%D9%8A%D8%A8%D8%B1%20%D8%AC%D8%AF%D9%87&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Fosrp%2Fm1%2F4&kgs=ec741a6e5962296b'
const PHONE='+966 50 251 1885',WA='https://wa.me/966502511885'
const catNames=['Tanks & Containers','Canopies & Shades','Doors & Windows','Industrial Fiberglass','Marine & Outdoor','Custom Fabrication','Decorative Fiberglass','Repair & Maintenance']
const categories=catNames.map((name,i)=>({name,image:`${A}c${i+1}.jpeg`,desc:['Durable tanks and storage solutions.','Weather-resistant shade and canopy solutions.','Strong, low-maintenance doors and windows.','Practical solutions for industrial environments.','Fiberglass products for marine and outdoor use.','Made-to-measure fiberglass fabrication.','Decorative pieces with durable finishes.','Repair, restoration and maintenance services.'][i]}))
const products=Array.from({length:50},(_,i)=>({id:i+1,name:`${catNames[i%8]} — Model ${i+1}`,image:`${A}pr${i+1}.jpeg`,category:catNames[i%8]}))
const showcase=[1,2,3,4,5,6,7,8,9,10].map(i=>`${A}v${i}.mp4`)
const docs=Array.from({length:16},(_,i)=>({name:`Company Document ${i+1}`,image:`${A}d${i+1}.jpeg`}))
const faqs=[
['What products does Al-Mutairi Fiber Glass provide?','We provide fiberglass products and custom solutions for residential, commercial, industrial, marine and outdoor requirements.'],
['Where is Al-Mutairi Fiber Glass located?','Al-Mutairi Fiber Glass is located on 30th Street, near 60th, Jeddah 23448, Saudi Arabia.'],
['Can you make custom fiberglass products?','Yes. Share your dimensions, quantity, reference images and requirements through WhatsApp for a custom quotation.'],
['How can I request a quotation?','Use the Get in Touch form or WhatsApp button and tell us what you need.'],
['Do you offer repair and maintenance?','Yes, repair and maintenance can be discussed according to the product and project condition.'],
['How can I contact the company?','Call +966 50 251 1885 or contact us on WhatsApp.']
]

function App(){
 const[page,setPage]=useState('home'),[menu,setMenu]=useState(false),[lang,setLang]=useState('en'),[cat,setCat]=useState('All'),[q,setQ]=useState(''),[light,setLight]=useState(null),[faq,setFaq]=useState(0)
 const t=lang==='ar'?{home:'الرئيسية',about:'من نحن',products:'المنتجات',showcase:'المعرض',documents:'الوثائق',faq:'الأسئلة الشائعة',contact:'تواصل معنا',explore:'استكشف المنتجات',view:'عرض المزيد'}:{home:'Home',about:'About',products:'Products',showcase:'Showcase',documents:'Documents',faq:'FAQ',contact:'Contact',explore:'Explore Products',view:'View More'}
 const go=p=>{setPage(p);setMenu(false);scrollTo(0,0)}
 const filtered=useMemo(()=>products.filter(p=>(cat==='All'||p.category===cat)&&p.name.toLowerCase().includes(q.toLowerCase())),[cat,q])
 return <div className={lang==='ar'?'rtl':''}>
  <header><div className="nav"><button className="logo" onClick={()=>go('home')}><b>AF</b><span>AL-MUTAIRI<small>FIBER GLASS</small></span></button><button className="hamb" onClick={()=>setMenu(!menu)}>☰</button><nav className={menu?'open':''}>{[['home',t.home],['about',t.about],['products',t.products],['showcase',t.showcase],['documents',t.documents],['faq',t.faq],['contact',t.contact]].map(x=><button className={page===x[0]?'on':''} onClick={()=>go(x[0])} key={x[0]}>{x[1]}</button>)}</nav><div className="actions"><button onClick={()=>setLang(lang==='en'?'ar':'en')}>{lang==='en'?'العربية':'EN'}</button><a href={WA} target="_blank">WhatsApp</a></div></div></header>
  {page==='home'&&<Home go={go} setLight={setLight}/>}
  {page==='about'&&<About go={go}/>}
  {page==='products'&&<Products filtered={filtered} cat={cat} setCat={setCat} q={q} setQ={setQ} setLight={setLight}/>}
  {page==='showcase'&&<Showcase/>}
  {page==='documents'&&<Documents setLight={setLight}/>}
  {page==='faq'&&<FAQ faq={faq} setFaq={setFaq}/>}
  {page==='contact'&&<Contact/>}
  <Footer go={go}/>
  {light&&<div className="lightbox" onClick={()=>setLight(null)}><img src={light}/><button>×</button></div>}
 </div>
}

function Hero({title,sub}){return <section className="pageHero"><span>AL-MUTAIRI FIBER GLASS • JEDDAH</span><h1>{title}</h1><p>{sub}</p></section>}
function Home({go,setLight}){return <main><section className="hero" style={{backgroundImage:`url(${A}hero.jpeg)`}}>
  
  <div className="shade"/><div className="heroText"><span>AL-MUTAIRI FIBER GLASS • JEDDAH, SAUDI ARABIA</span><h1>Fiberglass solutions,<br/><i>crafted to last.</i></h1><p>Professional fiberglass products, custom fabrication and dependable service for homes, businesses and industry.</p><div><button className="gold" onClick={()=>go('products')}>Explore Products →</button><a className="outline" href={WA} target="_blank">WhatsApp Us</a></div><div className="stats"><b>50+<small>Products</small></b><b>8<small>Categories</small></b><b>Jeddah<small>Saudi Arabia</small></b></div></div></section>
 <section className="section intro"><div><span>OUR COMPANY</span><h2>Built for strength.<br/><i>Designed for purpose.</i></h2></div><div><p>Al-Mutairi Fiber Glass provides practical, durable and custom fiberglass solutions with a focus on quality workmanship and customer requirements.</p><button className="link" onClick={()=>go('about')}>Discover our story →</button></div></section>
 <section className="section"><Head title="Explore Categories" action={()=>go('products')}/><div className="catGrid">{categories.map(c=><button className="cat" onClick={()=>go('products')} key={c.name}><img src={c.image}/><div><b>{c.name}</b><span>{c.desc}</span></div></button>)}</div></section>
 <section className="section"><Head title="Featured Products" action={()=>go('products')}/><div className="products">{products.slice(0,8).map(p=><Product p={p} setLight={setLight} key={p.id}/>)}</div></section>
 <section className="dark section"><Head title="Visual Showcase" action={()=>go('showcase')}/><div className="videos">{showcase.map(v=><video key={v} src={v} autoPlay muted loop playsInline controls/>)}</div></section>
 <section className="section"><Head title="Company Documents" action={()=>go('documents')}/><div className="docs">{docs.slice(0,5).map(d=><button onClick={()=>setLight(d.image)} key={d.image}><img src={d.image}/><span>{d.name}</span></button>)}</div></section>
 <section className="contactSplit"><img src={A+'g.jpeg'}/><div><span>GET IN TOUCH</span><h2>Let’s build something<br/><i>strong together.</i></h2><p>Tell us about your project and contact our team directly.</p><a className="gold" href={WA} target="_blank">Message on WhatsApp →</a><a className="darkBtn" href={MAP} target="_blank">Open Google Maps ↗</a></div></section></main>}
function Head({title,action}){return <div className="head"><h2>{title}</h2><button onClick={action}>View More ↗</button></div>}
function Product({p,setLight}){return <button className="product" onClick={()=>setLight(p.image)}><div><img src={p.image}/><em>VIEW</em></div><small>{p.category}</small><b>{p.name}</b></button>}
function About({go}){return <main><Hero title="About Al-Mutairi" sub="A practical fiberglass partner in Jeddah."/><section className="section about"><div><span>OUR APPROACH</span><h2>Quality is not a feature.<br/><i>It is the standard.</i></h2></div><div><p>Al-Mutairi Fiber Glass is focused on durable fiberglass work, custom fabrication and solutions built around real customer needs.</p><p>From everyday products to specialized requirements, our goal is straightforward: reliable workmanship, useful design and service you can trust.</p><button className="gold" onClick={()=>go('contact')}>Start a conversation →</button></div></section></main>}
function Products({filtered,cat,setCat,q,setQ,setLight}){return <main><Hero title="Our Products" sub="50 products across eight practical fiberglass categories."/><section className="section"><div className="filter"><div><button className={cat==='All'?'selected':''} onClick={()=>setCat('All')}>All</button>{catNames.map(c=><button className={cat===c?'selected':''} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div><input placeholder="Search products…" value={q} onChange={e=>setQ(e.target.value)}/></div><div className="products">{filtered.map(p=><Product p={p} setLight={setLight} key={p.id}/>)}</div></section></main>}
function Showcase(){return <main>
<Hero title="Visual Showcase" sub="Explore our work through four vertical showcase videos."/>
<section className="section dark">
  <div className="videos">
    {showcase.map(v => (
      <video
        key={v}
        src={v}
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="none"
      />
    ))}
  </div>
</section>
</main>}
function Documents({setLight}){return <main><Hero title="Company Documents" sub="Browse all available company documents."/><section className="section"><div className="docs all">{docs.map(d=><button onClick={()=>setLight(d.image)} key={d.image}><img src={d.image}/><span>{d.name}</span></button>)}</div></section></main>}
function FAQ({faq,setFaq}){return <main><Hero title="Frequently Asked Questions" sub="Quick answers about products, service and contact."/><section className="section faqWrap"><img src={A+'f.jpeg'}/><div>{faqs.map((x,i)=><button className="faq" onClick={()=>setFaq(faq===i?-1:i)} key={x[0]}><header><span>0{i+1}</span><b>{x[0]}</b><strong>{faq===i?'−':'+'}</strong></header>{faq===i&&<p>{x[1]}</p>}</button>)}</div></section></main>}
function Contact(){const[f,setF]=useState({name:'',phone:'',message:''});const send=e=>{e.preventDefault();window.open(`${WA}?text=${encodeURIComponent(`Hello Al-Mutairi Fiber Glass. Name: ${f.name}. Phone: ${f.phone}. ${f.message}`)}`,'_blank')};return <main><Hero title="Get in Touch" sub="Tell us what you need and contact us directly."/><section className="section contact"><div><img src={A+'g.jpeg'}/><h3>Al-Mutairi Fiber Glass</h3><p>30th Street, near 60th<br/>Jeddah 23448, Saudi Arabia</p><a href={MAP} target="_blank">Open exact Google Maps location ↗</a><a href={`tel:${PHONE.replaceAll(' ','')}`}>+966 50 251 1885</a></div><form onSubmit={send}><label>Name<input required value={f.name} onChange={e=>setF({...f,name:e.target.value})}/></label><label>Phone<input required value={f.phone} onChange={e=>setF({...f,phone:e.target.value})}/></label><label>Message<textarea required rows="7" value={f.message} onChange={e=>setF({...f,message:e.target.value})}/></label><button className="gold">Send via WhatsApp →</button></form></section></main>}
function Footer({go}){return <footer><div><b>AF</b><h3>Al-Mutairi Fiber Glass</h3><p>Professional fiberglass solutions in Jeddah, Saudi Arabia.</p></div><div><h4>Explore</h4><button onClick={()=>go('about')}>About</button><button onClick={()=>go('products')}>Products</button><button onClick={()=>go('showcase')}>Showcase</button></div><div><h4>Contact</h4><a href={WA} target="_blank">WhatsApp</a><a href={`tel:${PHONE.replaceAll(' ','')}`}>{PHONE}</a><a href={MAP} target="_blank">Google Maps</a></div><small>© 2026 Al-Mutairi Fiber Glass • المطيري للفيبر جلاس</small></footer>}
createRoot(document.getElementById('root')).render(<App/>)
