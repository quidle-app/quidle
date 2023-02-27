import styled from "styled-components";
import {Link} from "react-router-dom";
import {ReactNode} from "react";

type Props = {
    to: string,
    children?: ReactNode
}

const LinkButton = ({to, children}: Props) => (
    <Container>
        <Link to={to} className="button">{children}</Link>
    </Container>
)

const Container = styled.div`
  margin: 20px;

  a {
    text-decoration: none;
  }
`;

export default LinkButton;