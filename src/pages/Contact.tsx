import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import DOMPurify from 'dompurify';

// Function to sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input.trim());
};

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Sanitize all input data before submission
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        service: sanitizeInput(formData.service),
        message: sanitizeInput(formData.message)
      };
      
      // In a real app, you would submit the sanitized data to your backend
      console.log('Form submitted:', sanitizedData);
      
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }
  };

  return (
    <>
      <div className="pt-24 pb-20 bg-rcs-blue/90">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contact Us</h1>
            <p className="text-xl text-white/80">
              Reach out to discuss your construction needs or request a quote. We're here to help bring your vision to life.
            </p>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-rcs-blue mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you have a question about our services, need a quote, or want to discuss your project, our team is ready to assist you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-rcs-blue rounded-full p-3 mr-4">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-rcs-blue">Phone</h3>
                    <p className="text-gray-600 mt-1">Globe: 09670598903/09951858305</p>
                    <p className="text-gray-600 mt-1">Landline: 049-547-0926</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-rcs-blue rounded-full p-3 mr-4">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-rcs-blue">Email</h3>
                    <p className="text-gray-600 mt-1">engineeringdreams.rcs@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-rcs-blue rounded-full p-3 mr-4">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-rcs-blue">Office Location</h3>
                    <p className="text-gray-600 mt-1">
                      Block 8 Lot 7 Phase 2 Gregory Street,<br />
                      St. Joseph Village, 7 Marinig, Cabuyao, 4025 Laguna
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-bold text-rcs-blue mb-4">Office Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-rcs-blue mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rcs-blue ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Full Name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rcs-blue ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Email Address"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rcs-blue"
                    placeholder="Phone Number"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service of Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rcs-blue"
                  >
                    <option value="">Select a service</option>
                    <option value="Commercial Construction">Commercial Construction</option>
                    <option value="Residential Construction">Residential Construction</option>
                    <option value="Renovation & Remodeling">Renovation & Remodeling</option>
                    <option value="Construction Management">Construction Management</option>
                    <option value="General Contracting">General Contracting</option>
                    <option value="Design-Build Services">Design-Build Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rcs-blue ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Tell us about your project or question..."
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-rcs-blue text-white font-semibold py-3 rounded-md hover:bg-blue-900 transition-colors duration-300 flex items-center justify-center"
                >
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold text-rcs-blue mb-8 text-center">Our Location</h2>
          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            {/* Primary Google Maps iframe with fallback */}
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5070.085611400343!2d121.1527285760898!3d14.267298285147966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d9c7daf0caf5%3A0xe4fafc59e87b1190!2sThe%20Brew%20Deck!5e1!3m2!1sen!2sph!4v1744209848744!5m2!1sen!2sph"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onError={(e) => {
                // If iframe fails to load, replace with a link to Google Maps
                const target = e.target as HTMLIFrameElement;
                const container = target.parentElement;
                if (container) {
                  const link = document.createElement('a');
                  link.href = "https://www.google.com/maps?q=14.267298285147966,121.1527285760898"; // Direct link to coordinates
                  link.target = "_blank";
                  link.rel = "noopener noreferrer";
                  link.className = "block w-full h-full relative";
                  
                  // Use a static map image as background
                  const img = document.createElement('img');
                  img.src = "https://maps.googleapis.com/maps/api/staticmap?center=14.267298285147966,121.1527285760898&zoom=15&size=800x600&maptype=roadmap&markers=color:red%7C14.267298285147966,121.1527285760898&key="; // No API key needed for static image
                  img.alt = "Map to Rodelas Construction Services";
                  img.className = "w-full h-full object-cover";
                  
                  // Add a button on top of the image
                  const button = document.createElement('div');
                  button.className = "absolute inset-0 flex items-center justify-center";
                  button.innerHTML = '<div class="bg-rcs-blue text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-900 transition-colors">View on Google Maps</div>';
                  
                  link.appendChild(img);
                  link.appendChild(button);
                  container.innerHTML = '';
                  container.appendChild(link);
                }
              }}
            ></iframe>
          </div>
          
          {/* Add text directions below the map for better accessibility */}
          <div className="mt-6 text-center text-gray-700">
            <p>Block 8 Lot 7 Phase 2 Gregory Street, St. Joseph Village, 7 Marinig, Cabuyao, 4025 Laguna</p>
            <p className="mt-2">
              <a 
                href="https://www.google.com/maps?q=14.267298285147966,121.1527285760898" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-rcs-blue hover:underline inline-flex items-center"
              >
                <MapPin size={16} className="mr-1" /> Get Directions
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
