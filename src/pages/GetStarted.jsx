import { Accordion, AccordionItem } from "@nextui-org/react"
import React from "react"
import { Footer } from "../components"

function GetStarted() {
  const contentData = [
    {
      title: "What is FinTrack?",
      content:
        "FinTrack is a beginner-friendly portfolio management and paper trading app designed to help you learn about stock investments and manage your portfolio effortlessly. Whether you're new to investing or looking to refine your skills, FinTrack provides the tools you need to make informed decisions without the risk of real-money trading.",
    },
    {
      title: "Features",
      content: `
        - Portfolio Management: Easily track and manage your stock investments in one place.
        - Paper Trading: Simulate real-world trading without financial risk.
        - Real-Time Data: Access up-to-date stock market information to stay informed.
        - Educational Resources: Learn the basics of investing with our comprehensive guides and tutorials.
        - User-Friendly Interface: Navigate through the app effortlessly with a clean and intuitive design.
      `,
    },
    {
      title: "How We Built FinTrack",
      content: `
        1. Conceptualization: Identified the needs of beginner investors and outlined key features.
        2. Design: Created a minimalistic and intuitive UI/UX design to ensure ease of use.
        3. Development: Used modern web technologies to bring FinTrack to life.
        4. Testing: Conducted thorough testing to ensure a smooth and reliable experience.
        5. Launch: Made FinTrack available for users to start their investment journey.
      `,
    },
    {
      title: "Tech Stack",
      content: `
        - Frontend: Built with React and Next UI for a dynamic and responsive user interface.
        - State Management: Utilized Redux Toolkit for efficient state management.
        - Backend: Powered by Supabase for reliable and scalable backend services.
        - Forms: Integrated React Hook Form for smooth and intuitive form handling.
        - Database: PostgreSQL for secure and structured data storage.
      `,
    },
    {
      title: "Getting Started",
      content: `
        1. Sign Up: Create your free FinTrack account to get started.
        2. Explore: Navigate through the portfolio and paper trading features to familiarize yourself with the app.
        3. Learn: Use our educational resources to build your investment knowledge.
        4. Trade: Start paper trading to practice your investment strategies without any financial risk.
        5. Manage: Keep track of your portfolio and monitor your progress.
      `,
    },
  ]

  return (
    <div className="space-y-6">
      <Accordion variant="splitted" selectionMode="multiple">
        {contentData.map((item) => (
          <AccordionItem title={item.title}>
            {item.content.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
      <Footer />
    </div>
  )
}

export default GetStarted
