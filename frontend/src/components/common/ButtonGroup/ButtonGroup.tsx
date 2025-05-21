import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { ButtonGroupProps } from "./ButtonGroupProps.types";

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons }) => {

  return (
    <div className="flex justify-end space-x-4">
      {buttons.map((btn, index) =>
        btn.type === "button" ? (
          <Button
            key={index}
            label={btn.label}
            onClick={btn.onClick}
            variant={btn.variant}
            disabled={btn.disabled}
            isLoading={btn.isLoading}
          />
        ) : (
          <Link key={index} to={btn.to} className="text-primary">
            <Button label={btn.label} variant={btn.variant || "secondary"} type="button" />
          </Link>
        )
      )}
    </div>
  );
};

export default ButtonGroup;
