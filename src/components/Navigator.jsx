import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import navigationItems from '../constrants/bottomNav';
import useUserStore from '../hooks/useUserStore';

const ListWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 390px;
  padding: 15px 15px 25px 15px;

  position: fixed;
  bottom: 0;
  z-index: 1;

  border-top: 1px solid ${(({ theme }) => theme.colors.border)};
  background-color: ${(({ theme }) => theme.colors.background)};
`;

const ItemWrapper = styled.li`
  width: 80px;

  text-align: center;
`;

const StyledLink = styled(Link)`

`;

const IconWrapper = styled.div`
  width: 22px;
  height: 22px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const TitleWrapper = styled.div`
  font-size: .9em;
  margin-top: 8px;

  span {
    font-weight: ${((props) => (props.selected ? 800 : 400))};
    color: ${((props) => (props.selected ? props.theme.colors.secondary : props.theme.textColors.default))}
  }
`;

export default function Navigator() {
  const location = useLocation();
  const { pathname } = location;

  const userStore = useUserStore();

  const { nickname } = userStore;

  const NAV_ITEM = navigationItems(nickname);

  return ((
    <ListWrapper>
      {NAV_ITEM.map((item) => (
        <ItemWrapper key={item.id}>
          <StyledLink to={item.path}>
            <TitleWrapper selected={pathname === item.path}>
              <span>{item.name}</span>
            </TitleWrapper>
          </StyledLink>
        </ItemWrapper>
      ))}
    </ListWrapper>
  ));
}
