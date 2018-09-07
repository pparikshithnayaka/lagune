import AccountToggleContainer from '@/renderer/features/root/containers/account_toggle_container';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBars, faGlobe, faHome, faSignInAlt, faStar, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  me: string;
}

interface ActivityBarItem {
  icon: IconProp;
  text: string;
  to: string;
}

export default class ActivityBar extends React.PureComponent<Props> {

  private items: ActivityBarItem[] = [
    {
      icon: faSignInAlt,
      text: 'Sign in',
      to:   '/login/username',
    },
    {
      icon: faHome,
      text: 'Home',
      to:   '/timelines/home',
    },
    {
      icon: faUsers,
      text: 'Local timeline',
      to:   '/timelines/local',
    },
    {
      icon: faGlobe,
      text: 'Federated timeline',
      to:   '/timelines/public',
    },
    {
      icon: faBars,
      text: 'Lists',
      to:   '/lists',
    },
    {
      icon: faStar,
      text: 'Favourited statuses',
      to:   '/favourites',
    },
  ];

  public componentDidMount () {
    if ( this.props.me ) {
      this.items.push({
        icon: faUser,
        text: 'My profile',
        to:   `/accounts/${this.props.me}`,
      });
    }
  }

  public render () {

    return (
      <nav className='activity-bar'>
        <AccountToggleContainer />

        {
          this.items.map((item, i) => (
            <div key={`${i}-${item.to}`} className='activity-bar__item'>
              <NavLink to={item.to} className='activity-bar__link'>
                <FontAwesomeIcon className='activity-bar__icon' icon={item.icon} />

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
