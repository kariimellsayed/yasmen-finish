"use client";

import { ProductDetails } from "@/types/product";
import Image from "next/image";
import { useState } from "react";

// type ProductListItem = {
//   id: number;
//   icon: ReactNode;
//   text: string;
// };

// type ImageOfProduct = {
//   id: number;
//   img: string;
// };

type DetailsProps = {
  product: ProductDetails;
};

function Details({ product }: DetailsProps) {
  const [isActive, setIsActive] = useState<number>(1);
  const [imgeSrc, setImgSrc] = useState<string | null>(
    product.productImages.length > 0 ? product.productImages[0] : null
  );

  const [rate, setRate] = useState<number>(4);
  const [viewToggle, setViewToggle] = useState<boolean>(true);

  // const listOfProduct: ProductListItem[] = [
  //   {
  //     id: 1,
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="20"
  //         height="20"
  //         viewBox="0 0 20 20"
  //         fill="none"
  //       >
  //         <path
  //           d="M18 4.5H15.82C15.93 4.19 16 3.85 16 3.5C16 1.84 14.66 0.5 13 0.5C11.95 0.5 11.04 1.04 10.5 1.85L10 2.52L9.5 1.84C8.96 1.04 8.05 0.5 7 0.5C5.34 0.5 4 1.84 4 3.5C4 3.85 4.07 4.19 4.18 4.5H2C0.89 4.5 0.00999999 5.39 0.00999999 6.5L0 17.5C0 18.61 0.89 19.5 2 19.5H18C19.11 19.5 20 18.61 20 17.5V6.5C20 5.39 19.11 4.5 18 4.5ZM13 2.5C13.55 2.5 14 2.95 14 3.5C14 4.05 13.55 4.5 13 4.5C12.45 4.5 12 4.05 12 3.5C12 2.95 12.45 2.5 13 2.5ZM7 2.5C7.55 2.5 8 2.95 8 3.5C8 4.05 7.55 4.5 7 4.5C6.45 4.5 6 4.05 6 3.5C6 2.95 6.45 2.5 7 2.5ZM18 17.5H2V15.5H18V17.5ZM18 12.5H2V6.5H7.08L5 9.33L6.62 10.5L10 5.9L13.38 10.5L15 9.33L12.92 6.5H18V12.5Z"
  //           fill="#FE93B9"
  //         />
  //       </svg>
  //     ),
  //     text: "Receive 2 free samples when you spend 1000 EGP",
  //   },
  //   {
  //     id: 2,
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="18"
  //         height="24"
  //         viewBox="0 0 18 24"
  //         fill="none"
  //       >
  //         <path
  //           d="M9.78707 21.502L-0.00292969 11.712V13.712C-0.00292969 14.242 0.20707 14.752 0.58707 15.122L8.37707 22.912C9.15707 23.692 10.4271 23.692 11.2071 22.912L17.4171 16.702C18.1971 15.922 18.1971 14.652 17.4171 13.872L9.78707 21.502Z"
  //           fill="#FE93B9"
  //         />
  //         <path
  //           d="M8.37707 17.912C8.76707 18.302 9.27707 18.502 9.78707 18.502C10.2971 18.502 10.8071 18.302 11.1971 17.912L17.4071 11.702C18.1871 10.922 18.1871 9.65195 17.4071 8.87195L9.61707 1.08195C9.24707 0.711953 8.73707 0.501953 8.20707 0.501953H1.99707C0.89707 0.501953 -0.00292969 1.40195 -0.00292969 2.50195V8.71195C-0.00292969 9.24195 0.20707 9.75195 0.58707 10.122L8.37707 17.912ZM1.99707 2.50195H8.20707L15.9971 10.292L9.78707 16.502L1.99707 8.71195V2.50195Z"
  //           fill="#FE93B9"
  //         />
  //         <path
  //           d="M4.24707 6.00195C4.93743 6.00195 5.49707 5.44231 5.49707 4.75195C5.49707 4.0616 4.93743 3.50195 4.24707 3.50195C3.55671 3.50195 2.99707 4.0616 2.99707 4.75195C2.99707 5.44231 3.55671 6.00195 4.24707 6.00195Z"
  //           fill="#FE93B9"
  //         />
  //       </svg>
  //     ),
  //     text: "Get 30 EGP off when you leave a review",
  //   },
  //   {
  //     id: 3,
  //     icon: (
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="24"
  //         height="24"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //       >
  //         <path
  //           d="M15 4V11H5.17L4 12.17V4H15ZM16 2H3C2.45 2 2 2.45 2 3V17L6 13H16C16.55 13 17 12.55 17 12V3C17 2.45 16.55 2 16 2ZM21 6H19V15H6V17C6 17.55 6.45 18 7 18H18L22 22V7C22 6.45 21.55 6 21 6Z"
  //           fill="#FE93B9"
  //         />
  //       </svg>
  //     ),
  //     text: "Free makeup consultation with our experts",
  //   },
  // ];

  // const colorsData: string[] = ["#9A3E63", "#9B5D5E", "#A30000", "#FFC3E1"];

  // const imagesOfProduct: ImageOfProduct[] = [
  //   {
  //     id: 1,
  //     img: "/images/product_1.png",
  //   },
  //   {
  //     id: 2,
  //     img: "/images/items2.png",
  //   },
  // ];
  const imagesOfProduct = product.productImages.length
    ? product.productImages.map((img, index) => ({
        id: index + 1,
        img,
      }))
    : [{ id: 1, img: "/no-image.png" }]; // صورة افتراضية لو مفيش صور

  const handleActiveEvent = (id: number) => {
    setIsActive(id);
  };

  const returnImageSrc = (src: string) => {
    setImgSrc(src);
  };

  const toggleViewDetails = () => {
    setViewToggle(!viewToggle);
  };

  return (
    <div className="flex gap-7 lg:flex-row flex-col">
      <div className="lg:w-1/2 md:w-full">
        <Image
          src={imgeSrc === null ? imagesOfProduct[0].img : imgeSrc}
          width={500}
          height={400}
          alt="prudct details"
          loading="lazy"
          className="max-w-full w-full h-[687px]"
        />

        {/* Images of product */}
        <div className="my-5 flex items-start gap-3.5">
          {imagesOfProduct.map((ele) => (
            <Image
              key={ele.id}
              src={ele.img}
              width={100}
              height={100}
              alt="images of product"
              loading="lazy"
              className={`h-24 cursor-pointer hover:scale-90 transition ${
                isActive === ele.id
                  ? "border-[3px] border-[#FE93B9]"
                  : "inactive"
              }`}
              onClick={() => {
                handleActiveEvent(ele.id);
                returnImageSrc(ele.img);
              }}
            />
          ))}
        </div>
      </div>

      <div className="lg:w-1/2 md:w-full">
        <h3 className="text-3xl text-[#9A3E63] font-semibold mb-2.5">
          {product.name}
        </h3>
        <p className="text-[#393939] font-semibold mb-1">
          24HR Longwear Liquid Lipstick
        </p>
        <p className="text-[15px] text-[#868686]">
          <span>Ultra matte finish</span>{" "}
          <span className="mx-2 px-2 border-[1px] border-transparent border-l-[#868686] border-r-[#868686]">
            Intense, long-lasting color
          </span>{" "}
          <span>Transfer-proof</span>
        </p>
        {/* Rati of product */}
        <div className="flex items-center mt-1.5">
          {Array.from({ length: rate }).map((_, i) => (
            <Image
              key={i}
              src={"/rating.svg"}
              width={40}
              height={40}
              alt="rati"
              className="w-[16px]"
            />
          ))}

          {Array.from({ length: 5 - rate }).map((_, i) => (
            <Image
              key={i}
              src={"/rating_empty.svg"}
              width={40}
              height={40}
              alt="rati"
              className="w-[16px]"
            />
          ))}
          <span className="ml-3 text-[#393939] font-semibold">4.0</span>
        </div>
        <p className="text-[#393939] font-semibold text-[20px] mt-1.5">
          420.00 EGP
        </p>
        <button
          className="text-[#0B0806] font-semibold flex items-center gap-4 cursor-pointer my-[17px]"
          onClick={toggleViewDetails}
        >
          Product Details
          <Image
            src={"/arrow-down.svg"}
            width={20}
            height={20}
            alt="arrow"
            className={`transition ${!viewToggle ? "rotate-180" : "rotate-0"} `}
          />
        </button>

        {/* Show at click button and hid */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            viewToggle
              ? "max-h-[1000px] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          {/* <div>
            <span className="text-[#393939] block mb-2.5 font-semibold">
              Choose Color
            </span>
            <div className={`flex items-center gap-3`}>
              {colorsData.map((ele, index) => (
                <span
                  key={index}
                  className={`w-[18px] h-[18px] rounded-full cursor-pointer hover:scale-110 transition`}
                  style={{ backgroundColor: ele }}
                ></span>
              ))}
            </div>
          </div> */}

          <div className="w-full border-b border-[#9A3E6352] flex items-center justify-between text-[18px] text-[#868686] mt-4  py-2.5 relative">
            {/* Select input */}
            <select
              name="size"
              id="size"
              defaultValue="0"
              className="appearance-none bg-transparent w-full focus:outline-none pr-10"
            >
              <option value="0">5 ML</option>
              <option value="1">4 ML</option>
              <option value="2">3 ML</option>
            </select>

            {/* Price (on the right) */}
            <span className="absolute right-6 pointer-events-none">
              420.00 EGP
            </span>

            {/* Arrow icon */}
            <div className="pointer-events-none absolute right-0 flex items-center pr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#868686" />
              </svg>
            </div>
          </div>

          <button className="flex items-center gap-3 my-7 cursor-pointer text-[#FE93B9]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M10.0003 18.0423C9.74199 18.0423 9.49199 18.009 9.28366 17.934C6.10033 16.8423 1.04199 12.9673 1.04199 7.24232C1.04199 4.32565 3.40033 1.95898 6.30033 1.95898C7.70866 1.95898 9.02533 2.50898 10.0003 3.49232C10.9753 2.50898 12.292 1.95898 13.7003 1.95898C16.6003 1.95898 18.9587 4.33398 18.9587 7.24232C18.9587 12.9757 13.9003 16.8423 10.717 17.934C10.5087 18.009 10.2587 18.0423 10.0003 18.0423ZM6.30033 3.20898C4.09199 3.20898 2.29199 5.01732 2.29199 7.24232C2.29199 12.934 7.76699 16.1007 9.69199 16.759C9.84199 16.809 10.167 16.809 10.317 16.759C12.2337 16.1007 17.717 12.9423 17.717 7.24232C17.717 5.01732 15.917 3.20898 13.7087 3.20898C12.442 3.20898 11.267 3.80065 10.5087 4.82565C10.2753 5.14232 9.74199 5.14232 9.50866 4.82565C8.73366 3.79232 7.56699 3.20898 6.30033 3.20898Z"
                fill="#FE93B9"
              />
            </svg>
            Add to Wishlist
          </button>

          <h4 className="text-[#868686] mb-4 font-medium">Qunantity</h4>
          <div className="flex items-center justify-between mb-5 pb-5 text-[#393939]">
            <div className="bg-[#E3E3E3] w-28 h-14 rounded-[48px] p-5 flex items-center justify-between text-[22px]">
              <button className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 1V15M1 8H15"
                    stroke="#9A3E63"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span>1</span>
              <button className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="2"
                  viewBox="0 0 14 2"
                  fill="none"
                >
                  <path
                    d="M1 1H13"
                    stroke="#9A3E63"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <button className="bg-[#FE93B9] w-[285px] cursor-pointer h-14 text-[#393939] rounded-[8px]">
              Add To Cart
            </button>
          </div>

          {/* <ul>
            {listOfProduct.map((ele) => (
              <li
                key={ele.id}
                className="text-[#868686] flex items-center gap-4 mb-[15px] last:mb-0 text-sm font-normal"
              >
                <span className="w-5">{ele.icon}</span>
                {ele.text}
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
}
export default Details;
