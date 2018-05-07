import AccountToggleContainer from '@/features/root/containers/account_toggle_container';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  me: string;
}

interface ActivityBarItem {
  icon: string;
  text: string;
  to: string;
}

export default class ActivityBar extends React.PureComponent<Props> {

  public render () {
    const items: ActivityBarItem[] = [
      {
        icon: 'fas fa-sign-in-alt',
        text: 'Sign in',
        to:   '/login/username',
      },
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

    if ( this.props.me ) {
      items.push({
        icon: 'fas fa-user',
        text: 'My profile',
        to:   `/accounts/${this.props.me}`,
      });
    }

    return (
      <nav className='activity-bar'>
        <AccountToggleContainer />

        {
          items.map((item, i) => (
            <div key={`${i}-${item.to}`} className='activity-bar__item'>
              <NavLink to={item.to} className='activity-bar__link'>
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
