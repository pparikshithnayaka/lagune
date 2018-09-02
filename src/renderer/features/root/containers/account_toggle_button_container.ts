import AccountToggleButton, { Props } from '@/renderer/features/root/components/account_toggle_button';
import { RootState } from '@/renderer/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState, ownProps: Props) => ({
  account: state.database.getIn(['verified_accounts', ownProps.accountId]),
});

export const AccountToggleButtonContainer = connect(mapStateToProps)(AccountToggleButton);
