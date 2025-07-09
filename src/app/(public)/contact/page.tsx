"use client";

import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React, { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send, Bookmark } from "lucide-react";

import Facebook from "@/icons/Facebook";
import Instragram from "@/icons/Instragram";
import Linkedin from "@/icons/Linkedin";
import Twitter from "@/icons/Twitter";
import Youtube from "@/icons/Youtube";

const ContactPage = () => {
  const data = useAppSelector(selectStorefrontData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    sendCopy: false,
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
  });

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray500">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const { contact, socialMedia } = data;

  const socialLinks = [
    { Icon: Facebook, href: socialMedia?.facebook || "#", label: "Facebook" },
    { Icon: Twitter, href: socialMedia?.twitter || "#", label: "Twitter" },
    {
      Icon: Instragram,
      href: socialMedia?.instagram || "#",
      label: "Instagram",
    },
    { Icon: Youtube, href: socialMedia?.youtube || "#", label: "Youtube" },
    { Icon: Linkedin, href: socialMedia?.linkedin || "#", label: "LinkedIn" },
  ];

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement form submission logic here
    // For demonstration, we'll just show a success message
    setFormStatus({ submitted: true, error: false });

    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        sendCopy: false,
      });
      setFormStatus({ submitted: false, error: false });
    }, 5000);
  };

  return (
    <section className="min-h-screen relative  px-6">
      <div className="container mx-auto">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-main mb-4">
            Get In Touch
          </h1>
          <div className="w-24 h-1 bg-blue mx-auto mb-6"></div>
          <p className="text-gray400 max-w-2xl mx-auto">
            Have questions about our products or services? We're here to help
            you find the answers.
          </p>
        </div>

        <div className="mb-32">
          {/* Map */}
          <div className="relative h-[350px] overflow-hidden rounded-t-2xl shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.407836208667!2d90.3537238!3d23.7684872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14772c59d63%3A0x9a614f4d10c58043!2sNeelabh%20hues%20of%20blues!5e0!3m2!1sen!2sbd!4v1740633790827!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Form & Info */}
          <div className="bg-white rounded-b-2xl shadow p-4 md:p-12 relative z-10 transform -translate-y-0">
            <div className="flex flex-wrap -mx-4">
              {/* Form Section */}
              <div className="w-full lg:w-5/12 px-4 mb-10 lg:mb-0">
                <div className="bg-gray50 p-6 rounded-xl h-full">
                  <h3 className="text-2xl font-semibold text-brand-main mb-6">
                    Send Us a Message
                  </h3>

                  {formStatus.submitted ? (
                    <div className="bg-green/20 border border-green p-4 rounded-lg mb-6">
                      <p className="text-gray500 font-medium">
                        Thank you for your message! We'll get back to you
                        shortly.
                      </p>
                    </div>
                  ) : formStatus.error ? (
                    <div className="bg-red/20 border border-red p-4 rounded-lg mb-6">
                      <p className="text-gray500 font-medium">
                        There was an error sending your message. Please try
                        again.
                      </p>
                    </div>
                  ) : null}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        className="block text-sm font-medium mb-2 text-gray500"
                        htmlFor="name"
                      >
                        Full Name <span className="text-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-sm font-medium mb-2 text-gray500"
                        htmlFor="email"
                      >
                        Email Address <span className="text-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-sm font-medium mb-2 text-gray500"
                        htmlFor="subject"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent"
                        placeholder="Message Subject"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-sm font-medium mb-2 text-gray500"
                        htmlFor="message"
                      >
                        Message <span className="text-red">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent min-h-32"
                        placeholder="How can we help you?"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="sendCopy"
                          checked={formData.sendCopy}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue rounded border-gray300 focus:ring-blue"
                        />
                        <span className="ml-2 text-sm text-gray400">
                          Send me a copy of this message
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-brand-main text-white py-3 px-6 rounded-lg hover:bg-brand-main/90 transition duration-300 flex items-center justify-center font-medium"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info Section */}
              <div className="w-full lg:w-7/12 px-4">
                <div className="h-full flex flex-col">
                  <h3 className="text-2xl font-semibold text-brand-main mb-6">
                    Contact Information
                  </h3>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <div className="flex items-start p-4 bg-white border border-gray200 rounded-lg hover:shadow-md transition-shadow duration-300 h-full">
                        <div className="shrink-0">
                          <div className="bg-blue/10 p-3 rounded-full">
                            <Phone className="h-5 w-5 text-blue" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray500 mb-1">
                            Call Us
                          </p>
                          <p className="text-gray400">{contact.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <div className="flex items-start p-4 bg-white border border-gray200 rounded-lg hover:shadow-md transition-shadow duration-300 h-full">
                        <div className="shrink-0">
                          <div className="bg-blue/10 p-3 rounded-full">
                            <Mail className="h-5 w-5 text-blue" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray500 mb-1">
                            Email Us
                          </p>
                          <p className="text-gray400">{contact.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <div className="flex items-start p-4 bg-white border border-gray200 rounded-lg hover:shadow-md transition-shadow duration-300 h-full">
                        <div className="shrink-0">
                          <div className="bg-blue/10 p-3 rounded-full">
                            <MapPin className="h-5 w-5 text-blue" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray500 mb-1">
                            Visit Us
                          </p>
                          <p className="text-gray400">{contact.address}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                      <div className="flex items-start p-4 bg-white border border-gray200 rounded-lg hover:shadow-md transition-shadow duration-300 h-full">
                        <div className="shrink-0">
                          <div className="bg-blue/10 p-3 rounded-full">
                            <Clock className="h-5 w-5 text-blue" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray500 mb-1">
                            Business Hours
                          </p>
                          <p className="text-gray400">
                            Mon - Fri: 9:00 AM - 6:00 PM
                          </p>
                          <p className="text-gray400">
                            Sat: 10:00 AM - 4:00 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAQ */}
                  <div className="mb-8">
                    <div className="flex items-center mb-4">
                      <Bookmark className="h-5 w-5 text-blue mr-2" />
                      <h4 className="text-xl font-semibold text-gray500">
                        Frequently Asked
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.faq
                        ?.slice(0, 4)
                        .map(({ question, answer }, index) => (
                          <div
                            key={index}
                            className="bg-white p-4 rounded-lg border border-gray200 hover:shadow-md transition-shadow duration-300"
                          >
                            <h5 className="font-medium text-gray500 mb-2">
                              {question}
                            </h5>
                            <p className="text-sm text-gray400">{answer}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-auto">
                    <div className="flex items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray500">
                        Connect With Us
                      </h4>
                      <div className="h-px bg-gray200 flex-grow ml-4"></div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {socialLinks.map(({ Icon, href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          aria-label={label}
                          className="border border-gray200 rounded-full p-2 hover:bg-blue/10 hover:border-blue transition-colors duration-300"
                        >
                          <Icon />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
