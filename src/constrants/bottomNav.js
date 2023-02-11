// import {
//   Home,
//   HomeOn,
//   Category,
//   CategoryOn,
//   Reservation,
//   ReservationOn,
//   Profile,
//   ProfileOn,
// } from '../assets/icons/bottomNav';
function navigationItems(nickname) {
  const NAV_ITEM = [
    {
      id: 1,
      name: '모아보기',
      path: `/${nickname}/collections`,
    // activeIcon: HomeOn,
    // inactiveIcon: Home,
    },
    {
      id: 2,
      name: '미니홈피',
      path: `/${nickname}`,
    // activeIcon: CategoryOn,
    // inactiveIcon: Category,
    },
    {
      id: 3,
      name: '탐색',
      path: `/${nickname}/explore`,
    // activeIcon: ReservationOn,
    // inactiveIcon: Reservation,
    },
    {
      id: 4,
      name: '더보기',
      path: `/${nickname}/additional`,
    // activeIcon: ProfileOn,
    // inactiveIcon: Profile,
    },
  ];

  return NAV_ITEM;
}

export default navigationItems;
