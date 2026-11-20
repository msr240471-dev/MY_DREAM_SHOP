import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

export function AboutPage() {
  return <div className="about-page"><section className="about-hero"><img src="https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=1800&q=85" alt="Shoes designed for everyday movement" /><div><span className="eyebrow">A LITTLE ABOUT US</span><h1>Good shoes.<br /><em>Good energy.</em></h1><p>SNEAKERS WORLD BY RANA started with one simple idea: finding your favorite pair should feel easy.</p></div></section><section className="about-story"><span className="eyebrow">OUR POINT OF VIEW</span><h2>Style should feel<br />like <em>second nature.</em></h2><p>Founded by Rana in Bangladesh, SNEAKERS WORLD BY RANA is a thoughtfully curated footwear destination for the many ways you move. We believe great design is more than what you see — it's how your shoes make you feel at every step.</p><p>From early starts to late finishes, we bring together comfort, character and considered quality. No noise. No overthinking. Just shoes that feel right.</p><Link to="/shop" className="button button-dark">FIND YOUR NEXT STEP <ArrowRight size={15} /></Link></section><section className="about-values"><div><span>01</span><h3>Made for real life.</h3><p>Comfort-forward styles that work as hard as you do.</p></div><div><span>02</span><h3>Good design, no fuss.</h3><p>Easy to wear. Easy to love. Easy to make your own.</p></div><div><span>03</span><h3>Rooted right here.</h3><p>A local lens with a wider world in mind.</p></div></section><div className="about-signoff">STEP INTO YOUR WORLD <span>—</span> SNEAKERS WORLD BY RANA</div></div>
}

export function ContactPage() {
  const { notify } = useStore()
  const [submitted, setSubmitted] = useState(false)
  return <div className="standard-page contact-page"><div className="page-intro"><span className="eyebrow">WE'RE ALL EARS</span><h1>Let's talk<span>.</span></h1><p>A fit question, an order query, or just want to say hi? We're right here.</p></div><div className="contact-grid"><div className="contact-details"><div><Mail /><span><b>EMAIL</b><a href="mailto:hello@sneakersworld.example">hello@sneakersworld.example</a></span></div><div><Phone /><span><b>CALL / WHATSAPP</b><a href="tel:+8801700000000">+880 1700-000000</a></span></div><div><MapPin /><span><b>BASED IN</b><span>Dhaka, Bangladesh</span></span></div><div className="contact-response"><span className="eyebrow">A REAL PERSON, PROMISE</span><p>Our little team usually gets back to you within one working day.</p></div></div><form className="contact-form" onSubmit={e => { e.preventDefault(); setSubmitted(true); notify('Message received — we’ll be in touch soon.') }}><label>YOUR NAME<input required placeholder="What should we call you?" /></label><label>EMAIL ADDRESS<input type="email" required placeholder="you@example.com" /></label><label>WHAT'S THIS ABOUT?<select><option>General question</option><option>Order help</option><option>Size & fit</option><option>Something else</option></select></label><label>YOUR MESSAGE<textarea rows="5" required placeholder="Tell us a little more..." /></label><button className="button button-dark">{submitted ? <><Check size={16} /> MESSAGE SENT</> : <>SEND YOUR NOTE <ArrowRight size={15} /></>}</button></form></div></div>
}

const faqItems = [
  ['How long does delivery take?', 'Most orders reach you in 2–4 business days in Dhaka and 3–6 business days outside Dhaka. Delivery timing is a demo estimate and is not connected to a live courier.'],
  ['What are the delivery charges?', 'Delivery is complimentary on orders over ৳8,000. A flat demo delivery fee of ৳120 applies to smaller orders.'],
  ['Can I exchange a size?', 'We offer an easy 7-day size exchange on unworn shoes in their original packaging. In this demo, exchange requests are informational only.'],
  ['How do I find my size?', 'Product sizes use EU sizing from 38 to 45. If you are between sizes, we recommend choosing the larger size for a relaxed fit. You can also reach out on our contact page.'],
  ['Are online payments real?', 'No. bKash, Nagad and card payments are simulations in this demo. Cash on Delivery is also a demo selection; no payment is taken and no order is shipped.'],
  ['How can I track my order?', 'Create a demo account or sign in to see placed demo orders in your profile. There is no live fulfillment or courier tracking.'],
]

export function FAQPage() {
  return <div className="standard-page faq-page"><div className="page-intro"><span className="eyebrow">THE LITTLE THINGS</span><h1>Good to <em>know.</em></h1><p>All the answers to help you find your next step.</p></div><div className="faq-content">{faqItems.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span><i>0{index + 1}</i>{question}</span><b>+</b></summary><p>{answer}</p></details>)}<div className="faq-contact"><span>STILL HAVE A QUESTION?</span><Link to="/contact">Talk to a real person <ArrowUpRight size={15} /></Link></div></div></div>
}
