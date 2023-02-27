import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    icon: IconDefinition,
    [x: string]: any
}

const IconButton = ({icon, ...rest}: Props) => (
    <Button {...rest}>
        <FontAwesomeIcon fixedWidth={true} icon={icon}/>
    </Button>
)

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 100%;
  text-align: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export default IconButton;