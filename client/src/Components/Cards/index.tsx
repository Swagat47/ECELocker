import { CardType } from "../../Types";
import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextCtc,
  CardTextBranch,
  CardTextTitle,
  CardTextBody,
  CardStatWrapper,
  CardStats,
  LinkText
} from "./CardStyle";
import Tilt from "react-parallax-tilt";

export const Card = ({ title, branch ,ctc, imgUrl }: CardType) => {
  return (
    // <Tilt>
      <CardWrapper>
        <CardImage background={imgUrl} />
        <CardTextWrapper>
        <CardTextTitle>{title}</CardTextTitle>
        <CardTextBranch>Eligible Branches: {branch} </CardTextBranch>
        <br></br>
          <CardTextCtc>Current Ctc: {ctc}</CardTextCtc>
          
          <CardTextBody>
            Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae
          </CardTextBody>
        </CardTextWrapper>
        <CardStatWrapper>
          
          <CardStats>
            <LinkText href="/login">View Details</LinkText>
          </CardStats>
          
        </CardStatWrapper>
      </CardWrapper>
    //  </Tilt>
  );
};
