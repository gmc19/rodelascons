
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const FaqSection = () => {
  const faqs = [
    {
      question: "What types of construction services do you offer?",
      answer: "We offer a comprehensive range of construction services including commercial construction, residential construction, renovation & remodeling, and construction management. Our team specializes in both new builds and renovations across various sectors."
    },
    {
      question: "How long has your company been in operation?",
      answer: "Rodelas Construction Services has been delivering exceptional construction solutions since 2010. We bring over 13 years of experience and expertise to every project we undertake."
    },
    {
      question: "Do you provide free estimates for projects?",
      answer: "Yes, we provide free estimates and consultations for all potential projects. Contact us through our website or call us directly to schedule an appointment with one of our project managers."
    },
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary depending on the scope and complexity of the work. During the consultation phase, we provide detailed timelines with key milestones. We pride ourselves on completing projects on schedule without compromising quality."
    },
    {
      question: "Do you handle permits and inspections?",
      answer: "Yes, we handle all necessary permits, approvals, and inspections required for your construction project. Our team is well-versed in local building codes and regulations to ensure your project meets all requirements."
    },
    {
      question: "What sets your construction company apart from others?",
      answer: "What distinguishes us is our commitment to quality, transparent communication, on-time delivery, and exceptional customer service. We employ highly skilled professionals and use premium materials to ensure the longevity and durability of every project."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to some of the most common questions about our construction services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-montserrat font-medium text-rcs-blue hover:text-rcs-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
