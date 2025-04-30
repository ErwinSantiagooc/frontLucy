
import Logo from '/tekcam.png';

const Brand = ({dark = false}) => {
  return (
    <div className={`flex items-center gap-2 rounded-sm py-2 px-4 text-lg font-extrabold  text-black  ${
      dark ? 'text-white' : 'text-dark'
    }`}>
      <img src={Logo} alt="Logo" width={50} height={50} />
      TEKCAM
    </div>
  );
};

export default Brand;
