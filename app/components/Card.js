// Card.js
import Link from 'next/link';
import Image from 'next/image';
const Card = ({ id, name, imageUrl }) => {
  return (
    <div className="cardContainer w-full md:w-80">
      <Link href={`/${id}`}>
        <div className="max-w-sm rounded-md overflow-hidden shadow-lg w-full  bg-gray-100">
          <img loading='lazy' src={imageUrl} alt={name} className='w-full h-40 bg-[#fff] object-contain' />
          <div class="h-40 px-6 py-4 bg-[rgb(250,250,250)] flex justify-between flex-col">
            <div class="font-bold text-xl text-[rgb(0,67,104)] "> {name.charAt(0).toUpperCase() + name.slice(1)}</div>
            <div class="flex align-center gap-2 text-[rgb(95,155,191)] text-sm">
              <p>Details</p> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
