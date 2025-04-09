
import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    email: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Robert Rodelas",
    role: "Founder & CEO",
    bio: "With over 20 years of construction industry experience, Robert leads RCS with a vision for excellence and innovation in every project.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "https://linkedin.com",
      email: "robert@rcs-construction.com"
    }
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Project Manager",
    bio: "Maria ensures every project is delivered on time and within budget while maintaining the highest quality standards our clients expect.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "https://linkedin.com",
      email: "maria@rcs-construction.com"
    }
  },
  {
    id: 3,
    name: "David Chen",
    role: "Lead Architect",
    bio: "David brings creative vision and technical expertise to transform client ideas into innovative, functional and beautiful structures.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80",
    social: {
      linkedin: "https://linkedin.com",
      email: "david@rcs-construction.com"
    }
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Interior Designer",
    bio: "Sarah specializes in creating stunning interior spaces that perfectly balance aesthetics, functionality, and client preferences.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
    social: {
      email: "sarah@rcs-construction.com"
    }
  }
];

const TeamMemberCard = ({ member, delay }: { member: TeamMember; delay: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-lg overflow-hidden shadow-md transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } hover:shadow-xl`}
    >
      <div className="relative overflow-hidden h-64">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-rcs-blue">{member.name}</h3>
        <p className="text-rcs-gold font-medium mb-3">{member.role}</p>
        <p className="text-gray-600 mb-4">{member.bio}</p>
        <div className="flex space-x-3">
          {member.social.linkedin && (
            <a 
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rcs-blue/10 hover:bg-rcs-blue/20 text-rcs-blue p-2 rounded-full transition-colors"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
          )}
          <a 
            href={`mailto:${member.social.email}`}
            className="bg-rcs-blue/10 hover:bg-rcs-blue/20 text-rcs-blue p-2 rounded-full transition-colors"
            aria-label={`Email ${member.name}`}
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <section className="py-20 bg-rcs-gray">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-rcs-blue mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of experienced professionals is dedicated to bringing your construction vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member.id} 
              member={member}
              delay={index * 100} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
