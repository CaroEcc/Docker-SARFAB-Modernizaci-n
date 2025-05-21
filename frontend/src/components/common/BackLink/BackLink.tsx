import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { BackLinkProps } from './BackLinkProps.types';

const BackLink = ({
  text,
  link,
  icon: Icon = RiArrowLeftSLine,
  iconSize = 20,
  className = '',
  onClick,
  useRouter = false,
}: BackLinkProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    if (useRouter) {
      navigate(-1);
    }
  };

  const content = (
    <span className={`flex items-center dark:text-white text-title-xsm font-semibold text-primary ${className}`}>
      <Icon size={iconSize} className="mr-2" />
      {text}
    </span>
  );

  return (
    <div
      className={`border-b border-stroke py-4 px-6 dark:border-strokedark ${className}`}
    >
      {useRouter ? (
        <button onClick={handleClick} className="bg-transparent p-0 m-0 border-none cursor-pointer">
          {content}
        </button>
      ) : (
        <Link to={link} onClick={onClick}>
          {content}
        </Link>
      )}
    </div>
  );
};

export default BackLink;
