import styled from 'styled-components';
import colors from '../themeManager/colors';

export const HeaderContainer = styled.div`
& > nav {
        width: 100%;
        height: 10vh;
        background-color: ${colors.darkMainBgColor};
        display: flex;
        justify-content: space-between;
        align-items: center;
}
`;
