// HPI 1.7-V
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { BaseCrudService } from '@/integrations';
import { Services, ProfessionalCredentials } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  // --- DATA SOURCES ---
  const [services, setServices] = useState<Services[]>([]);
  const [credentials, setCredentials] = useState<ProfessionalCredentials[]>([]);
  const [isLoadingServices, setIsLoadingServices] = useState(true);
  const [isLoadingCredentials, setIsLoadingCredentials] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadServices();
    loadCredentials();
  }, []);

  const loadServices = async () => {
    try {
      // Manually setting your services since the database service is missing 'getAll'
      setServices([
        {
          _id: '1',
          serviceName: 'Wealth Management',
          shortDescription: 'Comprehensive portfolio strategies designed for long-term growth and preservation.',
          benefits: 'Personalized asset allocation and risk management.'
        },
        {
          _id: '2',
          serviceName: 'Retirement Planning',
          shortDescription: 'Strategic roadmaps to ensure financial independence and lifestyle continuity.',
          benefits: 'Tax-efficient distribution strategies and income security.'
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
          credentialName: 'Certified Financial Expert',
          issuingOrganization: 'Industry Board',
          yearObtained: '2023',
          description: 'Recognized excellence in strategic financial architecture.'
        }
      ]);
    } catch (error) {
      console.error('Error loading credentials:', error);
    } finally {
      setIsLoadingCredentials(false);
    }
  };

  // --- FORMSPREE INTEGRATION ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
          _subject: `New QR Inquiry from ${formData.name}` // Tells you it came from the form
        }),
      });

      if (response.ok) {
        alert("Success! Form submitted."); // <--- Add this temporary line
        toast({
          title: "Inquiry Received",
          description: "Thank you. Let's grab 15 minutes next week to see if my strategy fits your goals.",
        });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please email ArkGrowth14@gmail.com directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- ANIMATION & SCROLL REFS ---
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
          <div className="flex flex-col justify-between border-r border-deepbrown/15 relative z-10 bg-background">
            <motion.div 
              style={{ y: heroTextY }}
              className="p-8 md:p-16 lg:p-24 flex-grow flex flex-col justify-center"
            >
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
                
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Button 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-primary text-primary-foreground hover:bg-deepbrown rounded-none px-8 py-7 text-base font-paragraph tracking-wide transition-colors duration-300"
                  >
                    Schedule Consultation
                  </Button>
                  <button 
                    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group flex items-center gap-2 font-paragraph text-primary hover:text-deepbrown transition-colors duration-300"
                  >
                    <span className="border-b border-primary/30 group-hover:border-deepbrown pb-1">Explore Services</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-2 border-t border-deepbrown/15 h-48 lg:h-64">
              <div className="p-8 flex items-end">
                <p className="font-paragraph text-sm text-deepbrown/70 max-w-[200px] leading-relaxed">
                  Grounded in expertise, focused on your holistic financial well-being.
                </p>
              </div>
              <div className="border-l border-deepbrown/15 relative overflow-hidden">
                <Image 
                  src="https://static.wixstatic.com/media/049acc_ac19b9d6f6d64e9180cde8f1ca30320f~mv2.png?originWidth=1152&originHeight=576"
                  alt="Detail texture"
                  className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  width={400}
                />
              </div>
            </div>
          </div>

          <div className="relative h-[60vh] lg:h-auto overflow-hidden bg-deepbrown">
            <motion.div 
              style={{ y: heroImageY }}
              className="absolute inset-0 w-full h-[120%]"
            >
              <Image 
                src="https://static.wixstatic.com/media/049acc_28f627c3284b4daebd278dd113336744~mv2.png?originWidth=1152&originHeight=576"
                alt="Financial planning consultation"
                className="w-full h-full object-cover"
                width={1200}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 mix-blend-multiply" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* NARRATIVE BRIDGE */}
      <section className="py-24 lg:py-40 px-8 md:px-16 max-w-[100rem] mx-auto flex justify-center text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="font-heading text-3xl md:text-5xl lg:text-6xl text-deepbrown leading-tight max-w-5xl"
        >
          We believe that true wealth is not merely accumulated, but <span className="text-primary italic">architected</span> with intention, foresight, and unwavering discipline.
        </motion.h2>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" ref={servicesRef} className="relative border-t border-deepbrown/15">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4 border-r border-deepbrown/15 relative">
            <div className="sticky top-0 h-screen flex flex-col justify-center p-8 md:p-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="font-paragraph text-sm tracking-widest uppercase text-primary mb-4 block">01. Our Expertise</span>
                <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
                  Comprehensive <br /> Advisory.
                </h2>
                <p className="font-paragraph text-lg text-deepbrown/80 mb-8">
                  Personalized financial solutions designed to meet your unique goals and circumstances, delivered with absolute clarity.
                </p>
                <div className="w-[1px] h-32 bg-deepbrown/10 relative overflow-hidden mt-8">
                  <motion.div 
                    style={{ height: servicesLineHeight }}
                    className="absolute top-0 left-0 w-full bg-primary"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {isLoadingServices ? (
              <div className="h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : services.length > 0 ? (
              <div className="flex flex-col">
                {services.map((service, index) => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="group border-b border-deepbrown/15 p-8 md:p-16 lg:p-24 hover:bg-white/50 transition-colors duration-500"
                  >
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                      <div className="w-24 h-24 shrink-0 rounded-full overflow-hidden border border-deepbrown/10 bg-background flex items-center justify-center p-4 group-hover:border-primary/30 transition-colors">
                        {service.icon ? (
                          <Image 
                            src={service.icon} 
                            alt={service.serviceName || 'Service icon'}
                            className="w-full h-full object-contain"
                            width={96}
                          />
                        ) : (
                          <div className="w-full h-full bg-deepbrown/5 rounded-full" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-heading text-3xl md:text-4xl text-foreground mb-4 group-hover:text-primary transition-colors">
                          {service.serviceName}
                        </h3>
                        <p className="font-paragraph text-lg text-deepbrown/80 mb-6 leading-relaxed">
                          {service.description || service.shortDescription}
                        </p>
                        {service.benefits && (
                          <div className="mb-8 bg-background/50 p-6 border border-deepbrown/5 rounded-sm">
                            <h4 className="font-heading text-sm uppercase tracking-wider text-primary mb-3">Key Benefits</h4>
                            <p className="font-paragraph text-base text-deepbrown">
                              {service.benefits}
                            </p>
                          </div>
                        )}
                        {service.learnMoreUrl && (
                          <a 
                            href={service.learnMoreUrl}
                            className="inline-flex items-center gap-2 font-paragraph text-primary hover:text-deepbrown transition-colors uppercase tracking-wider text-sm"
                          >
                            Explore Detail <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-12 md:py-24 px-6 text-center">
                <p className="font-heading text-2xl text-deepbrown mb-4">Strategic Guidance</p>
                <p className="font-paragraph text-lg md:text-xl text-deepbrown/80 max-w-3xl mx-auto leading-relaxed">
                  Our comprehensive suite of financial advisory services is currently being tailored to better serve our clients. 
                  For a private overview of our strategic offerings, please schedule a consultation below.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CREDENTIALS SECTION */}
      <section className="bg-deepbrown text-background py-24 lg:py-40 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F9F6F1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-background/20 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-paragraph text-sm tracking-widest uppercase text-primary mb-4 block">02. Trust & Authority</span>
              <h2 className="font-heading text-4xl md:text-6xl text-background">
                Professional <br /> Credentials.
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-paragraph text-lg text-background/70 max-w-md"
            >
              Backed by industry-recognized certifications and a commitment to continuous professional excellence.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoadingCredentials ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : credentials.length > 0 ? (
              credentials.map((credential, index) => (
                <motion.div
                  key={credential._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-background/5 border border-background/10 p-8 hover:bg-background/10 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    {credential.yearObtained && (
                      <span className="font-paragraph text-sm text-background/50 font-mono">
                        {credential.yearObtained}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-2xl text-background mb-2">
                    {credential.credentialName}
                  </h3>
                  {credential.issuingOrganization && (
                    <p className="font-paragraph text-primary mb-4 text-sm uppercase tracking-wider">
                      {credential.issuingOrganization}
                    </p>
                  )}
                  {credential.description && (
                    <p className="font-paragraph text-base text-background/70 mb-6 line-clamp-3">
                      {credential.description}
                    </p>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="font-paragraph text-lg text-background/60">
                  Credentials information is currently being updated.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full border-t border-deepbrown/15">
        <div className="grid lg:grid-cols-2 min-h-[80vh]">
          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center border-r border-deepbrown/15 bg-background">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-paragraph text-sm tracking-widest uppercase text-primary mb-4 block">03. Connect</span>
              <h2 className="font-heading text-5xl md:text-6xl text-foreground mb-8">
                Start Your <br /> Journey.
              </h2>
              <p className="font-paragraph text-xl text-deepbrown/80 mb-12 max-w-md">
                Reach out to discuss your financial goals and discover how our tailored advisory services can provide the clarity you seek.
              </p>
              
              <div className="space-y-8 border-t border-deepbrown/15 pt-12">
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-widest text-primary mb-2">Office Hours</h3>
                  <p className="font-paragraph text-lg text-foreground">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
                <div>
                  <h3 className="font-heading text-sm uppercase tracking-widest mb-2 text-primary">Direct Contact</h3>
                  <p className="font-paragraph text-lg text-foreground">ArkGrowth14@gmail.com</p>
                  <p className="font-paragraph text-lg text-primary">1 551-497-4438</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-xl w-full mx-auto lg:mx-0"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative">
                  <Input
                    name="name"
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-0 border-b border-deepbrown/30 rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary font-paragraph text-lg placeholder:text-deepbrown/40 transition-colors"
                    placeholder="Full Name *"
                  />
                </div>

                <div className="relative">
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-0 border-b border-deepbrown/30 rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary font-paragraph text-lg placeholder:text-deepbrown/40 transition-colors"
                    placeholder="Email Address *"
                  />
                </div>

                <div className="relative">
                  <Input
                    name="phone"
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-0 border-b border-deepbrown/30 rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary font-paragraph text-lg placeholder:text-deepbrown/40 transition-colors"
                    placeholder="Phone Number"
                  />
                </div>

                <div className="relative pt-4">
                  <Textarea
                    name="message"
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border-0 border-b border-deepbrown/30 rounded-none px-0 py-4 bg-transparent focus-visible:ring-0 focus-visible:border-primary font-paragraph text-lg placeholder:text-deepbrown/40 resize-none transition-colors"
                    placeholder="How can we assist you? *"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-foreground text-background hover:bg-primary rounded-none py-8 text-lg font-paragraph tracking-wide transition-colors duration-300 mt-8"
                >
                  {isSubmitting ? 'Transmitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
