"use client";

import Facebook from "@/icons/Facebook";
import Instragram from "@/icons/Instragram";
import Linkedin from "@/icons/Linkedin";
import Twitter from "@/icons/Twitter";
import Youtube from "@/icons/Youtube";
import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link, Mail, MapPin, Phone, Clock, Award, Users } from "lucide-react";
import React from "react";

const AboutPage = () => {
  const data = useAppSelector(selectStorefrontData);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  const { aboutUs } = data.pages;

  const socialLinks = [
    {
      Icon: Facebook,
      href: data?.socialMedia?.facebook || "#",
    },
    {
      Icon: Twitter,
      href: data?.socialMedia?.twitter || "#",
    },
    {
      Icon: Instragram,
      href: data?.socialMedia?.instagram || "#",
    },
    {
      Icon: Youtube,
      href: data?.socialMedia?.youtube || "#",
    },
    {
      Icon: Linkedin,
      href: data?.socialMedia?.linkedin || "#",
    },
  ];
  // Placeholder company values - replace with actual data from your store
  const companyValues = [
    {
      icon: <Award className="h-10 w-10 text-blue" />,
      title: "Quality",
      description:
        "We're committed to providing the highest quality products and services to our customers.",
    },
    {
      icon: <Users className="h-10 w-10 text-blue" />,
      title: "Customer-Centric",
      description:
        "Our customers are at the heart of everything we do. Your satisfaction is our priority.",
    },
    {
      icon: <Clock className="h-10 w-10 text-blue" />,
      title: "Reliability",
      description:
        "Count on us for timely delivery and consistent service excellence every time.",
    },
  ];

  return (
    <section className="min-h-screen relative ">
      {/* Hero Section with Background */}
      {/* <div className="absolute top-0 left-0 w-full h-80 bg-brand-main opacity-70 z-0"></div> */}

      <div className="container mx-auto px-6 relative z-10">
        {/* About Us Header */}
        <div className="mb-24  mx-auto">
          <div className="bg-white rounded-xl  p-10  relative">
            <h1 className="text-center text-5xl font-bold text-brand-main mb-6">
              About Us
            </h1>
            <div className="w-24 h-1.5 bg-blue mx-auto mb-8"></div>
            <div
              className="text-gray-700 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: aboutUs }}
            ></div>
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-semibold text-brand-main mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow p-8 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue/10 p-4 rounded-full mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-brand-main mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information with Map */}
        <div className="bg-white rounded-xl p-4 border overflow-hidden mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10">
              <h2 className="text-3xl font-semibold text-brand-main mb-8">
                Contact Us
              </h2>
              <div className="space-y-8">
                <div className="flex items-center">
                  <div className="bg-blue/10 p-4 rounded-full mr-5">
                    <Mail className="h-6 w-6 text-blue" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Email</p>
                    <a
                      href={`mailto:${data.contact.email}`}
                      className="text-brand-main font-medium text-lg hover:text-blue transition-colors"
                    >
                      {data.contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue/10 p-4 rounded-full mr-5">
                    <Phone className="h-6 w-6 text-blue" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Phone</p>
                    <a
                      href={`tel:${data.contact.phone}`}
                      className="text-brand-main font-medium text-lg hover:text-blue transition-colors"
                    >
                      {data.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue/10 p-4 rounded-full mr-5">
                    <MapPin className="h-6 w-6 text-blue" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Address</p>
                    <p className="text-brand-main font-medium text-lg">
                      {data.contact.address}
                    </p>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="mt-8 pt-8 border-t border-gray100">
                  <p className="text-gray-500 mb-4">Connect with us</p>
                  <div className="flex space-x-5">
                    <a
                      href="#"
                      className="bg-blue/10 p-3 rounded-full hover:bg-blue hover:text-white transition-colors"
                    >
                      <Facebook />
                    </a>
                    <a
                      href="#"
                      className="bg-blue/10 p-3 rounded-full hover:bg-blue hover:text-white transition-colors"
                    >
                      <Instragram />
                    </a>
                    <a
                      href="#"
                      className="bg-blue/10 p-3 rounded-full hover:bg-blue hover:text-white transition-colors"
                    >
                      <Twitter />
                    </a>
                    <a
                      href="#"
                      className="bg-blue/10 p-3 rounded-full hover:bg-blue hover:text-white transition-colors"
                    >
                      <Linkedin />
                    </a>
                    <a
                      href="#"
                      className="bg-blue/10 p-3 rounded-full hover:bg-blue hover:text-white transition-colors"
                    >
                      <Youtube />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps placeholder - Replace with actual Google Maps embed */}
            <div className="bg-gray100 h-full min-h-80 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.407836208667!2d90.3537238!3d23.7684872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14772c59d63%3A0x9a614f4d10c58043!2sfashion-client%20hues%20of%20blues!5e0!3m2!1sen!2sbd!4v1740633790827!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-brand-main rounded-xl shadow-md p-12 text-center text-white">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to shop with us?
          </h2>
          <p className="text-brand-light1 mb-8 max-w-2xl mx-auto">
            Browse our collection today and discover why customers trust us for
            quality products and exceptional service.
          </p>
          <a
            href="/products"
            className="inline-block bg-blue hover:bg-blue/90 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
