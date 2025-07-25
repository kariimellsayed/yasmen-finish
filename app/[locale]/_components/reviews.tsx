"use client";
import { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";
import BestSeller from "./BestSeller";

type ReviewsUsers = {
  id: number;
  name: string;
  image: string;
  rating: number;
  date: string;
  description: string;
};

export default function Reviews() {
  const [active, setActive] = useState(1);

  const handleActive = (id: number) => setActive(id);

  const reviewNums = [
    { id: 1, count: "1k+" },
    { id: 2, count: "2k+" },
    { id: 3, count: "3k+" }
  ];

  const reviewsUsers: ReviewsUsers[] = [
    { id: 1, name: "Mariam", image: "", rating: 5, date: "2 months ago", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores non nihil atque. Cum, aliquid commodi praesentium iusto possimus, autem eum, quas doloribus natus veritatis nostrum exercitationem totam sed provident molestiae." },
    { id: 2, name: "Huda", image: "", rating: 3, date: "1 month ago", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores non nihil atque. Cum, aliquid commodi praesentium iusto possimus, autem eum, quas doloribus natus veritatis nostrum exercitationem totam sed provident molestiae." },
    { id: 3, name: "Salma", image: "", rating: 4, date: "3 weeks ago", description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores non nihil atque. Cum, aliquid commodi praesentium iusto possimus, autem eum, quas doloribus natus veritatis nostrum exercitationem totam sed provident molestiae." }
  ];

  
  let filteredReviews: ReviewsUsers[] = [];
  if (active === 1) filteredReviews = reviewsUsers;
  if (active === 2) filteredReviews = reviewsUsers.slice(0, 2);
  if (active === 3) filteredReviews = reviewsUsers.slice(0, 1);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 }
    })
  };

  return (
   <>

<motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="py-20"
    >
      <div className="text-center">
        <h3 className="mb-6 text-[#0B0806] font-medium text-3xl">Reviews</h3>
        <div className="flex justify-center items-center">
          {reviewNums.map((item) => (
            <span
              key={item.id}
              onClick={() => handleActive(item.id)}
              className={`cursor-pointer hover:z-20 transition w-10 h-10 p-2 flex justify-center items-center rounded-full border-2 border-white text-white -m-2 ${
                active === item.id ? "bg-[#9A3E63]" : "bg-[#FE93B9]"
              }`}
            >
              {item.count}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-14 mt-9 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-7">
        {filteredReviews.map((user, i) => (
          <motion.div
            key={user.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="bg-[#FCFCFC] relative p-1.5 rounded-lg"
          >
            <span className="w-12 h-12 rounded-full bg-[#9A3E63] flex justify-center items-center text-3xl text-white absolute -top-6 left-1/2 -translate-x-1/2">
              {user.name.charAt(0)}
            </span>
            <h2 className="mt-8 text-center text-[#9A3E63] text-2xl font-medium">{user.name}</h2>
            <span className="text-center block mb-2.5">{user.date}</span>
            <p className="text-center">
              {[...Array(user.rating)].map((_, idx) => (
                <FaStar key={idx} size={20} className="text-[#FFCC00] inline-block" />
              ))}
              {[...Array(5 - user.rating)].map((_, idx) => (
                <FaRegStar key={idx} size={20} className="text-[#FFCC00] inline-block" />
              ))}
            </p>
            <p className="text-center p-3 text-[#868686]">{user.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
    <motion.div>
        <div className="m-auto lg:w-[75%] w-full">
            <h2 className="text-[#393939] text-3xl font-medium text-center mb-4">Write your Review</h2>
            <div className="px-9 py-2 bg-white h-auto lg:h-16 lg:gap-0 gap-4 flex items-center lg:flex-rwo flex-col">
                <p className="text-[#868686] flex lg:basis-[35%] basis-full">What do you think about this product ? </p>
                <button className="rounded-sm cursor-pointer text-[#393939] bg-[#FE93B9] h-14 px-9 py-2 lg:basis-[65%] basis-full">Write A Review</button>
            </div>
        </div>
    </motion.div>
    <motion.section>
        <BestSeller value="details" />
    </motion.section>
</>
  );
}
