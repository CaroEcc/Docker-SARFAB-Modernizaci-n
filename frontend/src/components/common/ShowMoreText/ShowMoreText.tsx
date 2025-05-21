import ShowMoreText from "react-show-more-text";

const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  lines = 1,
  width = 500,
  moreText = "Ver más",
  lessText = "Ver menos",
  className = "",
}) => {

  return (
    <ShowMoreText
      lines={lines}
      more={<p className="text-primary">{moreText}</p>}
      less={<p className="text-primary">{lessText}</p>}
      className={`content-css content-center ${className}`}
      anchorClass="show-more-less-clickable"
      expanded={false}
      width={width}
      truncatedEndingComponent="..."
    >
      {text}
    </ShowMoreText>
  );
};

export default ExpandableText;
