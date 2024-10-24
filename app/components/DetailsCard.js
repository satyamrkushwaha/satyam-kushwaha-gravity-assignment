// DetailsCard.js
const DetailsCard = ({ data }) => {
    return (
      <div className="max-w-sm rounded-md overflow-hidden shadow-lg w-80 bg-gray-100">
      <img loading='lazy' src={data.sprites.front_default} alt={''} className='w-full h-40 bg-[rgb(96,226,201)] object-contain' />
      <div className="h-52 px-6 py-4 bg-[rgb(253,198,102)] flex justify-start flex-col text-sm gap-2">
        <p><strong>Name:</strong> {data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
        <p><strong>Type:</strong> {data.types[0].type.name}</p>
        <p><strong>Stats:</strong> {data.stats.map((stat) => `${stat.stat.name}`).join(', ')}</p>
        <p><strong>Abilities:</strong> {data.abilities.map((ability) => `${ability.ability.name}`).join(', ')}</p>
      </div>
    </div>
    );
  };
  
  export default DetailsCard;
  