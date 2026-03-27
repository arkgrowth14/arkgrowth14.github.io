// HPI 1.7-V (Final Combined Build - FIXED)
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Services, ProfessionalCredentials } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  // --- STATE MANAGEMENT ---
  const [services, setServices] = useState<Services[]>([]);
  const [credentials, setCredentials] = useState<ProfessionalCredentials[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    loadServices();
    loadCredentials();
  }, []);

  // --- STATIC DATA LOADERS ---
  const loadServices = async () => {
    try {
      setServices([
        {
          _id: '1',
          serviceName: 'Wealth Architecture',
          shortDescription: 'Custom financial frameworks designed for long-term growth and generational preservation.',
          benefits: 'Personalized asset allocation and risk-mitigated growth strategies.'
        },
        {
          _id: '2',
          serviceName: 'Strategic Planning',
          shortDescription: 'Comprehensive roadmaps to ensure financial independence and lifestyle continuity.',
          benefits: 'Tax-efficient distribution strategies and structural income security.'
        }
      ]);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoadingServices(false);
    }
  };

  const loadCredentials = async () => {
    try {
      setCredentials([
        {
          _id: '1',
          credentialName: 'Professional Financial Advisor',
          issuingOrganization: 'Strategic Finance Board',
          yearObtained: '2024',
          description: 'Certified expertise in wealth management and architectural financial planning.'
        }
      ]);
    } catch (error) {
      console.error('Error loading credentials:', error);
    } finally {
      setIsLoadingCredentials(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);

    const urlParams = new URLSearchParams(window.location.search);
    const sourceTag = urlParams.get('utm_source') || 'Direct Website Visit';

    try {
      const response = await fetch("https://formspree.io/f/xkoqzdgz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          source: sourceTag,
          _subject: `Strategy Inquiry: ${formData.name} [via ${sourceTag}]`
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        toast({
          title: "Inquiry Sent",
          description: "I will be in touch shortly.",
        });
        setTimeout(() => setIsSuccess(false), 15000);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Submission failed");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Please email ArkGrowth14@gmail.com directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- ANIMATION SETTINGS ---
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroImageY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const heroTextY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);

  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: servicesScroll } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });
  const servicesLineHeight = useTransform(servicesScroll, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary overflow-clip">
      <Header />
      
      {/* HERO SECTION */}
      <section ref={heroRef} className="relative w-full pt-24 lg:pt-0 border-b border-deepbrown/15">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[90vh] lg:min-h-screen">
          
          {/* LEFT SIDE: HEADLINE */}
          <div className="flex flex-col justify-center border-r border-deepbrown/15 relative z-10 bg-background p-8 md:p-16 lg:p-24">
            <motion.div style={{ y: heroTextY }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-heading text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] text-foreground mb-8 tracking-tight">
                  Strategic <br />
                  <span className="text-primary italic">Financial</span> <br />
                  Guidance.
                </h1>
                <p className="font-paragraph text-lg md:text-xl text-deepbrown/80 max-w-md mb-12 leading-relaxed">
                  Expert advisory services tailored to help you achieve lasting financial security, clarity, and generational growth.
                </p>
                
                <Button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary text-primary-foreground hover:bg-deepbrown rounded-none px-8 py-7 text-base font-paragraph tracking-wide transition-colors duration-300"
                >
                  Schedule Consultation
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: LIGHT GOLD IMAGE + INTEGRATED TAGLINE */}
          <div className="relative h-[70vh] lg:h-auto overflow-hidden bg-deepbrown flex items-center justify-center">
            
            {/* Background Image with Parallax */}
            <motion.div style={{ y: heroImageY }} className="absolute inset-0 w-full h-[120%]">
              {/* Overlay fixed - no stray comments inside brackets */}
              <div className="absolute inset-0 bg-background/10 z-10" /> 
              <Image 
                src="https://static.wixstatic.com/media/049acc_28f627c3284b4daebd278dd113336744~mv2.png?originWidth=1152&originHeight=576"
                alt="Financial planning"
                className="w-full h-full object-cover"
                width={1200}
              />
            </motion.div>

            {/* INTEGRATED TAGLINE */}
            <div className="relative z-20 p-8 md:p-16 text-center">
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-paragraph text-2xl md:text-3xl lg:text-4xl text-[#1A1A1A] font-light leading-relaxed tracking-wide drop-shadow-sm"
              >
                “Grounded in expertise, focused on your holistic financial well-being.”
              </motion.p>
              <div className="mt-8 w-16 h-[1px] bg-primary mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" ref={servicesRef} className="relative border-t border-deepbrown/15">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 border-r border-deepbrown/15 relative">
            <div className="sticky top-0 h-screen flex flex-col justify-center p-8 md:p-16">
              <span className="font-paragraph text-sm tracking-widest uppercase text-primary mb-4 block">01. Our Expertise</span>
              <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">Comprehensive <br /> Advisory.</h2>
              <div className="w-[1px] h-32 bg-deepbrown/10 relative overflow-hidden mt-8">
                <motion.div style={{ height: servicesLineHeight }} className="absolute top-0 left-0 w-full bg-primary" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            {services.map((service, index) => (
              <div key={index} className="border-b border-deepbrown/15 p-8 md:p-16 lg:p-24">
                <h3 className="font-heading text-3xl mb-4 text-foreground">{service.serviceName}</h3>
                <p className="font-paragraph text-lg text-deepbrown/80 mb-4">{service.shortDescription}</p>
                <p className="text-primary text-sm font-paragraph italic">Key Benefit: {service.benefits}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full border-t border-deepbrown/15">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center border-r border-deepbrown/15 bg-background">
            <span className="font-paragraph text-sm tracking-widest uppercase text-primary mb-4 block">03. Connect</span>
            <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">Start Your <br /> Journey.</h2>
            <div className="space-y-4 pt-12 border-t border-deepbrown/15">
              <p className="font-paragraph text-lg text-foreground">ArkGrowth14@gmail.com</p>
              <p className="font-paragraph text-lg text-primary">1 551-497-4438</p>
            </div>
          </div>

          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
            <form onSubmit={handleSubmit} className="space-y-8">
              <Input
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-0 border-b border-deepbrown/30 rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary font-paragraph text-lg"
                placeholder="Full Name *"
              />
              <Input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-0 border-b border-deepbrown/30 rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary font-paragraph text-lg"
                placeholder="Email Address *"
              />
              <Input
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border-0 border-b border-deepbrown/30 rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary font-paragraph text-lg"
                placeholder="Phone Number"
              />
              <Textarea
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border-0 border-b border-deepbrown/30 rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary font-paragraph text-lg resize-none"
                placeholder="How can we assist you? *"
              />

              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-primary/5 border border-primary/20 rounded-none"
                  >
                    <h4 className="font-heading text-primary text-sm uppercase tracking-widest mb-2">Inquiry Received</h4>
                    <p className="font-paragraph text-deepbrown text-sm">
                      Thank you. I've received your details. Let's grab 15 minutes next week to see if my strategy fits your goals.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-primary rounded-none py-8 text-lg font-paragraph tracking-wide transition-colors"
              >
                {isSubmitting ? 'Architecting...' : 'Submit Inquiry'}
              </Button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
