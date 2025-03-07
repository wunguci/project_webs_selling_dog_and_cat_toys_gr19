import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="text-sm py-4" aria-label="breadcrumb">
      <ul className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.link ? (
              <Link to={item.link} className="text-gray-500 text-brown-hover">
                {item.label}
              </Link>
            ) : (
              <span className="text-brown ">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <FaAngleRight className="mx-2 text-brown mt-1 font-bold" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
