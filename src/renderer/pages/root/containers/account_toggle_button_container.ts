import AccountToggleButton, { Props } from '@/renderer/pages/root/components/account_toggle_button';
import { RootState } from '@/renderer/store/reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState, ownProps: Props) => ({
  account: state.getIn(['database', 'verified_accounts', ownProps.accountId]),
});

export const AccountToggleButtonContainer = connect(mapStateToProps)(AccountToggleButton);
