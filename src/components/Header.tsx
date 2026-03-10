import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-secondary border-b border-primary/10 sticky top-0 z-50">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-6">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <Image
              src="https://static.wixstatic.com/media/049acc_f37af3ebd13b4d19ac926e2485e0d932~mv2.jpg"
              alt="ARK Growth Logo"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
            <div className="flex flex-col">
              <h1 className="font-heading text-xl md:text-2xl text-deepbrown leading-tight">
                ARK
              </h1>
              <p className="font-paragraph text-xs md:text-sm text-secondary-foreground">
                GROWTH
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6"
            >
              Get In Touch
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-primary p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 flex flex-col gap-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}
              className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors text-left py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors text-left py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="font-paragraph text-base text-secondary-foreground hover:text-primary transition-colors text-left py-2"
            >
              Contact
            </button>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
            >
              Get In Touch
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
