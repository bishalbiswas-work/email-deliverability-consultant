import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function EmailList() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  // const lastSegment = pathSegments[pathSegments.length - 1]; // 'doctor' assumed as the last segment
  const lastSegment = pathSegments.length > 0 ? pathSegments[0] : null;

  useEffect(() => {
    console.log(lastSegment)
  }, [])
  //   const data = [
  //     {
  //       name: "David Kaiz",
  //       title: "Chief executive officer",
  //       company: "Uber.com",
  //       location: "London, United Kingdom",
  //     },
  //     {
  //       name: "Sukhleen Aneja",
  //       title: "Founder",
  //       company: "Betimeful.com",
  //       location: "London, United Kingdom",
  //     },
  //     {
  //       name: "Liam Brown",
  //       title: "Chief Technology Officer",
  //       company: "TechWorld.com",
  //       location: "San Francisco, United States",
  //     },
  //     {
  //       name: "Olivia Smith",
  //       title: "Marketing Manager",
  //       company: "MarketMasters.co",
  //       location: "New York, United States",
  //     },
  //     {
  //       name: "Noah Johnson",
  //       title: "Sales Director",
  //       company: "SalesForce.com",
  //       location: "Chicago, United States",
  //     },
  //     {
  //       name: "Emma Williams",
  //       title: "Product Manager",
  //       company: "ProductHub.net",
  //       location: "Austin, United States",
  //     },
  //     {
  //       name: "Oliver Jones",
  //       title: "HR Director",
  //       company: "PeopleMatter.org",
  //       location: "Toronto, Canada",
  //     },
  //     {
  //       name: "Sophia Davis",
  //       title: "Operations Manager",
  //       company: "OpManager.io",
  //       location: "Vancouver, Canada",
  //     },
  //     {
  //       name: "James Wilson",
  //       title: "Finance Director",
  //       company: "FinancePlus.com",
  //       location: "Sydney, Australia",
  //     },
  //     {
  //       name: "Mia Garcia",
  //       title: "Legal Counsel",
  //       company: "LegalEase.com",
  //       location: "Melbourne, Australia",
  //     },
  //     {
  //       name: "Benjamin Martinez",
  //       title: "IT Director",
  //       company: "ITSolutions.biz",
  //       location: "Berlin, Germany",
  //     },
  //     {
  //       name: "Charlotte Anderson",
  //       title: "Creative Director",
  //       company: "CreativeGurus.org",
  //       location: "Paris, France",
  //     },
  //     {
  //       name: "William Thomas",
  //       title: "Chief Financial Officer",
  //       company: "FinanceWorld.net",
  //       location: "Dublin, Ireland",
  //     },
  //     {
  //       name: "Amelia Hernandez",
  //       title: "Customer Service Manager",
  //       company: "CustomerCare.co",
  //       location: "Madrid, Spain",
  //     },
  //     {
  //       name: "Lucas Moore",
  //       title: "Chief Marketing Officer",
  //       company: "MarketingGenius.com",
  //       location: "Lisbon, Portugal",
  //     },
  //     {
  //       name: "Evelyn Martinez",
  //       title: "Business Development Manager",
  //       company: "BizDev.com",
  //       location: "Rome, Italy",
  //     },
  //     {
  //       name: "Mason White",
  //       title: "Chief Operating Officer",
  //       company: "OperationsPro.net",
  //       location: "Zurich, Switzerland",
  //     },
  //     {
  //       name: "Harper Lee",
  //       title: "Chief Strategy Officer",
  //       company: "StrategyExperts.io",
  //       location: "Amsterdam, Netherlands",
  //     },
  //     {
  //       name: "Ethan Harris",
  //       title: "Head of Innovation",
  //       company: "InnovateTech.com",
  //       location: "Brussels, Belgium",
  //     },
  //     {
  //       name: "Abigail Clark",
  //       title: "Public Relations Manager",
  //       company: "PRMasters.co",
  //       location: "Vienna, Austria",
  //     },
  //     {
  //       name: "Alexander Lewis",
  //       title: "Chief Data Officer",
  //       company: "DataDriven.com",
  //       location: "Stockholm, Sweden",
  //     },
  //     {
  //       name: "Ava Walker",
  //       title: "Director of Engineering",
  //       company: "EngineeringHub.net",
  //       location: "Oslo, Norway",
  //     },
  //     {
  //       name: "Elijah Robinson",
  //       title: "Chief Human Resources Officer",
  //       company: "HRLeaders.com",
  //       location: "Helsinki, Finland",
  //     },
  //     {
  //       name: "Isabella King",
  //       title: "Head of Compliance",
  //       company: "ComplianceWorld.co",
  //       location: "Copenhagen, Denmark",
  //     },
  //     {
  //       name: "Daniel Wright",
  //       title: "Head of Security",
  //       company: "SecurityExperts.org",
  //       location: "Reykjavik, Iceland",
  //     },
  //     {
  //       name: "Emily Hill",
  //       title: "Chief Research Officer",
  //       company: "ResearchGurus.io",
  //       location: "Athens, Greece",
  //     },
  //     {
  //       name: "Matthew Lopez",
  //       title: "Chief Innovation Officer",
  //       company: "InnovateGlobal.com",
  //       location: "Warsaw, Poland",
  //     },
  //     {
  //       name: "Avery Scott",
  //       title: "Head of Product",
  //       company: "ProductMasters.net",
  //       location: "Budapest, Hungary",
  //     },
  //     {
  //       name: "Jacob Green",
  //       title: "Chief Legal Officer",
  //       company: "LegalExperts.org",
  //       location: "Prague, Czech Republic",
  //     },
  //     {
  //       name: "Scarlett Adams",
  //       title: "Head of Sales",
  //       company: "SalesPros.co",
  //       location: "Bratislava, Slovakia",
  //     },
  //     {
  //       name: "Henry Baker",
  //       title: "Chief Risk Officer",
  //       company: "RiskManagement.com",
  //       location: "Ljubljana, Slovenia",
  //     },
  //     {
  //       name: "Lily Gonzalez",
  //       title: "Chief Information Officer",
  //       company: "InfoTech.net",
  //       location: "Zagreb, Croatia",
  //     },
  //     {
  //       name: "Sebastian Perez",
  //       title: "Head of Analytics",
  //       company: "DataAnalytics.org",
  //       location: "Sofia, Bulgaria",
  //     },
  //     {
  //       name: "Grace Mitchell",
  //       title: "Chief Compliance Officer",
  //       company: "ComplianceMasters.co",
  //       location: "Bucharest, Romania",
  //     },
  //     {
  //       name: "Jack Roberts",
  //       title: "Chief Strategy Officer",
  //       company: "StrategyHub.io",
  //       location: "Belgrade, Serbia",
  //     },
  //     {
  //       name: "Zoey Turner",
  //       title: "Head of Development",
  //       company: "DevExperts.net",
  //       location: "Sarajevo, Bosnia and Herzegovina",
  //     },
  //     {
  //       name: "Luke Phillips",
  //       title: "Chief Operating Officer",
  //       company: "OpsMasters.org",
  //       location: "Podgorica, Montenegro",
  //     },
  //     {
  //       name: "Chloe Campbell",
  //       title: "Chief Financial Officer",
  //       company: "FinanceGurus.com",
  //       location: "Tirana, Albania",
  //     },
  //     {
  //       name: "Wyatt Parker",
  //       title: "Chief Marketing Officer",
  //       company: "MarketingPros.co",
  //       location: "Skopje, North Macedonia",
  //     },
  //     {
  //       name: "Ella Carter",
  //       title: "Head of Human Resources",
  //       company: "HRMasters.net",
  //       location: "Pristina, Kosovo",
  //     },
  //     {
  //       name: "Jayden Rodriguez",
  //       title: "Chief Technology Officer",
  //       company: "TechInnovate.com",
  //       location: "Kiev, Ukraine",
  //     },
  //     {
  //       name: "Riley Edwards",
  //       title: "Chief Executive Officer",
  //       company: "ExecPros.io",
  //       location: "Minsk, Belarus",
  //     },
  //     {
  //       name: "Aiden Collins",
  //       title: "Head of Operations",
  //       company: "OpsHub.org",
  //       location: "Chisinau, Moldova",
  //     },
  //     {
  //       name: "Madison Stewart",
  //       title: "Chief Product Officer",
  //       company: "ProductGurus.com",
  //       location: "Vilnius, Lithuania",
  //     },
  //     {
  //       name: "Joseph Morris",
  //       title: "Chief Research Officer",
  //       company: "ResearchHub.net",
  //       location: "Riga, Latvia",
  //     },
  //     {
  //       name: "Mila Peterson",
  //       title: "Chief Data Officer",
  //       company: "DataMasters.org",
  //       location: "Tallinn, Estonia",
  //     },
  //     {
  //       name: "Samuel Fisher",
  //       title: "Head of Legal",
  //       company: "LegalPros.co",
  //       location: "Helsinki, Finland",
  //     },
  //     {
  //       name: "Luna Bell",
  //       title: "Head of Strategy",
  //       company: "StrategyHub.com",
  //       location: "Oslo, Norway",
  //     },
  //     {
  //       name: "Michael Russell",
  //       title: "Chief Information Officer",
  //       company: "InfoMasters.net",
  //       location: "Stockholm, Sweden",
  //     },
  //     {
  //       name: "Aria Hayes",
  //       title: "Chief Risk Officer",
  //       company: "RiskHub.io",
  //       location: "Copenhagen, Denmark",
  //     },
  //     {
  //       name: "Alexander Griffin",
  //       title: "Head of Analytics",
  //       company: "DataGurus.org",
  //       location: "Reykjavik, Iceland",
  //     },
  //     {
  //       name: "Sofia Foster",
  //       title: "Chief Innovation Officer",
  //       company: "InnovateWorld.com",
  //       location: "Athens, Greece",
  //     },
  //     {
  //       name: "Jackson Evans",
  //       title: "Head of Product",
  //       company: "ProductHub.net",
  //       location: "Warsaw, Poland",
  //     },
  //     {
  //       name: "Avery Hughes",
  //       title: "Chief Marketing Officer",
  //       company: "MarketingGurus.org",
  //       location: "Budapest, Hungary",
  //     },
  //     {
  //       name: "Carter Reed",
  //       title: "Chief Legal Officer",
  //       company: "LegalExperts.com",
  //       location: "Prague, Czech Republic",
  //     },
  //     {
  //       name: "Penelope Ward",
  //       title: "Head of Sales",
  //       company: "SalesPros.net",
  //       location: "Bratislava, Slovakia",
  //     },
  //     {
  //       name: "Grayson Cooper",
  //       title: "Chief Operating Officer",
  //       company: "OpsMasters.io",
  //       location: "Ljubljana, Slovenia",
  //     },
  //     {
  //       name: "Scarlett Collins",
  //       title: "Chief Financial Officer",
  //       company: "FinanceGurus.org",
  //       location: "Zagreb, Croatia",
  //     },
  //     {
  //       name: "Leo Morgan",
  //       title: "Chief Marketing Officer",
  //       company: "MarketingWorld.co",
  //       location: "Sofia, Bulgaria",
  //     },
  //     {
  //       name: "Lily Foster",
  //       title: "Head of Human Resources",
  //       company: "HRPros.com",
  //       location: "Bucharest, Romania",
  //     },
  //     {
  //       name: "Owen Bennett",
  //       title: "Chief Technology Officer",
  //       company: "TechInnovate.org",
  //       location: "Belgrade, Serbia",
  //     },
  //     {
  //       name: "Mia Nelson",
  //       title: "Chief Executive Officer",
  //       company: "ExecHub.net",
  //       location: "Sarajevo, Bosnia and Herzegovina",
  //     },
  //     {
  //       name: "Logan Bryant",
  //       title: "Head of Operations",
  //       company: "OpsPros.com",
  //       location: "Podgorica, Montenegro",
  //     },
  //     {
  //       name: "Avery Bell",
  //       title: "Chief Product Officer",
  //       company: "ProductWorld.co",
  //       location: "Tirana, Albania",
  //     },
  //     {
  //       name: "Lucas Rivera",
  //       title: "Chief Research Officer",
  //       company: "ResearchMasters.com",
  //       location: "Skopje, North Macedonia",
  //     },
  //     {
  //       name: "Ava Kelly",
  //       title: "Chief Data Officer",
  //       company: "DataExperts.org",
  //       location: "Pristina, Kosovo",
  //     },
  //     {
  //       name: "Ethan Howard",
  //       title: "Head of Legal",
  //       company: "LegalGurus.net",
  //       location: "Kiev, Ukraine",
  //     },
  //     {
  //       name: "Harper Mitchell",
  //       title: "Head of Strategy",
  //       company: "StrategyMasters.com",
  //       location: "Minsk, Belarus",
  //     },
  //     {
  //       name: "Benjamin Carter",
  //       title: "Chief Information Officer",
  //       company: "InfoGurus.org",
  //       location: "Chisinau, Moldova",
  //     },
  //     {
  //       name: "Zoey Lee",
  //       title: "Chief Risk Officer",
  //       company: "RiskMasters.net",
  //       location: "Vilnius, Lithuania",
  //     },
  //     {
  //       name: "Mason Adams",
  //       title: "Head of Analytics",
  //       company: "DataWorld.co",
  //       location: "Riga, Latvia",
  //     },
  //     {
  //       name: "Isabella Brooks",
  //       title: "Chief Innovation Officer",
  //       company: "InnovatePros.com",
  //       location: "Tallinn, Estonia",
  //     },
  //     {
  //       name: "Jacob Powell",
  //       title: "Head of Product",
  //       company: "ProductMasters.org",
  //       location: "Helsinki, Finland",
  //     },
  //     {
  //       name: "Emily Scott",
  //       title: "Chief Marketing Officer",
  //       company: "MarketingExperts.net",
  //       location: "Oslo, Norway",
  //     },
  //     {
  //       name: "Jackson Stewart",
  //       title: "Chief Legal Officer",
  //       company: "LegalWorld.com",
  //       location: "Stockholm, Sweden",
  //     },
  //     {
  //       name: "Mia Young",
  //       title: "Head of Sales",
  //       company: "SalesMasters.org",
  //       location: "Copenhagen, Denmark",
  //     },
  //     {
  //       name: "David Ward",
  //       title: "Chief Operating Officer",
  //       company: "OpsWorld.net",
  //       location: "Reykjavik, Iceland",
  //     },
  //     {
  //       name: "Sophia Harris",
  //       title: "Chief Financial Officer",
  //       company: "FinancePros.com",
  //       location: "Athens, Greece",
  //     },
  //     {
  //       name: "Liam Clark",
  //       title: "Chief Marketing Officer",
  //       company: "MarketingGurus.org",
  //       location: "Warsaw, Poland",
  //     },
  //     {
  //       name: "Olivia Lewis",
  //       title: "Head of Human Resources",
  //       company: "HRWorld.co",
  //       location: "Budapest, Hungary",
  //     },
  //     {
  //       name: "Noah Walker",
  //       title: "Chief Technology Officer",
  //       company: "TechPros.com",
  //       location: "Prague, Czech Republic",
  //     },
  //     {
  //       name: "Emma King",
  //       title: "Chief Executive Officer",
  //       company: "ExecMasters.org",
  //       location: "Bratislava, Slovakia",
  //     },
  //     {
  //       name: "Oliver Hall",
  //       title: "Head of Operations",
  //       company: "OpsExperts.net",
  //       location: "Ljubljana, Slovenia",
  //     },
  //     {
  //       name: "Ava Allen",
  //       title: "Chief Product Officer",
  //       company: "ProductPros.com",
  //       location: "Zagreb, Croatia",
  //     },
  //     {
  //       name: "Benjamin Young",
  //       title: "Chief Research Officer",
  //       company: "ResearchWorld.co",
  //       location: "Sofia, Bulgaria",
  //     },
  //     {
  //       name: "Charlotte Hernandez",
  //       title: "Chief Data Officer",
  //       company: "DataPros.net",
  //       location: "Bucharest, Romania",
  //     },
  //     {
  //       name: "William King",
  //       title: "Head of Legal",
  //       company: "LegalMasters.org",
  //       location: "Belgrade, Serbia",
  //     },
  //     {
  //       name: "Amelia Hill",
  //       title: "Head of Strategy",
  //       company: "StrategyExperts.net",
  //       location: "Sarajevo, Bosnia and Herzegovina",
  //     },
  //     {
  //       name: "James Adams",
  //       title: "Chief Information Officer",
  //       company: "InfoExperts.org",
  //       location: "Podgorica, Montenegro",
  //     },
  //     {
  //       name: "Evelyn Baker",
  //       title: "Chief Risk Officer",
  //       company: "RiskWorld.com",
  //       location: "Tirana, Albania",
  //     },
  //     {
  //       name: "Mason Gonzalez",
  //       title: "Head of Analytics",
  //       company: "DataExperts.org",
  //       location: "Skopje, North Macedonia",
  //     },
  //     {
  //       name: "Harper Perez",
  //       title: "Chief Innovation Officer",
  //       company: "InnovateMasters.net",
  //       location: "Pristina, Kosovo",
  //     },
  //   ];

  // Generate sample data
  //   const generateData = () => {
  //     const data = [];
  //     for (let i = 0; i < 50; i++) {
  //       data.push({
  //         name: `Person ${i + 1}`,
  //         title: i % 2 === 0 ? "Chief executive officer" : "Founder",
  //         company: i % 2 === 0 ? "Uber.com" : "Betimeful.com",
  //         location: "London, United Kingdom",
  //       });
  //     }
  //     return data;
  //   };

  //   const data = generateData();

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateRandomData());
  }, []);

  const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const generateRandomData = () => {
    const names = [
      "David Kaiz",
      "Sukhleen Aneja",
      "John Smith",
      "Lisa Ray",
      "Michael Brown",
      "Sara Conner",
      "James Wilson",
      "Patricia Lopez",
      "Mark Taylor",
      "Nancy Allen",
    ];
    const titles = [
      "Chief Executive Officer",
      "Founder",
      "Marketing Director",
      "Operations Manager",
      "Software Engineer",
      "Product Manager",
      "Chief Technology Officer",
      "Sales Executive",
      "Human Resources Manager",
      "Finance Director",
    ];
    const companies = [
      "Uber.com",
      "Betimeful.com",
      "Tech Innovate",
      "GreenTech Solutions",
      "Webify Inc.",
      "Smart Solutions Ltd.",
      "EcoWorld Tech",
      "SkyNet Systems",
      "Digital Front",
      "CodeCrafters Inc.",
    ];
    const locations = [
      "London, United Kingdom",
      "New York, USA",
      "Berlin, Germany",
      "Paris, France",
      "Tokyo, Japan",
      "Sydney, Australia",
      "Toronto, Canada",
      "San Francisco, USA",
      "Singapore",
      "Mumbai, India",
    ];

    const data = [];

    for (let i = 0; i < 100; i++) {
      data.push({
        name: getRandomElement(names),
        title: getRandomElement(titles),
        company: getRandomElement(companies),
        location: getRandomElement(locations),
      });
    }

    return data;
  };

  return (
    <div>
      <Helmet>
        <title>{lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)}{" "}Email List</title>
      </Helmet>
      <div className="container mx-auto px-6 py-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-5 text-gray-600">

          {lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)}{" "}Email List
        </h1>
        <h2 className="text-base text-gray-500 mb-4">12,000+ results found</h2>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  <input type="checkbox" className="accent-blue-500 rounded" />
                </th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Company</th>
                <th className="py-3 px-6 text-left">Quick actions</th>
                <th className="py-3 px-6 text-left">Current location</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="accent-blue-500 rounded"
                    />
                  </td>
                  <td className="py-4 px-6">{item.name}</td>
                  <td className="py-4 px-6">{item.title}</td>
                  <td className="py-4 px-6">{item.company}</td>
                  <td className="py-4 px-6">
                    <button className="text-orange-700 border border-orange-200 hover:bg-orange-100 rounded-md py-2 px-4 transition duration-300">
                      Access email
                    </button>
                  </td>
                  <td className="py-4 px-6">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
