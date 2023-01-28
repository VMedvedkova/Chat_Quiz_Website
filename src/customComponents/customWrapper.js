import styled from 'styled-components';
import colors from '../themeManager/colors';

export const CustomWrapper = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: ${colors.mainBgColor};
    color: ${colors.lightTextColor};

    & p {
        display: block;
        margin: 20px auto;
        font-size: 1.3rem;
        text-align: center
    } 
    
    & > div {
        display: flex;
        flex-direction: column;
    }
`;
