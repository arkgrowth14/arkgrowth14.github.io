import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-deepbrown text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="font-heading text-3xl text-primary-foreground mb-4">
              DRUR
            </h3>
            <p className="font-paragraph text-base text-primary-foreground/80">
              Strategic financial advisory services for individuals and businesses seeking sustainable growth and security.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl text-primary-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-heading text-xl text-primary-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary-foreground/80 mt-1 flex-shrink-0" />
                <a 
                  href="mailto:info@drur.com"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  info@drur.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-primary-foreground/80 mt-1 flex-shrink-0" />
                <a 
                  href="tel:+1234567890"
                  className="font-paragraph text-base text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-foreground/80 mt-1 flex-shrink-0" />
                <span className="font-paragraph text-base text-primary-foreground/80">
                  Financial District, New York
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-heading text-xl text-primary-foreground mb-4">
              Business Hours
            </h4>
            <ul className="space-y-2">
              <li className="font-paragraph text-base text-primary-foreground/80">
                Monday - Friday
              </li>
              <li className="font-paragraph text-base text-primary-foreground/80">
                9:00 AM - 5:00 PM
              </li>
              <li className="font-paragraph text-base text-primary-foreground/80 mt-4">
                Appointments Available
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-primary-foreground/70">
              © {currentYear} DRUR Financial Advisory. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a 
                href="#privacy"
                className="font-paragraph text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms"
                className="font-paragraph text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
