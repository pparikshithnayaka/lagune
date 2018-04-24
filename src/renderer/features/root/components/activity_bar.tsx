import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface ActivityBarItem {
  icon: string;
  text: string;
  to?: string;
  onClick?: (arg: any) => any;
}

export default class ActivityBar extends React.PureComponent {

  public render () {
    const items: ActivityBarItem[] = [
      {
        icon: 'fas fa-home',
        text: 'Home',
        to:   '/timelines/home',
      },
      {
        icon: 'fas fa-users',
        text: 'Local timeline',
        to:   '/timelines/local',
      },
      {
        icon: 'fas fa-globe',
        text: 'Federated timeline',
        to:   '/timelines/public',
      },
      {
        icon: 'fas fa-bars',
        text: 'Lists',
        to:   '/lists',
      },
      {
        icon: 'fas fa-star',
        text: 'Favourited statuses',
        to:   '/favourites',
      },
    ];

    return (
      <nav className='activity-bar'>
        {
          items.map((item, i) => (
            <div key={`${i}-${item.to}`} className='activity-bar__item'>
              <NavLink to={item.text} className='activity-bar__link'>
                <i className={`activity-bar__icon ${item.icon}`} />

                <span className='activity-bar__text invisible'>
                  {item.text}
                </span>
              </NavLink>
            </div>
          ))
        }
      </nav>
    );
  }

}
