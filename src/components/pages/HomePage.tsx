// HPI 2.0-V (Philosophy Pivot Build)
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Services } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, ShieldCheck, Target, Zap } from 'lucide-react';

export default function HomePage() {
  const [services, setServices] = useState<Services[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  
  const { toast } = useToast();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setServices([
      {
        _id: '1',
        serviceName: 'Wealth Architecture',
        shortDescription: 'We engineer custom financial frameworks designed for long-term capital appreciation and the seamless preservation of generational legacy.',
        benefits: 'Our approach integrates advanced asset allocation with institutional-grade risk management. We focus on creating tax-efficient structures and alternative investment strategies.'
      },
      {
        _id: '2',
        serviceName: 'Strategic Planning',
        shortDescription: 'Comprehensive, data-driven roadmaps that synchronize your current lifestyle with your long-term vision for financial independence.',
        benefits: 'We map out multi-decade cash flow models and structural income security plans to maintain your standard of living without compromise.'
      },
      {
        _id: '3',
        serviceName: 'Legacy & Estate Governance',
        shortDescription: 'Sophisticated coordination of Wills and Trusts to ensure your intent is executed with precision and your family is protected.',
        benefits: 'By integrating legal directives with your financial structure, we minimize probate exposure and ensure a frictionless transfer of assets.'
      }
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xkoqzdgz", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ ...formData, _subject: `Audit Request: ${formData.name}` }),
      });
      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        toast({ title: "Audit Requested", description: "I will contact you shortly." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Please email ArkGrowth14@gmail.com", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: servicesScroll } = useScroll({ target: servicesRef, offset: ["start end", "end start"] });
  const servicesLineHeight = useTransform(servicesScroll, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-clip font-paragraph">
      <Header />
      
      {/* HERO SECTION */}
      <section className="relative w-full border-b border-deepbrown/15">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center border-r border-deepbrown/15 bg-background p-8 md:p-16 lg:p-24">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] mb-8">
                Strategic <br /> <span className="text-primary italic">Financial</span> <br /> Guidance.
              </h1>
              <p className="text-lg md:text-xl text-deepbrown/80 max-w-md mb-12">
                Expert advisory services tailored for lasting security and generational growth.
              </p>
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary text-primary-foreground rounded-none px-8 py-7">
                Schedule Strategy Audit
              </Button>
            </motion.div>
          </div>
          <div className="relative bg-deepbrown flex items-center justify-center overflow-hidden">
             <Image src="https://static.wixstatic.com/media/049acc_28f627c3284b4daebd278dd113336744~mv2.png?originWidth=1152&originHeight=576" alt="Financial planning" className="w-full h-full object-cover opacity-90" width={1200} />
             <div className="absolute z-20 p-8 text-center bg-background/5 backdrop-blur-sm border border-white/10">
                <p className="text-2xl md:text-3xl text-[#1A1A1A] font-light italic">“Grounded in expertise, focused on your well-being.”</p>
             </div>
          </div>
        </div>
      </section>

      {/* 01. SERVICES SECTION */}
      <section id="services" ref={servicesRef} className="relative border-t border-deepbrown/15">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 border-r border-deepbrown/15 p-8 md:p-16 sticky top-0 h-fit lg:h-screen flex flex-col justify-center">
            <span className="text-sm tracking-widest uppercase text-primary mb-4 block">01. Our Expertise</span>
            <h2 className="font-heading text-4xl md:text-6xl mb-6">Comprehensive <br /> Advisory.</h2>
            <div className="w-[1px] h-32 bg-deepbrown/10 relative mt-8">
              <motion.div style={{ height: servicesLineHeight }} className="absolute top-0 left-0 w-full bg-primary" />
            </div>
          </div>
          <div className="lg:col-span-8">
            {services.map((s, i) => (
              <div key={i} className="border-b border-deepbrown/15 p-8 md:p-16 lg:p-24 min-h-[450px] flex flex-col justify-center">
                <h3 className="font-heading text-4xl mb-6">{s.serviceName}</h3>
                <p className="text-xl text-deepbrown/90 mb-8 max-w-2xl">{s.shortDescription}</p>
                <div className="pt-8 border-t border-deepbrown/10 grid md:grid-cols-2 gap-8 text-deepbrown/70 text-base">
                  <p>{s.benefits.split('. ').slice(0, 1).join('. ') + '.'}</p>
                  <p className="border-l border-primary/20 pl-8 italic">{s.benefits.split('. ').slice(1).join('. ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02. PHILOSOPHY SECTION (THE NEW 02) */}
      <section className="bg-[#FAF9F6] border-t border-deepbrown/15">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 border-r border-deepbrown/15 p-8 md:p-16 flex flex-col justify-center">
            <span className="text-sm tracking-widest uppercase text-primary mb-4 block">02. The Philosophy</span>
            <h2 className="font-heading text-4xl md:text-6xl">Intentional <br /> Growth.</h2>
          </div>
          <div className="lg:col-span-8 p-8 md:p-16 lg:p-24 grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <ShieldCheck className="w-10 h-10 text-primary" />
              <h4 className="text-2xl font-heading">Protection First</h4>
              <p className="text-deepbrown/70 leading-relaxed">We believe a strategy is only as good as its foundation. By prioritizing risk mitigation and structural integrity, we ensure your wealth can withstand market volatility.</p>
            </div>
            <div className="space-y-6">
              <Target className="w-10 h-10 text-primary" />
              <h4 className="text-2xl font-heading">Outcome Oriented</h4>
              <p className="text-deepbrown/70 leading-relaxed">Wealth is a tool, not the finish line. We align every investment decision with your specific lifestyle goals and the legacy you wish to leave behind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. CONTACT SECTION */}
      <section id="contact" className="w-full border-t border-deepbrown/15">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center border-r border-deepbrown/15 bg-background">
            <span className="text-sm tracking-widest uppercase text-primary mb-4 block">03. Connect</span>
            <h2 className="font-heading text-5xl md:text-6xl mb-8">Start Your <br /> Journey.</h2>
            <div className="space-y-4 pt-12 border-t border-deepbrown/15 text-lg">
              <p>ArkGrowth14@gmail.com</p>
              <p className="text-primary">1 551-497-4438</p>
            </div>
          </div>
          <div className="p-8 md:p-16 lg:p-24 bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Input name="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border-0 border-b border-deepbrown/30 rounded-none bg-transparent text-lg px-0 py-4 focus-visible:ring-0 focus-visible:border-primary" placeholder="Full Name *" />
              <Input name="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border-0 border-b border-deepbrown/30 rounded-none bg-transparent text-lg px-0 py-4 focus-visible:ring-0 focus-visible:border-primary" placeholder="Email Address *" />
              <Textarea name="message" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="border-0 border-b border-deepbrown/30 rounded-none bg-transparent text-lg px-0 py-4 focus-visible:ring-0 focus-visible:border-primary resize-none" placeholder="How can we assist you? *" />
              <AnimatePresence>
                {isSuccess && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-6 bg-primary/5 border border-primary/20">
                    <p className="text-deepbrown text-sm">I will reach out shortly to coordinate your <strong>Strategy & Legacy Audit</strong>.</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-foreground text-background hover:bg-primary rounded-none py-8 text-lg">
                {isSubmitting ? 'Architecting...' : 'Request Strategy Audit'}
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
