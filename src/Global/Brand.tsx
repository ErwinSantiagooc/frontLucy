


const Brand = ({ dark = false }: { dark?: boolean }) => {
  return (
    <div className={`flex items-center gap-3 rounded-lg py-2 px-4 ${dark ? 'bg-blue-950' : 'bg-white'}`}>
      <img 
        src="/logo.png" 
        alt="lucy-mundo-de-pijamas"
        width={50} 
        height={50}
        className="rounded-full border-2 border-blue-100"
      />
      <span className={`text-xl font-bold tracking-wide ${dark ? 'text-blue-50' : 'text-blue-900'}`}>
        Lucy Mundo de Pijamas
      </span>
    </div>
  );
};

export default Brand;
