import PropTypes from "prop-types";

ShortCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

function ShortCard({ number, title }) {
  return (
    <div className="py-5 w-full bg-primary text-white flex flex-col gap-3 items-center rounded-xl shadow-xl md:max-w-[350px] hover:bg-secondary transition-all duration-300">
      <div className="text-4xl font-bold text-accent">{number}</div>
      <div className="text-lg">{title}</div>
    </div>
  );
}

export { ShortCard };
