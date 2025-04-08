import React from 'react';
import { Button, Card } from "flowbite-react";
import img3 from './assets/img3.jpg';

import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";

import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const cardData = [
  {
    title: "Noteworthy technology acquisitions 2021",
    description:
      "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
  },
  {
    title: "The Future of AI in Hiring",
    description:
      "Explore how AI and machine learning are revolutionizing the recruitment industry.",
  },
  {
    title: "Top Skills Employers Look For",
    description:
      "A curated list of top soft and hard skills that increase your job market value.",
  },
  {
    title: "Career Paths in Tech",
    description:
      "Understand the different roles in the tech ecosystem and which suits you best.",
  },
  {
    title: "Remote Work: Pros & Cons",
    description:
      "Weigh the advantages and challenges of working from home in the post-pandemic era.",
  },
  {
    title: "How to Crack Interviews",
    description:
      "Tips and tricks to excel in your next job interview, from HR experts.",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="container mx-auto mt-8 px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text */}
          <div className="md:mr-8 mb-8 md:mb-0">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Your Comprehensive{" "}
              </span>
              Employment Platform
            </h1>
            <p className="font-normal max-w-lg text-xl leading-loose text-gray-900">
              CareerGLIDE is a platform where not only are jobs{" "}
              <span className="text-blue-600 dark:text-blue-500">
                hunting for you
              </span>{" "}
              but you are also gaining the crucial competencies necessary for
              such roles.
            </p>
          </div>
          {/* Image */}
          <div className="flex-shrink-0">
            <img src={img3} className="h-auto max-w-md rounded-lg" alt="Career Glide" />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto my-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card, index) => (
            <Card key={index} className="max-w-sm">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {card.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {card.description}
              </p>
              <Button>
                Read more
                <svg
                  className="-mr-1 ml-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <Footer container className="mt-12">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <FooterBrand href="#" src="/favicon.ico" alt="CareerGLIDE Logo" name="CareerGLIDE" />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle title="About" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Careers</FooterLink>
                  <FooterLink href="#">Blog</FooterLink>
                  <FooterLink href="#">Team</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Follow us" />
                <FooterLinkGroup col>
                  <FooterLink href="#">GitHub</FooterLink>
                  <FooterLink href="#">Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms & Conditions</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="CareerGLIDE™" year={2025} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
              <FooterIcon href="#" icon={BsGithub} />
              <FooterIcon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
}
