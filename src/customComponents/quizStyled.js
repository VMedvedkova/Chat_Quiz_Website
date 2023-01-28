import styled from 'styled-components';
import colors from '../themeManager/colors';

export const GameWrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.mainBgColor};
  position: relative;
`;

export const GameWindow = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.brandBgColor};
  border-radius: 8px;
  box-shadow: ${colors.gameWindowBoxShadowColor};
  background: ${colors.darkMainBgColor};
  width: 35%;
  min-width: 350px;
  height: 65vh;
`;

export const QuestionWrapper = styled.div`
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  line-height: 30px;
  font-size: 1rem;
`;

export const AnswerResultImages = styled.div`
  display: flex;
  position: absolute;
  padding-top: 20px;
  top: 0;
`;

export const QuestionText = styled.span`
  color: ${colors.lightTextColor};
  user-select: none;
  overflow-wrap: break-word;
  display: block;
  width: 100%;
`;

export const AnswerButtons = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 10px 25px;
  font-size: 1rem;
`;
